

import {
  ChevronLeft,
  ChevronRight,
  ChevronLeftDouble,
  ChevronRightDouble,
} from "@untitledui/icons";

import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface DataTablePaginationProps {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions?: number[];
  totalRows?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export function DataTablePagination({
  currentPage,
  pageCount,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  totalRows,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < pageCount;

  const total = totalRows ?? pageCount * pageSize;
  const startRow = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endRow = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-2 py-4 lg:gap-x-8">
      {/* Rows per page */}
      {onPageSizeChange && (
        <div className="flex items-center space-x-2">
          <p className="text-muted-foreground whitespace-nowrap text-sm">
            Rows per page
          </p>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Showing X–Y of {total} results */}
      <div className="text-muted-foreground whitespace-nowrap text-sm">
        Showing {startRow}-{endRow} of {total} results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => onPageChange(1)}
          disabled={!canPreviousPage}
          aria-label="Go to first page"
        >
          <ChevronLeftDouble className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPreviousPage}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNextPage}
          aria-label="Go to next page"
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => onPageChange(pageCount)}
          disabled={!canNextPage}
          aria-label="Go to last page"
        >
          <ChevronRightDouble className="size-4" />
        </Button>
      </div>
    </div>
  );
}
