import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../lib/utils";

// Color preset types
export type BadgeColorPreset =
  | "purple"
  | "yellow"
  | "blue"
  | "lime"
  | "red"
  | "green"
  | "grey"
  | "rose"
  | "emerald";

// Map color presets to Tailwind classes using semantic color variables
const badgeColorClasses: Record<BadgeColorPreset, string> = {
  purple:
    "bg-purple-background text-purple-foreground border-transparent [a&]:hover:bg-purple-background/90",
  yellow:
    "bg-yellow-background text-yellow-foreground border-transparent [a&]:hover:bg-yellow-background/90",
  blue: "bg-blue-background text-blue-foreground border-transparent [a&]:hover:bg-blue-background/90",
  lime: "bg-lime-background text-lime-foreground border-transparent [a&]:hover:bg-lime-background/90",
  red: "bg-red-background text-red-foreground border-transparent [a&]:hover:bg-red-background/90",
  green:
    "bg-green-background text-green-foreground border-transparent [a&]:hover:bg-green-background/90",
  grey: "bg-grey-background text-grey-foreground border-transparent [a&]:hover:bg-grey-background/90",
  rose: "bg-rose-background text-rose-foreground border-transparent [a&]:hover:bg-rose-background/90",
  emerald:
    "bg-emerald-background text-emerald-foreground border-transparent [a&]:hover:bg-emerald-background/90",
};

// Base badge styles
const badgeBaseClasses =
  "inline-flex items-center justify-center rounded-sm border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring aria-invalid:border-destructive transition-[color] overflow-hidden";

const variantToColor: Record<string, BadgeColorPreset> = {
  default: "green",
  secondary: "grey",
  destructive: "red",
  outline: "grey",
};

export type BadgeProps = React.ComponentProps<"span"> & {
  color?: BadgeColorPreset;
  /** Shadcn-compatible alias mapped to {@link color} presets. */
  variant?: keyof typeof variantToColor;
  asChild?: boolean;
};

function Badge({
  className,
  color,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  const resolvedColor = color ?? (variant ? variantToColor[variant] : "grey");
  const outline = variant === "outline";

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeBaseClasses,
        badgeColorClasses[resolvedColor ?? "grey"],
        outline && "border-border bg-transparent text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
