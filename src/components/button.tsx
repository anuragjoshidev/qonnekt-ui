import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { Spinner } from "./spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring aria-invalid:ring-destructive aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-blue-foreground underline-offset-4 hover:underline p-0!",
      },
      size: {
        default: "h-9 px-3 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-4 has-[>svg]:px-4",
        icon: "size-9!",
        "icon-sm": "size-8!",
        "icon-lg": "size-10!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
    /**
     * Shows a spinner and disables the control. Spinner is injected only on a
     * native `<button>`; `asChild` / `href` get `aria-busy` and disabled styling only.
     */
    loading?: boolean;
    tooltip?: React.ReactNode;
    /** Shown instead of `tooltip` when the button is disabled or loading. */
    disabledTooltip?: React.ReactNode;
    tooltipSide?: React.ComponentProps<typeof TooltipContent>["side"];
    tooltipAlign?: React.ComponentProps<typeof TooltipContent>["align"];
    /** Used for external `href` links (e.g. open PDF in a new tab). */
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  href,
  loading,
  disabled,
  tooltip,
  disabledTooltip,
  tooltipSide,
  tooltipAlign,
  target,
  rel,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));
  const isDisabled = Boolean(disabled || loading);
  const tooltipContent = isDisabled ? (disabledTooltip ?? tooltip) : tooltip;
  const showSpinner = Boolean(loading) && !asChild && (href == null || href === "");

  let buttonElement: React.ReactNode;

  if (href != null && href !== "") {
    buttonElement = (
      <a
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={classes}
        href={href}
        target={target}
        rel={rel}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...(props as React.ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  } else {
    const Comp = asChild ? Slot : "button";

    buttonElement = (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {showSpinner ? <Spinner aria-live="polite" /> : null}
        {children}
      </Comp>
    );
  }

  if (tooltipContent == null || tooltipContent === "") {
    return buttonElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {isDisabled ? (
          <span tabIndex={0} className="inline-flex cursor-not-allowed">
            {buttonElement}
          </span>
        ) : (
          buttonElement
        )}
      </TooltipTrigger>
      <TooltipContent side={tooltipSide} align={tooltipAlign}>
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
}

export { Button, buttonVariants };
