import * as React from "react";
import { Check, ChevronSelectorVertical } from "@untitledui/icons";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import { Spinner } from "./spinner";
import { FILTER_CLEAR, isFilterClear } from "../lib/filters/constants";
import { cn } from "../lib/utils";

export {
  FILTER_CLEAR as SELECT_SEARCH_CLEAR_VALUE,
  isFilterClear as isSelectSearchClear,
};

export interface SelectSearchOption {
  value: string;
  label: string;
  key?: string;
  name?: string;
  searchText?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

const selectSearchTriggerInvalidClasses =
  "aria-invalid:border-destructive aria-invalid:ring-0";

type SelectSearchContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  clearable: boolean;
  clearValue: string;
  clearLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  required?: boolean;
  ariaInvalid?: boolean;
};

type SelectSearchItemContextValue = {
  value: string;
  selected: boolean;
  variant: "default" | "destructive";
};

const SelectSearchItemContext =
  React.createContext<SelectSearchItemContextValue | null>(null);

const SelectSearchContext =
  React.createContext<SelectSearchContextValue | null>(null);

const useSelectSearchContext = () => {
  const context = React.useContext(SelectSearchContext);
  if (!context) {
    throw new Error("SelectSearch components must be used within SelectSearch");
  }
  return context;
};

function SelectSearch({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Search...",
  emptyText = "No results found.",
  clearable = false,
  clearLabel = "Clear Filter",
  open: openProp,
  onOpenChange: onOpenChangeProp,
  required,
  "aria-invalid": ariaInvalid,
  onSearchChange,
  children,
  ...props
}: React.ComponentProps<typeof Popover> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  /** Fires with the current search text. Pair with the Command's `shouldFilter={false}` to filter/limit options yourself. */
  onSearchChange?: (value: string) => void;
  /** When true, value can be cleared to show the trigger placeholder (FILTER_CLEAR). */
  clearable?: boolean;
  clearLabel?: string;
  /** Marks the field as required; trigger shows invalid border when validation fails. */
  required?: boolean;
  "aria-invalid"?: boolean | "true" | "false";
}) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? (clearable ? FILTER_CLEAR : ""),
  );
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = React.useCallback(
    (newSearch: string) => {
      setSearchValue(newSearch);
      onSearchChange?.(newSearch);
    },
    [onSearchChange],
  );

  const value = valueProp ?? internalValue;
  const isControlled = valueProp !== undefined;
  const open = openProp ?? internalOpen;
  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (onOpenChangeProp) {
        onOpenChangeProp(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    },
    [onOpenChangeProp],
  );

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange, setOpen],
  );

  const contextValue: SelectSearchContextValue = {
    value,
    onValueChange: handleValueChange,
    placeholder,
    emptyText,
    clearable,
    clearValue: FILTER_CLEAR,
    clearLabel,
    open,
    onOpenChange: setOpen,
    searchValue,
    setSearchValue: handleSearchChange,
    required,
    ariaInvalid: ariaInvalid === true || ariaInvalid === "true",
  };

  return (
    <SelectSearchContext.Provider value={contextValue}>
      <Popover open={open} modal onOpenChange={setOpen} {...props}>
        {children}
      </Popover>
    </SelectSearchContext.Provider>
  );
}

function SelectSearchValue({
  placeholder = "Select...",
  children,
  className,
  ...props
}: {
  placeholder?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const { value, clearable, clearValue } = useSelectSearchContext();

  const isEmptyValue =
    value === "" ||
    value == null ||
    (clearable && (value === clearValue || isFilterClear(value)));

  const hasLabel =
    children !== undefined &&
    children !== null &&
    children !== false &&
    children !== "";

  if (isEmptyValue) {
    return (
      <span
        className={cn("font-normal text-muted-foreground", className)}
        {...props}
      >
        {placeholder}
      </span>
    );
  }

  if (hasLabel) {
    return (
      <span className={cn("font-medium text-foreground", className)} {...props}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn("font-normal text-muted-foreground", className)}
      {...props}
    >
      {placeholder}
    </span>
  );
}

SelectSearchValue.displayName = "SelectSearchValue";

function SelectSearchTrigger({
  className,
  children,
  variant = "outline",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  required: requiredProp,
  "aria-invalid": ariaInvalidProp,
  ...props
}: React.ComponentProps<typeof Button> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  asChild?: boolean;
  /** Shows a spinner on the trigger and disables interaction while options load. */
  loading?: boolean;
  /** Marks the field as required; shows a red border when validation fails. */
  required?: boolean;
  children: React.ReactNode;
}) {
  const { required: contextRequired, ariaInvalid: contextAriaInvalid } =
    useSelectSearchContext();
  const required = requiredProp ?? contextRequired;
  const ariaInvalid =
    ariaInvalidProp === true ||
    ariaInvalidProp === "true" ||
    (ariaInvalidProp == null && contextAriaInvalid);
  const isDisabled = disabled || loading;

  if (asChild) {
    return (
      <PopoverTrigger
        asChild
        disabled={isDisabled}
        aria-required={required || undefined}
        aria-invalid={ariaInvalid || undefined}
        {...props}
      >
        {children}
      </PopoverTrigger>
    );
  }

  return (
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant={variant}
        size={size}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-required={required || undefined}
        aria-invalid={ariaInvalid || undefined}
        className={cn(
          "w-full justify-between min-w-0",
          selectSearchTriggerInvalidClasses,
          className,
        )}
        {...props}
      >
        <span className="truncate flex-1 text-left">{children}</span>
        {loading ? (
          <Spinner className="ml-2 size-4 shrink-0" />
        ) : (
          <ChevronSelectorVertical className="ml-2 size-4 shrink-0 opacity-50" />
        )}
      </Button>
    </PopoverTrigger>
  );
}

function SelectSearchContent({
  className,
  popoverWidth = "w-[300px]",
  align = "start",
  side = "bottom",
  ...props
}: React.ComponentProps<typeof PopoverContent> & {
  popoverWidth?: string;
}) {
  return (
    <PopoverContent
      className={cn(popoverWidth, "p-0", className)}
      align={align}
      side={side}
      {...props}
    />
  );
}

function SelectSearchInput({
  placeholder,
  onValueChange,
  ...props
}: React.ComponentProps<typeof CommandInput> & {
  placeholder?: string;
}) {
  const { placeholder: contextPlaceholder, setSearchValue } =
    useSelectSearchContext();

  return (
    <CommandInput
      placeholder={placeholder ?? contextPlaceholder}
      onValueChange={(value) => {
        setSearchValue(value);
        onValueChange?.(value);
      }}
      {...props}
    />
  );
}

function SelectSearchList({
  className,
  maxHeight = "h-72",
  children,
  showClearItem = true,
  ...props
}: React.ComponentProps<typeof ScrollArea> & {
  maxHeight?: string;
  /** When parent is clearable, prepend Clear filter (default true). */
  showClearItem?: boolean;
}) {
  const { searchValue, clearable } = useSelectSearchContext();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const viewport = containerRef.current.querySelector(
      "[data-slot='scroll-area-viewport']",
    ) as HTMLElement | null;
    if (viewport) {
      viewport.scrollTop = 0;
    }
  }, [searchValue]);

  return (
    <CommandList className="max-h-none overflow-hidden">
      <div ref={containerRef}>
        <ScrollArea className={cn(maxHeight, className)} {...props}>
          {clearable && showClearItem ? (
            <>
              <SelectSearchGroup>
                <SelectSearchClearItem />
              </SelectSearchGroup>
              {/* {React.Children.count(children) > 0 ? (
                <CommandSeparator className="my-1" />
              ) : null} */}
            </>
          ) : null}
          {children}
        </ScrollArea>
      </div>
    </CommandList>
  );
}

function SelectSearchEmpty({
  emptyText,
  ...props
}: React.ComponentProps<typeof CommandEmpty> & {
  emptyText?: string;
}) {
  const { emptyText: contextEmptyText } = useSelectSearchContext();
  return (
    <CommandEmpty {...props}>{emptyText ?? contextEmptyText}</CommandEmpty>
  );
}

function SelectSearchGroup({
  children,
  ...props
}: React.ComponentProps<typeof CommandGroup>) {
  return <CommandGroup {...props}>{children}</CommandGroup>;
}

interface SelectSearchItemProps extends Omit<
  React.ComponentProps<typeof CommandItem>,
  "value" | "onSelect"
> {
  value: string;
  disabled?: boolean;
  searchText?: string;
  label?: string;
  variant?: "default" | "destructive";
  children: React.ReactNode;
}

function SelectSearchItemIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { selected, variant } = useSelectSearchItem();

  if (!selected) {
    return null;
  }

  return (
    <span
      data-slot="select-search-item-indicator"
      className={cn(
        "absolute right-2 flex size-3.5 items-center justify-center",
        className,
      )}
      {...props}
    >
      <Check
        className={cn(
          "size-4 text-current",
          variant === "destructive" && "text-destructive",
        )}
      />
    </span>
  );
}

function SelectSearchItem({
  value,
  disabled,
  searchText,
  label,
  variant = "default",
  children,
  className,
  ...props
}: SelectSearchItemProps) {
  const { value: selectedValue, onValueChange } = useSelectSearchContext();
  const selected = selectedValue === value;
  const isDisabled = disabled ?? false;

  const itemSearchText =
    searchText ??
    (typeof children === "string"
      ? children.toLowerCase()
      : (label?.toLowerCase() ?? value.toLowerCase()));

  const itemContextValue: SelectSearchItemContextValue = {
    value,
    selected,
    variant,
  };

  return (
    <SelectSearchItemContext.Provider value={itemContextValue}>
      <CommandItem
        value={itemSearchText}
        data-variant={variant}
        onSelect={() => {
          if (!isDisabled) {
            onValueChange(value);
          }
        }}
        disabled={isDisabled}
        className={cn(
          "relative min-w-0 pr-8 gap-2 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[selected=true]:bg-destructive/10 dark:data-[variant=destructive]:data-[selected=true]:bg-destructive/20 data-[variant=destructive]:data-[selected=true]:text-destructive data-[variant=destructive]:*:[svg]:text-destructive!",
          className,
        )}
        {...props}
      >
        {children}
        <SelectSearchItemIndicator />
      </CommandItem>
    </SelectSearchItemContext.Provider>
  );
}

function SelectSearchClearItem({
  label,
  className,
  ...props
}: Omit<SelectSearchItemProps, "value" | "children"> & {
  label?: string;
}) {
  const { clearValue, clearLabel, clearable } = useSelectSearchContext();
  if (!clearable) return null;

  const text = label ?? clearLabel;

  return (
    <SelectSearchItem
      variant="destructive"
      value={clearValue}
      searchText={`${text} clear reset`}
      label={text}
      className={className}
      {...props}
    >
      {text}
    </SelectSearchItem>
  );
}

function defaultFilter(value: string, search: string): number {
  if (!search.trim()) {
    return 1;
  }

  const normalizedValue = value.toLowerCase();
  const normalizedSearch = search.toLowerCase().trim();

  const escapedSearch = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const wordBoundaryRegex = new RegExp(`\\b${escapedSearch}\\b`, "i");
  if (wordBoundaryRegex.test(normalizedValue)) {
    return 2;
  }

  if (normalizedValue.includes(normalizedSearch)) {
    return 1;
  }

  return 0;
}

function SelectSearchCommand({
  className,
  children,
  filter,
  ...props
}: React.ComponentProps<typeof Command> & {
  filter?: (value: string, search: string) => number;
}) {
  const filterFn = filter ?? defaultFilter;

  return (
    <Command className={className} filter={filterFn} {...props}>
      {children}
    </Command>
  );
}

function useSelectSearchItem() {
  const context = React.useContext(SelectSearchItemContext);
  if (!context) {
    throw new Error("useSelectSearchItem must be used within SelectSearchItem");
  }
  return context;
}

export {
  SelectSearch,
  SelectSearchTrigger,
  SelectSearchValue,
  SelectSearchContent,
  SelectSearchInput,
  SelectSearchList,
  SelectSearchEmpty,
  SelectSearchGroup,
  SelectSearchItem,
  SelectSearchClearItem,
  SelectSearchItemIndicator,
  SelectSearchCommand,
  useSelectSearchItem,
};

export type { SelectSearchItemProps };
