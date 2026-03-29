"use client";

import { ChangeEvent, ReactElement, useTransition } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

interface GridListPaginationProps {
  page: number;
  total: number;
}

const GridListPagination = ({
  page,
  total,
}: GridListPaginationProps): ReactElement => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    const basePath = pathname.replace(/\/\d+$/, "");
    startTransition(() => {
      push(basePath + "/" + value);
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Pagination
        variant="outlined"
        shape="rounded"
        count={total}
        onChange={handlePageChange}
        page={page}
        disabled={isPending}
      />
      {isPending && <CircularProgress size={20} />}
    </Box>
  );
};

export default GridListPagination;
