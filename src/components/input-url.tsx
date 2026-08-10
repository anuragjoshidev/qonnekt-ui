import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./input-group";
import { detectProtocol, removeProtocol } from "../lib/utils/url";

export interface InputUrlProps
  extends Omit<
    React.ComponentProps<"input">,
    "type" | "value" | "onChange" | "defaultValue"
  > {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Default scheme when the value has none. Pasted http(s) schemes are preserved. */
  protocol?: string;
}

const InputUrl = React.forwardRef<HTMLInputElement, InputUrlProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder = "example.com",
      protocol: protocolProp = "https://",
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ? removeProtocol(defaultValue) : "",
    );
    const [activeProtocol, setActiveProtocol] = React.useState(() =>
      detectProtocol(value ?? defaultValue, protocolProp),
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setActiveProtocol(detectProtocol(value, protocolProp));
      }
    }, [value, protocolProp]);

    const displayValue = isControlled
      ? removeProtocol(value || "")
      : internalValue;

    const updateValue = React.useCallback(
      (inputValue: string) => {
        const nextProtocol = detectProtocol(inputValue, activeProtocol);
        const cleanedValue = removeProtocol(inputValue);
        const protocol = cleanedValue ? nextProtocol : protocolProp;
        const fullUrl = cleanedValue ? `${protocol}${cleanedValue}` : "";

        setActiveProtocol(protocol);

        if (isControlled) {
          onChange?.(fullUrl);
        } else {
          setInternalValue(cleanedValue);
          onChange?.(fullUrl);
        }
      },
      [activeProtocol, isControlled, onChange, protocolProp],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateValue(e.target.value);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      updateValue(e.clipboardData.getData("text"));
    };

    return (
      <InputGroup className={className}>
        <InputGroupAddon align="inline-start">
          <InputGroupText>{activeProtocol}</InputGroupText>
        </InputGroupAddon>
        {/*
          Use type="text" (not type="url"): the visible value is protocol-stripped,
          so native URL constraint validation would reject valid hosts like localhost.
        */}
        <InputGroupInput
          ref={ref}
          type="text"
          inputMode="url"
          autoComplete="url"
          value={displayValue}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder={placeholder}
          {...props}
        />
      </InputGroup>
    );
  },
);

InputUrl.displayName = "InputUrl";

export { InputUrl };
