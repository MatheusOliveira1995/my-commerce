"use client";

import { GridList } from "@/core/components";
import { ProductCard } from "@/domain/products/components";
import { ProductListSkeleton } from "@/domain/products/components";
import { useProducts } from "@/domain/products/hooks";
import { PRODUCTS_PER_PAGE } from "@/domain/products/constants";
import { Product } from "@/domain/products/models/product";

interface ProductListProps {
  page: number;
}

export default function ProductList(props: ProductListProps) {
  const { page } = props;
  const { data, total, isLoading } = useProducts(page);

  return (
    <GridList<Product>
      data={data}
      isLoading={isLoading}
      page={page}
      total={total}
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
      renderItem={(product) => <ProductCard product={product} />}
      renderSkeleton={() => <ProductListSkeleton />}
    />
  );
}
