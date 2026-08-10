

import * as React from "react";
import { cn } from "../lib/utils";
import { Separator } from "./separator";

type DividerOrientation = "horizontal" | "vertical";
type DividerTitlePlacement = "start" | "center" | "end";
type DividerStroke = "none" | "left" | "right" | "both";
type DividerTitleStyle = "default" | "muted";

interface DividerProps extends React.ComponentProps<"div"> {
  orientation?: DividerOrientation;
  titlePlacement?: DividerTitlePlacement;
  titleStyle?: DividerTitleStyle;
  stroke?: DividerStroke;
}

const CONTENT_PADDING: Record<
  DividerOrientation,
  Record<DividerTitlePlacement, string>
> = {
  horizontal: { start: "pr-3 py-0", center: "px-3 py-0", end: "pl-3 py-0" },
  vertical: { start: "pr-3 py-3", center: "px-3 py-3", end: "pl-3 py-3" },
};

const STROKE_CLASS: Record<DividerOrientation, string> = {
  horizontal: "flex-1 min-w-0",
  vertical: "flex-1 min-h-0",
};

const TITLE_STYLE_CLASS: Record<DividerTitleStyle, string> = {
  default: "text-foreground text-sm font-medium",
  muted: "text-xs text-muted-foreground font-medium",
};

function Divider({
  className,
  orientation = "horizontal",
  titlePlacement = "start",
  titleStyle = "default",
  stroke,
  children,
  ...props
}: DividerProps) {
  const hasContent = React.Children.count(children) > 0;

  const showLeft =
    stroke !== undefined
      ? stroke === "left" || stroke === "both"
      : titlePlacement === "center" || titlePlacement === "end";
  const showRight =
    stroke !== undefined
      ? stroke === "right" || stroke === "both"
      : titlePlacement === "center" || titlePlacement === "start";

  const showSeparator = stroke !== "none";

  if (!hasContent) {
    return (
      <div
        data-slot="divider"
        data-orientation={orientation}
        className={cn("flex w-full shrink-0", className)}
        {...props}
      >
        {showSeparator && (
          <Separator orientation={orientation} className="flex-1" />
        )}
      </div>
    );
  }

  const flexDir = orientation === "horizontal" ? "flex-row" : "flex-col";

  return (
    <div
      data-slot="divider"
      data-orientation={orientation}
      data-has-content
      className={cn("flex w-full shrink-0 items-center gap-0", flexDir, className)}
      {...props}
    >
      {showLeft && (
        <Separator
          orientation={orientation}
          className={STROKE_CLASS[orientation]}
          aria-hidden
        />
      )}
      <span
        data-slot="divider-content"
        className={cn(
          "shrink-0",
          TITLE_STYLE_CLASS[titleStyle],
          CONTENT_PADDING[orientation][titlePlacement]
        )}
      >
        {children}
      </span>
      {showRight && (
        <Separator
          orientation={orientation}
          className={STROKE_CLASS[orientation]}
          aria-hidden
        />
      )}
    </div>
  );
}

export { Divider, type DividerProps };
