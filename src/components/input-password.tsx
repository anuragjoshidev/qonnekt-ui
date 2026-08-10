

import * as React from "react";
import { Eye, EyeOff } from "@untitledui/icons";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";

export interface InputPasswordProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  placeholder?: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, placeholder = "********", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <InputGroup className={className}>
        <InputGroupInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...props}
          autoComplete={props.autoComplete ?? "current-password"}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
