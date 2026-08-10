

import * as React from "react";
import { HelpCircle } from "@untitledui/icons";

import { cn } from "../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./tooltip";

const DEFAULT_ICON = <HelpCircle className="size-3" />;

interface HelpTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon shown as the tooltip trigger. Defaults to InfoCircle (size-3). */
  icon?: React.ReactNode;
  /** Content shown inside the tooltip. */
  message?: React.ReactNode;
}

const HelpText = React.forwardRef<HTMLDivElement, HelpTextProps>(
  ({ icon = DEFAULT_ICON, message, className, ...props }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={ref}
            role="img"
            aria-label="Help"
            data-slot="help-text-trigger"
            className={cn("cursor-help inline-flex shrink-0", className)}
            {...props}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent data-slot="help-text-content">
          {message}
        </TooltipContent>
      </Tooltip>
    );
  }
);

HelpText.displayName = "HelpText";

export { HelpText };
export type { HelpTextProps };
