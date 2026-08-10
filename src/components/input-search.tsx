import * as React from "react";
import { SearchLg } from "@untitledui/icons";
import { useDebouncedCallback } from "use-debounce";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./input-group";

const DEFAULT_DEBOUNCE_MS = 300;

export interface InputSearchProps
  extends Omit<React.ComponentProps<"input">, "type" | "onChange"> {
  placeholder?: string;
  /** When provided, the input is controlled by `value` and changes are reported after debounce. */
  value?: string;
  /** Called after user stops typing for `debounceMs`. Use with `value` for controlled debounced search. */
  onChange?: (value: string) => void;
  /** Delay in ms before `onChange` is called. Default 300. */
  debounceMs?: number;
}

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      placeholder = "Search...",
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      debounceMs = DEFAULT_DEBOUNCE_MS,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [localValue, setLocalValue] = React.useState(
      () => controlledValue ?? defaultValue ?? ""
    );
    // Last value we emitted via onChange. Used so echoed/debounced parent values
    // don't overwrite in-progress typing; only genuine external changes (clear/reset) sync.
    const lastEmittedRef = React.useRef(localValue);

    React.useEffect(() => {
      if (!isControlled) return;
      const next = controlledValue ?? "";
      if (next === lastEmittedRef.current) return;
      lastEmittedRef.current = next;
      setLocalValue(next);
    }, [isControlled, controlledValue]);

    const debouncedOnChange = useDebouncedCallback(
      (value: string) => {
        lastEmittedRef.current = value;
        onChange?.(value);
      },
      debounceMs
    );

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const next = e.target.value;
      setLocalValue(next);
      debouncedOnChange(next);
    };

    return (
      <InputGroup className={className}>
        <InputGroupAddon align="inline-start">
          <SearchLg />
        </InputGroupAddon>
        <InputGroupInput
          ref={ref}
          type="search"
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          {...props}
        />
      </InputGroup>
    );
  }
);

InputSearch.displayName = "InputSearch";

export { InputSearch };
