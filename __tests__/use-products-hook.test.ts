import { createElement, ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "@/domain/products/hooks/use-products";
import { PRODUCTS_PER_PAGE } from "@/domain/products/constants";
import { Product, ProductsPageResult } from "@/domain/products/models/product";
import { productRepository } from "@/domain/products/repositories";

jest.mock("@/domain/products/repositories", () => ({
  productRepository: {
    getPage: jest.fn(),
  },
}));

const mockedGetPage = productRepository.getPage as jest.MockedFunction<
  typeof productRepository.getPage
>;

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: "Product 1",
  price: 29.99,
  description: "A test product",
  category: "test",
  image: "https://example.com/img.jpg",
  rating: { rate: 4.5, count: 100 },
  ...overrides,
});

const makePageResult = (
  items: Array<Product>,
  overrides: Partial<ProductsPageResult> = {},
): ProductsPageResult => ({
  items,
  page: 1,
  perPage: PRODUCTS_PER_PAGE,
  totalItems: items.length,
  totalPages: Math.ceil(items.length / PRODUCTS_PER_PAGE),
  ...overrides,
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  return Wrapper;
};

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty data and isLoading true on initial fetch", async () => {
    mockedGetPage.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useProducts(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it("should return products and total pages after successful fetch", async () => {
    const products = [makeProduct({ id: 1 }), makeProduct({ id: 2 })];
    mockedGetPage.mockResolvedValue(
      makePageResult(products, { totalPages: 3 }),
    );

    const { result } = renderHook(() => useProducts(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(products);
    expect(result.current.total).toBe(3);
    expect(result.current.isError).toBe(false);
  });

  it("should call getPage with the correct page and perPage", async () => {
    mockedGetPage.mockResolvedValue(makePageResult([]));

    renderHook(() => useProducts(2), { wrapper: createWrapper() });

    await waitFor(() =>
      expect(mockedGetPage).toHaveBeenCalledWith(2, PRODUCTS_PER_PAGE),
    );
  });

  it("should return isError true when the repository throws", async () => {
    mockedGetPage.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProducts(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toEqual([]);
    expect(result.current.total).toBe(0);
  });
});
