import type { ComponentProps } from "react";
import { Loading02 } from "@untitledui/icons";

import { cn } from "../lib/utils";

function Spinner({ className, ...props }: ComponentProps<"svg">) {
  const { "aria-label": ariaLabel = "Loading", ...iconProps } = props;
  return (
    <span role="status" aria-label={ariaLabel} aria-live="polite">
      <Loading02
        aria-hidden
        className={cn("size-4 animate-spin", className)}
        {...iconProps}
      />
    </span>
  );
}

export { Spinner };
