"use client";
import { ReactElement, useState } from "react";
import { useProduct } from "@/domain/products/hooks";
import ProductDetailSkeleton from "@/domain/products/components/product-detail-skeleton";
import Image from "next/image";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

interface ProductsDetailProps {
  id: number;
}

interface ProductInfoDetailProps {
  title: string;
  value: string;
}

const DETAIL_SX = {
  root: {
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: { xs: 180, sm: 220, md: 300 },
    mb: { xs: 2, md: 3 },
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageFrame: {
    position: "relative",
    width: { xs: 132, sm: 176, md: 234 },
    height: { xs: 132, sm: 176, md: 234 },
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    objectFit: "contain",
    objectPosition: "center",
  },
  cardContent: {
    p: { xs: 2.5, md: 4 },
  },
  contentStack: {
    gap: { xs: 2.5, md: 3 },
  },
  title: {
    typography: { xs: "h4", md: "h3" },
    lineHeight: 1.15,
    display: { xs: "none", sm: "block" },
  },
  sectionTitle: {
    typography: { xs: "h5", md: "h6" },
    fontWeight: 600,
  },
  descriptionTitle: {
    typography: { xs: "h5", md: "h4" },
    fontWeight: 600,
  },
  description: {
    color: "text.secondary",
    lineHeight: 1.7,
    fontSize: { xs: "0.98rem", md: "1rem" },
    textAlign: "left",
  },
} as const;

const ProductInfoDetail = (props: ProductInfoDetailProps): ReactElement => {
  const { title, value } = props;

  return (
    <Card>
      <CardContent
        sx={{
          p: { xs: 2, md: 3 },
          "&:last-child": { pb: { xs: 1.4, md: 2 } },
        }}
      >
        <Stack gap={1}>
          <Typography variant="body2" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const ProductsDetail = (props: ProductsDetailProps): ReactElement => {
  const { id } = props;
  const { data, isLoading } = useProduct(id);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!data) {
    return <Typography variant="body1">Produto não encontrado</Typography>;
  }

  return (
    <Box sx={DETAIL_SX.root}>
      <Box sx={DETAIL_SX.imageContainer}>
        <Box sx={DETAIL_SX.imageFrame}>
          {!isImageLoaded && (
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ position: "absolute", inset: 0, borderRadius: 2 }}
            />
          )}

          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="(max-width:600px) 132px, (max-width:900px) 176px, 234px"
            style={{ ...DETAIL_SX.image, opacity: isImageLoaded ? 1 : 0 }}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />
        </Box>
      </Box>
      <Card>
        <CardContent sx={DETAIL_SX.cardContent}>
          <Stack sx={DETAIL_SX.contentStack}>
            <Typography sx={DETAIL_SX.title}>{data.title}</Typography>
            <Typography sx={DETAIL_SX.sectionTitle}>Informações</Typography>
            <Grid
              container
              rowSpacing={{ xs: 1.5, md: 2 }}
              columnSpacing={{ xs: 1.5, md: 2 }}
            >
              <Grid size={{ xs: 6, sm: 4, md: 4 }}>
                <ProductInfoDetail title="Preço" value={`R$ ${data.price}`} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 4 }}>
                <ProductInfoDetail
                  title="Estoque"
                  value={String(data.rating.count)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <ProductInfoDetail title="Categoria" value={data.category} />
              </Grid>
            </Grid>
            <Typography sx={DETAIL_SX.descriptionTitle}>Descrição</Typography>
            <Typography sx={DETAIL_SX.description}>
              {data.description}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductsDetail;
