"use client";
import { ReactElement, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/domain/products/models/product";

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            {!isImageLoaded && (
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ position: "absolute", inset: 0 }}
              />
            )}
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width:600px) 72px, (max-width:900px) 120px, (max-width:1200px) 140px, 150px"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(true)}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                opacity: isImageLoaded ? 1 : 0,
                transition: "opacity 220ms ease",
              }}
            />
          </Box>

          <Stack sx={{ flex: 1, minWidth: 0 }} spacing={1.5}>
            <ProductDetail product={product} />
            <Button
              variant="outlined"
              component={Link}
              prefetch={false}
              size="large"
              fullWidth
              href={"/products/" + product.id}
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
