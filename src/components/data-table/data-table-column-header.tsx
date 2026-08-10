

import { type Column } from "@tanstack/react-table";
import {
  ArrowNarrowDown,
  ArrowNarrowUp,
  SwitchVertical01,
} from "@untitledui/icons";

import { cn } from "../../lib/utils";
import { HelpText } from "../help-text";

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  /** Optional help message shown in a tooltip next to the header title. */
  helpMessage?: React.ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  helpMessage,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const help = helpMessage ? (
    <HelpText message={helpMessage} className="shrink-0" />
  ) : null;

  if (!column.getCanSort()) {
    return (
      <div className={cn("flex items-center gap-2 min-w-0", className)}>
        <span className="truncate">{title}</span>
        {help}
      </div>
    );
  }

  const sorted = column.getIsSorted();

  const handleClick = () => {
    if (sorted === false) {
      column.toggleSorting(false);
    } else if (sorted === "asc") {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  };

  return (
    <div
      className={cn(
        "flex w-[calc(100%+1rem)] -mx-2 min-w-0 items-center gap-1",
        className,
      )}
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex h-8 w-full min-w-0 items-center gap-2 rounded px-2 py-1.5 text-left font-medium transition-colors"
      >
        <span className="truncate">{title}</span>
        {sorted === "desc" ? (
          <ArrowNarrowDown className="size-4 shrink-0" />
        ) : sorted === "asc" ? (
          <ArrowNarrowUp className="size-4 shrink-0" />
        ) : (
          <SwitchVertical01 className="size-4 shrink-0 text-muted-foreground" />
        )}
        {help}
      </button>
    </div>
  );
}
