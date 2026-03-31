import httpClient from "@/core/lib/http-client";
import {
  PRODUCT_ENDPOINTS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";
import { ProductHttpRepository } from "@/domain/products/repositories/product-http-repository";

jest.mock("@/core/lib/http-client");

const mockedHttpClient = httpClient as jest.Mocked<typeof httpClient>;

const makeProductApiDto = (
  overrides: Partial<Record<string, unknown>> = {},
) => ({
  _id: 1,
  title: "Product 1",
  price: 29.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/product.jpg",
  rating: 4.5,
  stock: 100,
  ...overrides,
});

const makeProductListApiResponse = (
  overrides: Partial<Record<string, unknown>> = {},
) => ({
  data: [makeProductApiDto()],
  totalProducts: 1,
  totalPages: 1,
  currentPage: 1,
  perPage: PRODUCTS_PER_PAGE,
  ...overrides,
});

describe("ProductHttpRepository", () => {
  let repository: ProductHttpRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new ProductHttpRepository();
  });

  describe("getPage", () => {
    it("should fetch paginated products and preserve API metadata", async () => {
      mockedHttpClient.get.mockResolvedValue({
        data: makeProductListApiResponse({
          data: [
            makeProductApiDto({ _id: 1, title: "Product 1" }),
            makeProductApiDto({ _id: 2, title: "Product 2" }),
          ],
          totalProducts: 44,
          totalPages: 11,
          currentPage: 2,
          perPage: 4,
        }),
      });

      const result = await repository.getPage(2, 4);

      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        PRODUCT_ENDPOINTS.list,
        {
          params: { page: 2, perPage: 4 },
        },
      );
      expect(result.items).toHaveLength(2);
      expect(result.page).toBe(2);
      expect(result.perPage).toBe(4);
      expect(result.totalItems).toBe(44);
      expect(result.totalPages).toBe(11);
      expect(result.items[0].id).toBe(1);
    });

    it("should use default perPage when not provided", async () => {
      mockedHttpClient.get.mockResolvedValue({
        data: makeProductListApiResponse(),
      });

      await repository.getPage(1);

      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        PRODUCT_ENDPOINTS.list,
        {
          params: { page: 1, perPage: PRODUCTS_PER_PAGE },
        },
      );
    });

    it("should return empty items when payload data is not an array", async () => {
      mockedHttpClient.get.mockResolvedValue({
        data: makeProductListApiResponse({ data: null }),
      });

      const result = await repository.getPage(1);

      expect(result.items).toEqual([]);
    });

    it("should transform API product DTO to domain model correctly", async () => {
      mockedHttpClient.get.mockResolvedValue({
        data: makeProductListApiResponse({
          data: [
            makeProductApiDto({
              _id: 123,
              title: "Mapped Product",
              price: 87.5,
              description: "Mapped description",
              category: "furniture",
              image: "https://example.com/mapped.jpg",
              rating: 3.7,
              stock: 19,
            }),
          ],
        }),
      });

      const result = await repository.getPage(1, 10);

      expect(result.items[0]).toEqual({
        id: 123,
        title: "Mapped Product",
        price: 87.5,
        description: "Mapped description",
        category: "furniture",
        image: "https://example.com/mapped.jpg",
        rating: { rate: 3.7, count: 19 },
      });
    });

    it("should propagate API errors", async () => {
      const error = new Error("API Error");
      mockedHttpClient.get.mockRejectedValue(error);

      await expect(repository.getPage(1)).rejects.toThrow("API Error");
    });
  });

  describe("getById", () => {
    it("should fetch and map a product by id", async () => {
      mockedHttpClient.get.mockResolvedValue({
        data: makeProductApiDto({ _id: 42, title: "Product 42" }),
      });

      const result = await repository.getById(42);

      expect(result).toEqual({
        id: 42,
        title: "Product 42",
        price: 29.99,
        description: "A test product",
        category: "electronics",
        image: "https://example.com/product.jpg",
        rating: { rate: 4.5, count: 100 },
      });
      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        PRODUCT_ENDPOINTS.detail(42),
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

    it("should map fallback values when API fields are missing", async () => {
      mockedHttpClient.get.mockResolvedValue({
        data: makeProductApiDto({
          _id: 55,
          title: undefined,
          price: undefined,
          description: undefined,
          category: undefined,
          image: undefined,
          rating: undefined,
          stock: undefined,
        }),
      });

      const result = await repository.getById(55);

      expect(result).toEqual({
        id: 55,
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating: { rate: 0, count: 0 },
      });
    });
  });
});
