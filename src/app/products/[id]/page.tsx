import { ReactElement } from "react";
import { Box, Container } from "@mui/material";
import ProductsDetail from "@/domain/products/components/products-detail";

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

  return (
    <Box>
      <ProductsDetail id={id} />
    </Box>
  );
};

export default ProductsDetailPage;
