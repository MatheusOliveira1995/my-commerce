"use client";

import { GridList } from "@/core/components";
import { ProductCard } from "@/domain/products/components";
import { useProducts } from "@/domain/products/hooks";
import { Product } from "@/domain/products/models/product";

interface ProductListProps {
  page: number;
}

export default function ProductList({ page }: ProductListProps) {
  const { data, total, isLoading } = useProducts(page);

  console.log({ data, total, isLoading });

  return (
    <GridList<Product>
      data={data}
      isLoading={isLoading}
      page={page}
      total={total}
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
    />
  );
}
