

import * as React from "react";

import { Input } from "./input";
import { cn } from "../lib/utils";

function isValidNumberText(
  value: string,
  allowNegative: boolean,
  integer: boolean,
) {
  if (value === "") return true;
  if (allowNegative && value === "-") return true;
  if (integer) {
    return allowNegative ? /^-?\d*$/.test(value) : /^\d*$/.test(value);
  }
  return allowNegative ? /^-?\d*\.?\d*$/.test(value) : /^\d*\.?\d*$/.test(value);
}

function displayFromNumber(
  n: number,
  showEmptyWhenZero: boolean,
  decimalPlaces: number | undefined,
  integer: boolean,
): string {
  if (!Number.isFinite(n)) return "";
  if (showEmptyWhenZero && n === 0) return "";
  if (!integer && decimalPlaces != null) return n.toFixed(decimalPlaces);
  return String(n);
}

type InputNumberProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange" | "type" | "inputMode"
> & {
  value: number;
  onChange: (value: number) => void;
  /** When empty, call `onChange(0)` so controlled forms stay numeric. Default true. */
  allowEmptyAsZero?: boolean;
  /** Render `0` as an empty field when the value is not being edited. Default true. */
  showEmptyWhenZero?: boolean;
  allowNegative?: boolean;
  /** When set, format the displayed value with fixed decimal places (e.g. `1` → `1.000`). */
  decimalPlaces?: number;
  /** Restrict input to whole numbers (disallows the decimal point). Default false. */
  integer?: boolean;
};

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      value,
      onChange,
      allowEmptyAsZero = true,
      showEmptyWhenZero = true,
      allowNegative = false,
      decimalPlaces,
      integer = false,
      className,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [textValue, setTextValue] = React.useState(() =>
      displayFromNumber(value, showEmptyWhenZero, decimalPlaces, integer),
    );
    const focusedRef = React.useRef(false);

    React.useEffect(() => {
      if (focusedRef.current) return;
      setTextValue(
        displayFromNumber(value, showEmptyWhenZero, decimalPlaces, integer),
      );
    }, [value, showEmptyWhenZero, decimalPlaces, integer]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextText = event.target.value;
      if (!isValidNumberText(nextText, allowNegative, integer)) {
        return;
      }
      setTextValue(nextText);

      if (nextText === "" || nextText === "-" || nextText === ".") {
        if (allowEmptyAsZero && nextText === "") {
          onChange(0);
        }
        return;
      }

      const parsedValue = Number.parseFloat(nextText);
      if (Number.isFinite(parsedValue)) {
        onChange(parsedValue);
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      focusedRef.current = true;
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      focusedRef.current = false;
      const raw = event.target.value.trim();
      if (raw === "" || raw === "-" || raw === ".") {
        if (allowEmptyAsZero) {
          onChange(0);
        }
        setTextValue(
          displayFromNumber(0, showEmptyWhenZero, decimalPlaces, integer),
        );
      } else {
        const parsed = Number.parseFloat(raw);
        let next = Number.isFinite(parsed)
          ? allowNegative
            ? parsed
            : Math.max(0, parsed)
          : 0;
        if (integer) next = Math.trunc(next);
        onChange(next);
        setTextValue(
          displayFromNumber(next, showEmptyWhenZero, decimalPlaces, integer),
        );
      }
      onBlur?.(event);
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode={integer ? "numeric" : "decimal"}
        autoComplete="off"
        value={textValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(className)}
        {...props}
      />
    );
  },
);

InputNumber.displayName = "InputNumber";

export { InputNumber, type InputNumberProps };
