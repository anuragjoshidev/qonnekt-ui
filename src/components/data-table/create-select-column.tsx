import type { ColumnDef, RowData } from "@tanstack/react-table";

import { Checkbox } from "../checkbox";

export type CreateSelectColumnOptions = {
  /** Aria label for the header “select all on this page” checkbox. */
  selectAllAriaLabel?: string;
  /** Build an aria-label for a row checkbox. Defaults to “Select row”. */
  getRowAriaLabel?: (rowIndex: number) => string;
};

/**
 * Checkbox column for TanStack row selection.
 * Header toggles all rows on the current page; cell toggles one row.
 */
export function createSelectColumn<TData extends RowData>(
  options: CreateSelectColumnOptions = {},
): ColumnDef<TData> {
  const selectAllAriaLabel =
    options.selectAllAriaLabel ?? "Select all rows on this page";
  const getRowAriaLabel =
    options.getRowAriaLabel ?? ((_rowIndex: number) => "Select row");

  return {
    id: "select",
    size: 44,
    minSize: 44,
    maxSize: 44,
    header: ({ table }) => (
      <div className="flex justify-center px-1">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(value === true)
          }
          aria-label={selectAllAriaLabel}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center px-1">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(value === true)}
          disabled={!row.getCanSelect()}
          aria-label={getRowAriaLabel(row.index)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
