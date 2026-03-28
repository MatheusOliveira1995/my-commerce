"use client";

import { ChangeEvent, ReactElement } from "react";
import { Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface GridListPaginationProps {
  page: number;
  total: number;
}

const GridListPagination = ({
  page,
  total,
}: GridListPaginationProps): ReactElement => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const currentPage = Number(searchParams.get("page")) || page;

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());

    push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      count={total}
      onChange={handlePageChange}
      page={currentPage}
    />
  );
};

export default GridListPagination;
