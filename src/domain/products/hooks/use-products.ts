"use client";

import { useQuery } from "@tanstack/react-query";
import { productRepository } from "@/domain/products/repositories";
import {
  PRODUCT_QUERY_KEYS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";

export const useProducts = (page: number) => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: PRODUCT_QUERY_KEYS.all,
    queryFn: () => productRepository.getAll(),
  });

  const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedData = data.slice(start, start + PRODUCTS_PER_PAGE);

  return {
    data: paginatedData,
    total: totalPages,
    isLoading,
    isError,
  };
};
