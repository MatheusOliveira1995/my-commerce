import { ReactElement } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { GridList } from "@/core/components";
import { PRODUCTS_PER_PAGE } from "@/domain/products/constants";
import ProductCardSkeleton from "./product-card-skeleton";

const PRODUCT_LIST_SKELETON_SX = {
  contentStack: {
    gap: { xs: 2, md: 5 },
  },
  paper: {
    p: { xs: 0, md: 3 },
    bgcolor: { xs: "transparent", md: "background.paper" },
    boxShadow: { xs: "none", md: 1 },
    borderRadius: { xs: 0, md: 2 },
  },
} as const;

const ProductListSkeleton = (): ReactElement => {
  return (
    <Stack sx={PRODUCT_LIST_SKELETON_SX.contentStack}>
      <Typography variant="h4">Produtos</Typography>
      <Paper sx={PRODUCT_LIST_SKELETON_SX.paper}>
        <GridList<Record<string, never>>
          data={[]}
          isLoading
          page={1}
          total={1}
          showPagination={false}
          skeletonCount={PRODUCTS_PER_PAGE}
          gridContainerProps={{
            container: true,
            direction: "row",
            columns: { xs: 4, sm: 8, md: 12 },
            rowSpacing: { xs: 2, sm: 2.5, md: 3 },
            columnSpacing: { xs: 2, sm: 2.5, md: 3 },
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
          gridItemProps={{
            size: { xs: 4, sm: 4, md: 3, lg: 3, xl: 3 },
          }}
          renderItem={() => null}
          renderSkeleton={() => <ProductCardSkeleton />}
        />
      </Paper>
    </Stack>
  );
};

export default ProductListSkeleton;
