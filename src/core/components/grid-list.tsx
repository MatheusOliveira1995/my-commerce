import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { ComponentProps, ReactElement, ReactNode, Suspense } from "react";
import GridListPagination from "@/core/components/grid-list-pagination";

interface GridListProps<T> {
  data: Array<T>;
  renderItem: (item: T) => ReactNode;
  renderSkeleton?: (index: number) => ReactNode;
  total: number;
  gridContainerProps?: ComponentProps<typeof Grid>;
  gridItemProps?: Omit<ComponentProps<typeof Grid>, "container" | "children">;
  page: number;
  isLoading?: boolean;
}

const GridList = <T extends object>(props: GridListProps<T>): ReactElement => {
  const {
    data,
    isLoading = false,
    renderItem,
    renderSkeleton,
    total = 0,
    gridContainerProps = {},
    gridItemProps = {},
    page = 1,
  } = props;

  return (
    <Stack gap={3}>
      <Grid {...gridContainerProps}>
        {isLoading
          ? Array.from({ length: total }).map((_, i) => (
              <Grid {...gridItemProps} key={`skeleton-${i}`}>
                {renderSkeleton ? (
                  renderSkeleton(i)
                ) : (
                  <Skeleton variant="rectangular" height={200} />
                )}
              </Grid>
            ))
          : data.map((item, index) => (
              <Grid {...gridItemProps} key={`item-${index}`}>
                {renderItem(item)}
              </Grid>
            ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Suspense fallback={null}>
          <GridListPagination page={page} total={total} />
        </Suspense>
      </Box>
    </Stack>
  );
};

export default GridList;
