"use client";

import { useQuery } from "@tanstack/react-query";
import { productRepository } from "@/domain/products/repositories";
import { PRODUCT_QUERY_KEYS } from "@/domain/products/constants";

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(id),
    queryFn: () => productRepository.getById(id),
    enabled: !!id,
  });
};
