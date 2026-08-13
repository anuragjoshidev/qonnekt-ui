

import * as React from "react";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ColumnPinningPosition,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "../../lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../empty";
import { InputSearch } from "../input-search";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTablePagination } from "./data-table-pagination";

function pinnedHeadClass(position: ColumnPinningPosition) {
  if (position === "left") {
    return "sticky z-30 bg-background border-r";
  }
  if (position === "right") {
    return "sticky z-30 bg-background border-l";
  }
  return "";
}

function pinnedCellClass(position: ColumnPinningPosition) {
  if (position === "left") {
    return cn(
      "sticky z-20 bg-background border-r",
      "group-hover:bg-hover group-data-[state=selected]:bg-hover",
    );
  }
  if (position === "right") {
    return cn(
      "sticky z-20 bg-background border-l",
      "group-hover:bg-hover group-data-[state=selected]:bg-hover",
    );
  }
  return "";
}

function pinnedOffsetStyle<TData extends RowData>(
  position: ColumnPinningPosition | false,
  column: Column<TData, unknown>,
): React.CSSProperties {
  if (position === "left") {
    return { left: column.getStart("left") };
  }
  if (position === "right") {
    return { right: column.getAfter("right") };
  }
  return {};
}

/** Reusable config for a single filterable column (e.g. name, email). */
export interface DataTableFilterColumnConfig {
  id: string;
  placeholder?: string;
  label?: string;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  rowCount?: number;
  initialState?: {
    pagination?: PaginationState;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    columnVisibility?: VisibilityState;
    columnPinning?: ColumnPinningState;
  };
  state?: {
    pagination?: PaginationState;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    rowSelection?: RowSelectionState;
  };
  /** Required for stable keys when using row selection. */
  getRowId?: (originalRow: TData) => string;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  /** Single search box (legacy): column id and placeholder. */
  filterPlaceholder?: string;
  filterColumn?: string;
  /** Multiple filter columns: one input per config. Use this for reusable multi-column filtering. */
  filterColumns?: DataTableFilterColumnConfig[];
  /** Extra content in the toolbar rendered before filters. */
  toolbarExtraBeforeFilters?: React.ReactNode;
  /** Extra content in the toolbar (e.g. date range picker), rendered after filters. */
  toolbarExtra?: React.ReactNode;
  /** Custom empty state copy when the table has no rows. */
  emptyTitle?: string;
  emptyDescription?: string;
  /** Debounce ms for toolbar search input. Set 0 when parent already debounces. Default 500. */
  filterDebounceMs?: number;
  /**
   * Renders {@link DataTablePagination} under the table for client-side pagination
   * (`getPaginationRowModel`). Ignored when `manualPagination` is true.
   */
  showPagination?: boolean;
  /**
   * Overrides the table element classes. Pass `w-full` when columns should share the
   * container width instead of growing to fit their content.
   */
  tableClassName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  rowCount: _rowCount,
  initialState,
  state: controlledState,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  onPaginationChange,
  onSortingChange,
  onColumnFiltersChange,
  getRowId,
  onRowSelectionChange,
  filterPlaceholder,
  filterColumn,
  filterColumns,
  toolbarExtraBeforeFilters,
  toolbarExtra,
  emptyTitle = "No records found",
  emptyDescription = "No data matches your filters. Try adjusting your search or filters.",
  filterDebounceMs = 500,
  showPagination = false,
  tableClassName,
}: DataTableProps<TData, TValue>) {
  const rowSelectionControlled =
    onRowSelectionChange != null &&
    controlledState?.rowSelection !== undefined;

  const table = useReactTable({
    data,
    columns,
    initialState,
    ...(getRowId != null && { getRowId }),
    ...(rowSelectionControlled && {
      enableRowSelection: true,
      onRowSelectionChange,
    }),
    getCoreRowModel: getCoreRowModel(),
    ...(manualPagination && {
      manualPagination: true,
      pageCount: pageCount ?? -1,
      onPaginationChange,
    }),
    ...(!manualPagination && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    ...(manualSorting && {
      manualSorting: true,
      onSortingChange,
    }),
    ...(!manualSorting && {
      getSortedRowModel: getSortedRowModel(),
    }),
    ...(manualFiltering && {
      manualFiltering: true,
      onColumnFiltersChange,
    }),
    ...(!manualFiltering && {
      getFilteredRowModel: getFilteredRowModel(),
    }),
    state: {
      ...(manualPagination &&
        (controlledState?.pagination ?? initialState?.pagination) != null && {
          pagination: controlledState?.pagination ?? initialState?.pagination,
        }),
      ...(manualSorting &&
        (controlledState?.sorting ?? initialState?.sorting) != null && {
          sorting: controlledState?.sorting ?? initialState?.sorting,
        }),
      ...(manualFiltering &&
        (controlledState?.columnFilters ?? initialState?.columnFilters) !=
          null && {
          columnFilters:
            controlledState?.columnFilters ?? initialState?.columnFilters,
        }),
      ...(rowSelectionControlled && {
        rowSelection: controlledState!.rowSelection!,
      }),
    },
  });

  const hasSingleFilter = filterColumn != null && filterPlaceholder != null;
  const hasMultiFilter =
    Array.isArray(filterColumns) && filterColumns.length > 0;
  const showToolbar =
    hasSingleFilter ||
    hasMultiFilter ||
    toolbarExtraBeforeFilters != null ||
    toolbarExtra != null ||
    table.getAllColumns().some((col) => col.getCanHide());

  return (
    <div className="space-y-4">
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-3 py-4 sm:gap-4">
          {toolbarExtraBeforeFilters}
          {hasSingleFilter && (
            <InputSearch
              placeholder={filterPlaceholder}
              value={
                (table.getColumn(filterColumn!)?.getFilterValue() as string) ??
                ""
              }
              onChange={(value) =>
                table.getColumn(filterColumn!)?.setFilterValue(value)
              }
              debounceMs={filterDebounceMs}
              className="w-auto max-w-sm shrink-0"
            />
          )}
          {hasMultiFilter &&
            filterColumns!.map((fc) => (
              <InputSearch
                key={fc.id}
                placeholder={
                  fc.placeholder ?? `Filter by ${fc.label ?? fc.id}...`
                }
                value={
                  (table.getColumn(fc.id)?.getFilterValue() as string) ?? ""
                }
                onChange={(value) =>
                  table.getColumn(fc.id)?.setFilterValue(value)
                }
                debounceMs={filterDebounceMs}
                className="w-auto max-w-sm shrink-0"
              />
            ))}
          {toolbarExtra}
          {table.getAllColumns().some((col) => col.getCanHide()) && (
            <div className="ml-auto shrink-0">
              <DataTableViewOptions table={table} />
            </div>
          )}
        </div>
      )}
      <div className="bg-background relative w-full overflow-x-auto rounded-md border">
        <Table className={cn("min-w-full w-max", tableClassName)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      minWidth:
                        header.column.columnDef.minSize ??
                        header.column.columnDef.size,
                      maxWidth: header.column.columnDef.maxSize,
                      ...pinnedOffsetStyle(
                        header.column.getIsPinned(),
                        header.column,
                      ),
                    }}
                    className={cn(
                      "text-muted-foreground text-xs",
                      pinnedHeadClass(header.column.getIsPinned()),
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth:
                          cell.column.columnDef.minSize ??
                          cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.maxSize,
                        ...pinnedOffsetStyle(
                          cell.column.getIsPinned(),
                          cell.column,
                        ),
                      }}
                      className={pinnedCellClass(cell.column.getIsPinned())}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <Empty className="min-h-[280px] border-0 py-12">
                    <EmptyMedia>
                      <img
                        src="/illustrations/no-data.webp"
                        alt=""
                        width={160}
                        height={160}
                        className="size-20 object-contain"
                        loading="eager"
                      />
                    </EmptyMedia>
                    <EmptyHeader>
                      <EmptyTitle>{emptyTitle}</EmptyTitle>
                      <EmptyDescription>{emptyDescription}</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && !manualPagination ? (
        <DataTablePagination
          currentPage={table.getState().pagination.pageIndex + 1}
          pageCount={Math.max(1, table.getPageCount())}
          pageSize={table.getState().pagination.pageSize}
          totalRows={table.getFilteredRowModel().rows.length}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          onPageSizeChange={(size) => {
            table.setPageSize(size);
            table.setPageIndex(0);
          }}
        />
      ) : null}
    </div>
  );
}
