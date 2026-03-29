import httpClient from "@/core/lib/http-client";
import { Product, ProductsPageResult } from "@/domain/products/models/product";
import {
  PRODUCT_ENDPOINTS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";
import { ProductHttpRepository } from "@/domain/products/repositories/product-http-repository";

jest.mock("@/core/lib/http-client");

const mockedHttpClient = httpClient as jest.Mocked<typeof httpClient>;

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: "Product 1",
  price: 29.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/product.jpg",
  rating: { rate: 4.5, count: 100 },
  ...overrides,
});

describe("ProductHttpRepository", () => {
  let repository: ProductHttpRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    repository = new ProductHttpRepository();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("getAll", () => {
    it("should fetch all products from the API", async () => {
      const products = [makeProduct({ id: 1 }), makeProduct({ id: 2 })];
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const result = await repository.getAll();

      expect(result).toEqual(products);
      expect(mockedHttpClient.get).toHaveBeenCalledWith(PRODUCT_ENDPOINTS.list);
    });

    it("should return cached products if cache is valid", async () => {
      const products = [makeProduct({ id: 1 })];
      mockedHttpClient.get.mockResolvedValue({ data: products });

      // First call - fetches from API
      const firstCall = await repository.getAll();
      expect(firstCall).toEqual(products);
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(1);

      // Second call - returns cached data
      const secondCall = await repository.getAll();
      expect(secondCall).toEqual(products);
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(1); // No additional call
    });

    it("should refetch products after cache expires", async () => {
      const products = [makeProduct({ id: 1 })];
      const newProducts = [makeProduct({ id: 2 })];
      mockedHttpClient.get
        .mockResolvedValueOnce({ data: products })
        .mockResolvedValueOnce({ data: newProducts });

      // First call - fetches from API
      const firstCall = await repository.getAll();
      expect(firstCall).toEqual(products);

      // Advance time by 5 minutes (cache TTL)
      jest.advanceTimersByTime(1000 * 60 * 5 + 1);

      // Second call - cache expired, should fetch again
      const secondCall = await repository.getAll();
      expect(secondCall).toEqual(newProducts);
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(2);
    });

    it("should handle pending requests and return the same promise", async () => {
      const products = [makeProduct({ id: 1 })];
      mockedHttpClient.get.mockResolvedValue({ data: products });

      // Start two concurrent calls
      const promise1 = repository.getAll();
      const promise2 = repository.getAll();

      // Both should resolve to the same data
      const [result1, result2] = await Promise.all([promise1, promise2]);

      expect(result1).toEqual(products);
      expect(result2).toEqual(products);
      // Should only have made one HTTP request
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(1);
    });

    it("should clear pending request after successful fetch", async () => {
      const products = [makeProduct({ id: 1 })];
      mockedHttpClient.get.mockResolvedValue({ data: products });

      await repository.getAll();

      mockedHttpClient.get.mockResolvedValue({
        data: [makeProduct({ id: 2 })],
      });
      jest.advanceTimersByTime(1000 * 60 * 5 + 1);

      await repository.getAll();

      expect(mockedHttpClient.get).toHaveBeenCalledTimes(2);
    });

    it("should handle API errors", async () => {
      const error = new Error("API Error");
      mockedHttpClient.get.mockRejectedValue(error);

      await expect(repository.getAll()).rejects.toThrow("API Error");
      expect(mockedHttpClient.get).toHaveBeenCalledWith(PRODUCT_ENDPOINTS.list);
    });
  });

  describe("getPage", () => {
    it("should return paginated products with correct metadata", async () => {
      const products = Array.from({ length: 25 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const result = await repository.getPage(1, PRODUCTS_PER_PAGE);

      expect(result.items).toHaveLength(PRODUCTS_PER_PAGE);
      expect(result.page).toBe(1);
      expect(result.perPage).toBe(PRODUCTS_PER_PAGE);
      expect(result.totalItems).toBe(25);
      expect(result.totalPages).toBe(Math.ceil(25 / PRODUCTS_PER_PAGE));
      expect(result.items[0].id).toBe(1);
    });

    it("should return correct items for different pages", async () => {
      const products = Array.from({ length: 25 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const page1 = await repository.getPage(1, PRODUCTS_PER_PAGE);
      const page2 = await repository.getPage(2, PRODUCTS_PER_PAGE);

      expect(page1.items[0].id).toBe(1);
      expect(page2.items[0].id).toBe(PRODUCTS_PER_PAGE + 1);
      // Should use cached data, no new API calls
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(1);
    });

    it("should use default perPage if not provided", async () => {
      const products = Array.from({ length: 25 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const result = await repository.getPage(1);

      expect(result.perPage).toBe(PRODUCTS_PER_PAGE);
      expect(result.items).toHaveLength(PRODUCTS_PER_PAGE);
    });

    it("should handle page 0 by treating it as page 1", async () => {
      const products = Array.from({ length: 25 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const result = await repository.getPage(0, PRODUCTS_PER_PAGE);

      expect(result.page).toBe(1);
      expect(result.items[0].id).toBe(1);
    });

    it("should handle negative pages by treating them as page 1", async () => {
      const products = Array.from({ length: 25 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const result = await repository.getPage(-5, PRODUCTS_PER_PAGE);

      expect(result.page).toBe(1);
      expect(result.items[0].id).toBe(1);
    });

    it("should return empty items for page beyond total pages", async () => {
      const products = Array.from({ length: 10 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const result = await repository.getPage(5, PRODUCTS_PER_PAGE);

      expect(result.items).toEqual([]);
      expect(result.page).toBe(5);
      expect(result.totalPages).toBe(1);
    });

    it("should calculate correct totalPages", async () => {
      const products = Array.from({ length: 15 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      const result = await repository.getPage(1, 4);

      expect(result.totalPages).toBe(4); // ceil(15 / 4) = 4
    });

    it("should handle API errors in getAll", async () => {
      const error = new Error("API Error");
      mockedHttpClient.get.mockRejectedValue(error);

      await expect(repository.getPage(1)).rejects.toThrow("API Error");
    });
  });

  describe("getById", () => {
    it("should fetch a product by id", async () => {
      const product = makeProduct({ id: 42 });
      mockedHttpClient.get.mockResolvedValue({ data: product });

      const result = await repository.getById(42);

      expect(result).toEqual(product);
      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        PRODUCT_ENDPOINTS.detail(42),
      );
    });

    it("should make a new request for each product id", async () => {
      const product1 = makeProduct({ id: 1 });
      const product2 = makeProduct({ id: 2 });
      mockedHttpClient.get
        .mockResolvedValueOnce({ data: product1 })
        .mockResolvedValueOnce({ data: product2 });

      const result1 = await repository.getById(1);
      const result2 = await repository.getById(2);

      expect(result1).toEqual(product1);
      expect(result2).toEqual(product2);
      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        PRODUCT_ENDPOINTS.detail(1),
      );
      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        PRODUCT_ENDPOINTS.detail(2),
      );
    });

    it("should handle API errors", async () => {
      const error = new Error("Not Found");
      mockedHttpClient.get.mockRejectedValue(error);

      await expect(repository.getById(999)).rejects.toThrow("Not Found");
      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        PRODUCT_ENDPOINTS.detail(999),
      );
    });
  });

  describe("Integration", () => {
    it("should use cache from getAll in getPage", async () => {
      const products = Array.from({ length: 20 }, (_, i) =>
        makeProduct({ id: i + 1 }),
      );
      mockedHttpClient.get.mockResolvedValue({ data: products });

      // First, call getAll
      await repository.getAll();
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(1);

      // Then, call getPage - should use cache
      await repository.getPage(1);
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(1); // No additional call
    });

    it("should not cache getById results", async () => {
      const product = makeProduct({ id: 42 });
      mockedHttpClient.get.mockResolvedValue({ data: product });

      await repository.getById(42);
      await repository.getById(42);

      // Each getById call should make a separate request
      expect(mockedHttpClient.get).toHaveBeenCalledTimes(2);
    });
  });
});
