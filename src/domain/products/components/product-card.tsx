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
        <Stack
          direction={{ xs: "row", sm: "column" }}
          spacing={2}
          alignItems={{ xs: "center", sm: "stretch" }}
          sx={{ "& > :first-of-type": { alignSelf: { sm: "center" } } }}
        >
          <Box
            sx={{
              position: "relative",
              flexShrink: 0,
              width: { xs: 72, sm: 120, md: 140, lg: 150 },
              height: { xs: 72, sm: 120, md: 140, lg: 150 },
              mx: { xs: 0, sm: "auto" },
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width:600px) 72px, (max-width:900px) 120px, (max-width:1200px) 140px, 150px"
              style={{
                objectFit: "contain",
                objectPosition: "center center",
              }}
            />
          </Box>
          <Stack sx={{ flex: 1, minWidth: 0 }} spacing={1.5}>
            <ProductDetail product={product} />
            <Button
              variant="outlined"
              component={Link}
              size="large"
              fullWidth
              href={`/products/${product.id}`}
            >
              Ver mais
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
