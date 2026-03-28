import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Paper, Stack, Typography } from "@mui/material";
import getQueryClient from "@/core/lib/get-query-client";
import { productRepository } from "@/domain/products/repositories";
import {
  PRODUCT_QUERY_KEYS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";
import { ProductList } from "@/domain/products/components";
import { ReactElement } from "react";

interface PageProps {
  params: Promise<{ page: string }>;
}

const PRODUCTS_PAGE_LAYOUT_SX = {
  contentStack: {
    spacing: { xs: 2, md: 5 },
  },
  paper: {
    p: { xs: 0, md: 3 },
    bgcolor: { xs: "transparent", md: "background.paper" },
    boxShadow: { xs: "none", md: 1 },
    borderRadius: { xs: 0, md: 2 },
  },
};

export async function generateStaticParams() {
  const products = await productRepository.getAll();
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export const revalidate = 3600; // Revalidate every 60 minutes

const ProductsPage = async (props: PageProps): Promise<ReactElement> => {
  const { params } = props;
  const { page } = await params;
  const currentPage = Number(page);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: PRODUCT_QUERY_KEYS.page(currentPage, PRODUCTS_PER_PAGE),
    queryFn: () => productRepository.getPage(currentPage, PRODUCTS_PER_PAGE),
  });

  return (
    <Stack sx={PRODUCTS_PAGE_LAYOUT_SX.contentStack}>
      <Typography variant="h4">Produtos</Typography>
      <Paper sx={PRODUCTS_PAGE_LAYOUT_SX.paper}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductList page={currentPage} />
        </HydrationBoundary>
      </Paper>
    </Stack>
  );
};

export default ProductsPage;
