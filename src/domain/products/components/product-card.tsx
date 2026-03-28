import { ReactElement } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "@/domain/products/models/product";
import Image from "next/image";
import Link from "next/link";

const IMAGE_SIZE = 150;
interface ProductCardProps {
  product: Product;
}

type ProductDetailProps = ProductCardProps;

const ProductDetail = (props: ProductDetailProps): ReactElement => {
  const { product } = props;
  return (
    <Stack>
      <Typography
        variant="body1"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {product.title}
      </Typography>
      <Typography variant="caption">{product.category}</Typography>
    </Stack>
  );
};

const ProductCard = (props: ProductCardProps): ReactElement => {
  const { product } = props;
  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Image
              src={product.image}
              alt={product.title}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
            />
          </Box>
          <Box>
            <ProductDetail product={product} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              component={Link}
              size="large"
              fullWidth
              href={`/products/${product.id}`}
            >
              Ver mais
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
