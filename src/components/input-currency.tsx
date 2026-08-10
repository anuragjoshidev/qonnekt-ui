
import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./input-group";
import { cn } from "../lib/utils";
import { getCurrencySymbol } from "../lib/utils/currency";

function isValidCurrencyText(
  value: string,
  allowNegative: boolean,
) {
  if (value === "") return true;
  if (allowNegative && value === "-") return true;
  return allowNegative ? /^-?\d*\.?\d*$/.test(value) : /^\d*\.?\d*$/.test(value);
}

function displayFromNumber(
  n: number,
  showEmptyWhenZero: boolean,
  decimalPlaces: number | undefined,
): string {
  if (!Number.isFinite(n)) return "";
  if (showEmptyWhenZero && n === 0) return "";
  if (decimalPlaces != null) return n.toFixed(decimalPlaces);
  return String(n);
}

export type InputCurrencyProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "onChange" | "type"
> & {
  value: number;
  onChange: (value: number) => void;
  /** When empty, call `onChange(0)` so controlled forms stay numeric. Default true. */
  allowEmptyAsZero?: boolean;
  /** Render `0` as an empty field when the value is not being edited. Default true. */
  showEmptyWhenZero?: boolean;
  allowNegative?: boolean;
  /** When set, format the displayed value with fixed decimal places (e.g. `1` → `1.00`). */
  decimalPlaces?: number;
  /** ISO currency code for the symbol addon (default INR). */
  currency?: string;
  /** Locale for currency symbol formatting (default en-IN). */
  locale?: string;
};

const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  (
    {
      value,
      onChange,
      allowEmptyAsZero = true,
      showEmptyWhenZero = true,
      allowNegative = false,
      decimalPlaces,
      currency,
      locale,
      className,
      onBlur,
      onFocus,
      min = 0,
      step = "0.01",
      ...props
    },
    ref,
  ) => {
    const [textValue, setTextValue] = React.useState(() =>
      displayFromNumber(value, showEmptyWhenZero, decimalPlaces),
    );
    const focusedRef = React.useRef(false);

    React.useEffect(() => {
      if (focusedRef.current) return;
      setTextValue(displayFromNumber(value, showEmptyWhenZero, decimalPlaces));
    }, [value, showEmptyWhenZero, decimalPlaces]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextText = event.target.value;

      if (!isValidCurrencyText(nextText, allowNegative)) {
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
        setTextValue(displayFromNumber(0, showEmptyWhenZero, decimalPlaces));
      } else {
        const parsed = Number.parseFloat(raw);
        const next = Number.isFinite(parsed)
          ? allowNegative
            ? parsed
            : Math.max(0, parsed)
          : 0;
        onChange(next);
        setTextValue(displayFromNumber(next, showEmptyWhenZero, decimalPlaces));
      }
      onBlur?.(event);
    };

    return (
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>
            {getCurrencySymbol({ currency, locale })}
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          ref={ref}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          min={min}
          step={step}
          value={textValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn(className)}
          {...props}
        />
      </InputGroup>
    );
  },
);

InputCurrency.displayName = "InputCurrency";

export { InputCurrency };
