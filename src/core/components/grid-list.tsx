import { ComponentProps, ReactElement, ReactNode } from "react";
import { Grid, Skeleton } from "@mui/material";

interface GridListProps<T> {
  data: Array<T>;
  renderItem: (item: T) => ReactNode;
  renderSkeleton?: (index: number) => ReactNode;
  skeletonCount?: number;
  gridContainerProps?: ComponentProps<typeof Grid>;
  gridItemProps?: Omit<ComponentProps<typeof Grid>, "container" | "children">;
  page?: number;
  setPage?: (page: number) => void;
  isLoading?: boolean;
}

const GridList = <T extends Record<string, unknown>>(
  props: GridListProps<T>,
): ReactElement => {
  const {
    data,
    isLoading = false,
    renderItem,
    renderSkeleton,
    skeletonCount = 10,
    gridContainerProps = {},
    gridItemProps = {},
  } = props;

  return (
    <Grid {...gridContainerProps}>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
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
  );
};

export default GridList;
