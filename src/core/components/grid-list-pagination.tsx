"use client";

import { ChangeEvent, ReactElement } from "react";
import { Pagination } from "@mui/material";
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

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    const basePath = pathname.replace(/\/\d+$/, "");
    push(basePath + "/" + value);
  };

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      count={total}
      onChange={handlePageChange}
      page={page}
    />
  );
};

export default GridListPagination;
