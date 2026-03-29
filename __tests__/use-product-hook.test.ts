import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, ReactNode } from "react";
import { useProduct } from "@/domain/products/hooks/use-product";
import { Product } from "@/domain/products/models/product";

jest.mock("@/domain/products/repositories", () => ({
  productRepository: {
    getById: jest.fn(),
  },
}));

import { productRepository } from "@/domain/products/repositories";

const mockedGetById = productRepository.getById as jest.MockedFunction<
  typeof productRepository.getById
>;

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

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: "Product 1",
  price: 19.99,
  description: "Test product",
  category: "test",
  image: "https://example.com/product.jpg",
  rating: {
    rate: 4.8,
    count: 25,
  },
  ...overrides,
});

describe("useProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty data and isLoading true during page loading", () => {
    mockedGetById.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useProduct(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });

  it("should return a Product after fetch", async () => {
    const product = makeProduct({ id: 7, title: "Produto teste" });
    mockedGetById.mockResolvedValue(product);

    const { result } = renderHook(() => useProduct(7), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(product);
    expect(result.current.isLoading).toBe(false);
  });
});
