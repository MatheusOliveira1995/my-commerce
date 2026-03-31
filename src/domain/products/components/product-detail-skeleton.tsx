import { ReactElement } from "react";
import { Box, Card, CardContent, Grid, Skeleton, Stack } from "@mui/material";

const INFO_ITEMS = Array.from({ length: 3 });
const DESCRIPTION_LINES = ["98%", "100%", "96%", "88%"];

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
  cardContent: {
    p: { xs: 2.5, md: 4 },
  },
  contentStack: {
    gap: { xs: 2.5, md: 3 },
  },
} as const;

const ProductDetailSkeleton = (): ReactElement => {
  return (
    <Box sx={DETAIL_SX.root}>
      <Box sx={DETAIL_SX.imageContainer}>
        <Box sx={DETAIL_SX.imageFrame}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ position: "absolute", inset: 0, borderRadius: 2 }}
          />
        </Box>
      </Box>

      <Card>
        <CardContent sx={DETAIL_SX.cardContent}>
          <Stack sx={DETAIL_SX.contentStack}>
            <Skeleton variant="text" animation="wave" width="68%" height={54} />
            <Skeleton variant="text" animation="wave" width={130} height={30} />

            <Grid
              container
              rowSpacing={{ xs: 1.5, md: 2 }}
              columnSpacing={{ xs: 1.5, md: 2 }}
            >
              {INFO_ITEMS.map((_, index) => (
                <Grid
                  key={`detail-info-skeleton-${index}`}
                  size={{ xs: 6, sm: 4, md: 4 }}
                >
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: "100%", height: 96, borderRadius: 1.5 }}
                  />
                </Grid>
              ))}
            </Grid>

            <Skeleton variant="text" animation="wave" width={170} height={36} />

            <Stack spacing={0.5}>
              {DESCRIPTION_LINES.map((width, index) => (
                <Skeleton
                  key={`detail-description-skeleton-${index}`}
                  variant="text"
                  animation="wave"
                  width={width}
                  height={24}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetailSkeleton;
