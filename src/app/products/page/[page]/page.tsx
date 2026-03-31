import { ReactElement } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Paper, Stack, Typography } from "@mui/material";
import getQueryClient from "@/core/lib/get-query-client";
import { productRepository } from "@/domain/products/repositories";
import {
  PRODUCT_QUERY_KEYS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";
import { ProductList } from "@/domain/products/components";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { HttpError } from "@/core/lib/http-error";

interface PageProps {
  params: Promise<{ page: string }>;
}

const PRODUCTS_PAGE_LAYOUT_SX = {
  contentStack: {
    gap: { xs: 2, md: 5 },
  },
  paper: {
    p: { xs: 0, md: 3 },
    bgcolor: { xs: "transparent", md: "background.paper" },
    boxShadow: { xs: "none", md: 1 },
    borderRadius: { xs: 0, md: 2 },
  },
};

export async function generateStaticParams() {
  try {
    const { totalPages } = await productRepository.getPage(
      1,
      PRODUCTS_PER_PAGE,
    );

    return Array.from({ length: totalPages }, (_, i) => ({
      page: String(i + 1),
    }));
  } catch (e) {
    console.error("Failed to generate static params for products page", e);
    return [{ page: "1" }];
  }
}

export const revalidate = 1800; // Revalidate every 30 minutes

const ProductsPage = async (props: PageProps): Promise<ReactElement> => {
  const { params } = props;
  const { page } = await params;
  const parsedPage = Number(page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: PRODUCT_QUERY_KEYS.page(currentPage, PRODUCTS_PER_PAGE),
      queryFn: () => productRepository.getPage(currentPage, PRODUCTS_PER_PAGE),
    });
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      notFound();
    }

    noStore();
  }

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
