import * as React from "react";

import { cn } from "../lib/utils";

// Color preset types (mirrors badge presets)
export type AlertColorPreset =
  | "purple"
  | "yellow"
  | "blue"
  | "lime"
  | "red"
  | "green"
  | "grey"
  | "rose"
  | "emerald";

const alertBaseClasses =
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current";

// Map color presets to Tailwind classes using semantic color variables
const alertColorClasses: Record<AlertColorPreset, string> = {
  purple:
    "border-purple-border bg-purple-background text-purple-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-purple-foreground/90",
  yellow:
    "border-yellow-border bg-yellow-background text-yellow-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-yellow-foreground/90",
  blue: "border-blue-border bg-blue-background text-blue-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-blue-foreground/90",
  lime: "border-lime-border bg-lime-background text-lime-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-lime-foreground/90",
  red: "border-red-border bg-red-background text-red-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-red-foreground/90",
  green:
    "border-green-border bg-green-background text-green-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-green-foreground/90",
  grey: "border-grey-border bg-grey-background text-grey-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-grey-foreground/90",
  rose: "border-rose-border bg-rose-background text-rose-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-rose-foreground/90",
  emerald:
    "border-emerald-border bg-emerald-background text-emerald-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-emerald-foreground/90",
};

function Alert({
  className,
  color = "grey",
  ...props
}: React.ComponentProps<"div"> & { color?: AlertColorPreset }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertBaseClasses, alertColorClasses[color], className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
