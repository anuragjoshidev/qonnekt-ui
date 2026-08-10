import * as React from "react";
import { Check } from "@untitledui/icons";
import { Badge, type BadgeProps, type BadgeColorPreset } from "./badge";
import { cn } from "../lib/utils";

export interface ChipProps extends Omit<BadgeProps, "onSelect"> {
  selectable?: boolean;
  /** Controlled selected state. */
  selected?: boolean;
  /** Called when selection toggles (prefer over DOM `onSelect`). */
  onSelectedChange?: (selected: boolean) => void;
  /** @deprecated Use `onSelectedChange`. */
  onSelect?: (selected: boolean) => void;
  /** Color when selected (default `blue`). */
  selectedColor?: BadgeColorPreset;
  /** Color when not selected (default `grey` in controlled/uncontrolled select mode). */
  unselectedColor?: BadgeColorPreset;
}

function Chip({
  className,
  color,
  selectable = false,
  selected: selectedProp,
  onSelectedChange,
  onSelect,
  selectedColor = "blue",
  unselectedColor = "grey",
  children,
  onClick,
  onKeyDown,
  ...props
}: ChipProps) {
  const [internalSelected, setInternalSelected] = React.useState(false);
  const isControlled = selectedProp !== undefined;
  const selected = isControlled ? selectedProp : internalSelected;

  const toggle = React.useCallback(() => {
    if (!selectable) return;
    const next = !selected;
    if (!isControlled) setInternalSelected(next);
    onSelectedChange?.(next);
    onSelect?.(next);
  }, [selectable, selected, isControlled, onSelectedChange, onSelect]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      onClick?.(e);
      toggle();
    },
    [onClick, toggle],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      onKeyDown?.(e);
      if (!selectable) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [onKeyDown, selectable, toggle],
  );

  const effectiveColor: BadgeColorPreset | undefined = selectable
    ? selected
      ? selectedColor
      : (color ?? unselectedColor)
    : color;

  return (
    <Badge
      data-slot="chip"
      color={effectiveColor}
      role={selectable ? "button" : undefined}
      tabIndex={selectable ? 0 : undefined}
      aria-pressed={selectable ? selected : undefined}
      className={cn(
        "gap-1",
        (selectable || onClick) && "cursor-pointer",
        selectable &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="truncate">{children}</span>
      {selected && <Check className="size-3" />}
    </Badge>
  );
}

export { Chip };
