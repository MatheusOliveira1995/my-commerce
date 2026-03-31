"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productRepository } from "@/domain/products/repositories";
import {
  PRODUCT_QUERY_KEYS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";

export const useProducts = (page: number) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: PRODUCT_QUERY_KEYS.page(page, PRODUCTS_PER_PAGE),
    queryFn: () => productRepository.getPage(page, PRODUCTS_PER_PAGE),
    placeholderData: keepPreviousData,
  });

  const productsPage = data;

  return {
    data: productsPage?.items ?? [],
    total: productsPage?.totalPages ?? 0,
    isLoading: isPending,
    isError,
    refetch,
  };
};
