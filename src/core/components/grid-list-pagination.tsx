"use client";

import { ChangeEvent, ReactElement, useTransition } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

interface GridListPaginationProps {
  page: number;
  total: number;
}

const GridListPagination = (props: GridListPaginationProps): ReactElement => {
  const { page, total } = props;
  const pathname = usePathname();
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const normalizedTotal = Math.max(1, total);
  const normalizedPage = Math.min(Math.max(page, 1), normalizedTotal);

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    const basePath = pathname.replace(/\/\d+$/, "");
    startTransition(() => {
      push(basePath + "/" + value, { scroll: false });
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
        count={normalizedTotal}
        onChange={handlePageChange}
        page={normalizedPage}
        disabled={isPending}
      />
      {isPending && <CircularProgress size={20} />}
    </Box>
  );
};

export default GridListPagination;
