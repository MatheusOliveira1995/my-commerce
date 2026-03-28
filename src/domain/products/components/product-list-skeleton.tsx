import { ReactElement } from "react";
import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

const PRODUCT_LIST_SKELETON_SX = {
  imageFrame: {
    position: "relative",
    flexShrink: 0,
    width: { xs: 72, sm: 120, md: 140, lg: 150 },
    height: { xs: 72, sm: 120, md: 140, lg: 150 },
    mx: { xs: 0, sm: "auto" },
    overflow: "hidden",
    borderRadius: 1,
  },
  contentStack: {
    flex: 1,
    minWidth: 0,
  },
  primaryLine: {
    width: "100%",
    maxWidth: { xs: "100%", sm: 240 },
    height: 28,
  },
  secondaryLine: {
    width: { xs: "50%", sm: 120 },
    height: 18,
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 1,
  },
} as const;

const ProductListSkeleton = (): ReactElement => {
  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: "row", sm: "column" }}
          spacing={2}
          alignItems={{ xs: "center", sm: "stretch" }}
          sx={{ "& > :first-of-type": { alignSelf: { sm: "center" } } }}
        >
          <Box sx={PRODUCT_LIST_SKELETON_SX.imageFrame}>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ position: "absolute", inset: 0 }}
            />
          </Box>

          <Stack sx={PRODUCT_LIST_SKELETON_SX.contentStack} spacing={1.5}>
            <Stack spacing={0.75}>
              <Skeleton
                variant="text"
                animation="wave"
                sx={PRODUCT_LIST_SKELETON_SX.primaryLine}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={PRODUCT_LIST_SKELETON_SX.secondaryLine}
              />
            </Stack>

            <Skeleton
              variant="rounded"
              animation="wave"
              sx={PRODUCT_LIST_SKELETON_SX.button}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductListSkeleton;
