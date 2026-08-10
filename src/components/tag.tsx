import * as React from "react";
import { XClose } from "@untitledui/icons";
import { Badge, type BadgeProps } from "./badge";
import { cn } from "../lib/utils";

export interface TagProps extends BadgeProps {
  onRemove?: () => void;
  /** When true (or when `onRemove` is set), shows the remove control. */
  removable?: boolean;
  /** Accessible label for the remove button. */
  removeLabel?: string;
}

function Tag({
  className,
  onRemove,
  removable,
  removeLabel = "Remove tag",
  children,
  ...props
}: TagProps) {
  const showRemove = Boolean(onRemove) && (removable ?? true);

  const handleRemove = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    },
    [onRemove],
  );

  return (
    <Badge data-slot="tag" className={cn("gap-1", className)} {...props}>
      <span className="truncate flex items-center gap-1">{children}</span>
      {showRemove && (
        <button
          type="button"
          data-slot="tag-remove"
          onClick={handleRemove}
          className="ml-0.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          aria-label={removeLabel}
        >
          <XClose className="size-3" />
        </button>
      )}
    </Badge>
  );
}

export { Tag };
