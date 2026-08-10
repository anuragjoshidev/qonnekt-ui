import type { RowData } from "@tanstack/react-table";

import { Spinner } from "../spinner";
import { DataTable, type DataTableProps } from "./data-table";
import { DataTablePagination } from "./data-table-pagination";

export type DataTableListProps<TData extends RowData, TValue> =
  DataTableProps<TData, TValue> & {
    isFetching?: boolean;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };

export function DataTableList<TData extends RowData, TValue>({
  isFetching = false,
  currentPage,
  onPageChange,
  onPageSizeChange,
  manualPagination,
  pageCount,
  rowCount,
  state,
  ...dataTableProps
}: DataTableListProps<TData, TValue>) {
  const paginationPageSize = state?.pagination?.pageSize ?? 10;

  return (
    <div className="relative space-y-4">
      {isFetching ? (
        <div className="absolute top-2 right-2 z-10">
          <Spinner className="size-4" />
        </div>
      ) : null}
      <DataTable
        {...dataTableProps}
        manualPagination={manualPagination}
        pageCount={pageCount}
        rowCount={rowCount}
        state={state}
      />
      {manualPagination &&
      currentPage != null &&
      onPageChange != null &&
      pageCount != null ? (
        <DataTablePagination
          currentPage={currentPage}
          pageCount={pageCount}
          pageSize={paginationPageSize}
          totalRows={rowCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      ) : null}
    </div>
  );
}
