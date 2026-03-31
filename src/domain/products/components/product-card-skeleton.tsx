import { ReactElement } from "react";
import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

const CARD_SKELETON_SX = {
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
  textLine: {
    width: "100%",
    height: 20,
  },
  button: {
    width: "100%",
    height: 40,
  },
} as const;

const ProductCardSkeleton = (): ReactElement => {
  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: "row", sm: "column" }}
          spacing={2}
          alignItems={{ xs: "center", sm: "stretch" }}
          sx={{ "& > :first-of-type": { alignSelf: { sm: "center" } } }}
        >
          <Box sx={CARD_SKELETON_SX.imageFrame}>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ position: "absolute", inset: 0 }}
            />
          </Box>

          <Stack sx={CARD_SKELETON_SX.contentStack} spacing={1.5}>
            <Stack spacing={0.75}>
              <Skeleton
                variant="text"
                animation="wave"
                sx={CARD_SKELETON_SX.textLine}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ ...CARD_SKELETON_SX.textLine, width: "64%" }}
              />
            </Stack>

            <Skeleton
              variant="rounded"
              animation="wave"
              sx={CARD_SKELETON_SX.button}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
