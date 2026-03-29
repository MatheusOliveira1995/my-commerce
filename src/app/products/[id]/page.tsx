import { ReactElement } from "react";
import { Box } from "@mui/material";
import ProductsDetail from "@/domain/products/components/products-detail";
import getQueryClient from "@/core/lib/get-query-client";
import { productRepository } from "@/domain/products/repositories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PRODUCT_QUERY_KEYS } from "@/domain/products/constants";

interface ProductsDetailPageProps {
  params: {
    id: number;
  };
}

const ProductsDetailPage = async (
  props: ProductsDetailPageProps,
): Promise<ReactElement> => {
  const { params } = props;
  const { id } = await params;

  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: PRODUCT_QUERY_KEYS.detail(id),
      queryFn: () => productRepository.getById(id),
    });
  } catch {}

  return (
    <Box>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsDetail id={id} />
      </HydrationBoundary>
    </Box>
  );
};

export default ProductsDetailPage;
