import { ReactElement } from "react";
import { Box } from "@mui/material";
import ProductsDetail from "@/domain/products/components/products-detail";
import getQueryClient from "@/core/lib/get-query-client";
import { productRepository } from "@/domain/products/repositories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PRODUCT_QUERY_KEYS } from "@/domain/products/constants";
import { notFound } from "next/navigation";
import { HttpError } from "@/core/lib/http-error";

interface ProductsDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

const ProductsDetailPage = async (
  props: ProductsDetailPageProps,
): Promise<ReactElement> => {
  const { params } = props;
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: PRODUCT_QUERY_KEYS.detail(id),
      queryFn: () => productRepository.getById(id),
    });
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <Box>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsDetail id={id} />
      </HydrationBoundary>
    </Box>
  );
};

export default ProductsDetailPage;
