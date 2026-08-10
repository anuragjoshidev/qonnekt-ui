

import * as React from "react";
import { Check, Plus } from "@untitledui/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Tag } from "./tag";
import { cn } from "../lib/utils";

export interface InputTagsOption {
  value: string;
  /** Primary text: list row title and default chip text. */
  label: string;
  /** Muted second line in the dropdown (e.g. breadcrumb). Omitted or same as `label` → single-line row. */
  description?: string;
  /** Chip text when it should differ from `label` (defaults to `label`). */
  tagLabel?: string;
  disabled?: boolean;
}

const inputTagsTriggerInvalidClasses =
  "aria-invalid:border-destructive aria-invalid:ring-0";

type InputTagsContextValue = {
  value: string[];
  onValueChange: (value: string[]) => void;
  options: InputTagsOption[];
  placeholder?: string;
  emptyText?: string;
  limit?: number;
  disabled?: boolean;
  readOnly?: boolean;
  handleAddTag: (value: string) => void;
  handleRemoveTag: (value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  /** Normalize search text as the user types (e.g. digits-only phone). */
  transformSearchValue?: (value: string) => string;
  /** When true, options are already filtered by the parent (skip local search filter). */
  asyncSearch?: boolean;
  required?: boolean;
  ariaInvalid?: boolean;
};

const InputTagsContext = React.createContext<InputTagsContextValue | null>(
  null,
);

const useInputTagsContext = () => {
  const context = React.useContext(InputTagsContext);
  if (!context) {
    throw new Error("InputTags components must be used within InputTags");
  }
  return context;
};

function InputTags({
  value,
  onValueChange,
  options,
  placeholder = "Add tags...",
  emptyText = "No tags found.",
  limit,
  disabled = false,
  readOnly = false,
  required,
  transformSearchValue,
  onSearchChange,
  "aria-invalid": ariaInvalid,
  children,
  ...props
}: React.ComponentProps<typeof Popover> & {
  value: string[];
  onValueChange: (value: string[]) => void;
  options: InputTagsOption[];
  placeholder?: string;
  emptyText?: string;
  limit?: number;
  disabled?: boolean;
  readOnly?: boolean;
  /** Marks the field as required; trigger shows invalid border when validation fails. */
  required?: boolean;
  /** Normalize search text as the user types (e.g. digits-only phone). */
  transformSearchValue?: (value: string) => string;
  /** Called when the search input changes (e.g. for async option fetching). */
  onSearchChange?: (value: string) => void;
  "aria-invalid"?: boolean | "true" | "false";
}) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchValueChange = React.useCallback(
    (next: string) => {
      const normalized = transformSearchValue
        ? transformSearchValue(next)
        : next;
      setSearchValue(normalized);
      onSearchChange?.(normalized);
    },
    [transformSearchValue, onSearchChange],
  );

  const handleAddTag = React.useCallback(
    (tagValue: string) => {
      if (disabled) return;
      if (value.includes(tagValue)) return;
      if (limit && value.length >= limit) return;

      const newValue = [...value, tagValue];
      onValueChange(newValue);
      setSearchValue(""); // Clear search after adding
      onSearchChange?.("");
    },
    [value, disabled, limit, onValueChange, onSearchChange],
  );

  const handleRemoveTag = React.useCallback(
    (tagValue: string) => {
      if (disabled) return;
      const newValue = value.filter((v) => v !== tagValue);
      onValueChange(newValue);
    },
    [value, disabled, onValueChange],
  );

  const contextValue: InputTagsContextValue = {
    value,
    onValueChange,
    options,
    placeholder,
    emptyText,
    limit,
    disabled,
    readOnly,
    handleAddTag,
    handleRemoveTag,
    searchValue,
    setSearchValue: handleSearchValueChange,
    transformSearchValue,
    asyncSearch: onSearchChange != null,
    required,
    ariaInvalid: ariaInvalid === true || ariaInvalid === "true",
  };

  return (
    <InputTagsContext.Provider value={contextValue}>
      <Popover open={open} onOpenChange={setOpen} modal={false} {...props}>
        {children}
      </Popover>
    </InputTagsContext.Provider>
  );
}

function InputTagsTrigger({
  className,
  required: requiredProp,
  "aria-invalid": ariaInvalidProp,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Marks the field as required; shows a red border when validation fails. */
  required?: boolean;
}) {
  const {
    disabled,
    placeholder,
    value: selectedValues,
    options,
    handleRemoveTag,
    required: contextRequired,
    ariaInvalid: contextAriaInvalid,
  } = useInputTagsContext();
  const required = requiredProp ?? contextRequired;
  const ariaInvalid =
    ariaInvalidProp === true ||
    ariaInvalidProp === "true" ||
    (ariaInvalidProp == null && contextAriaInvalid);

  return (
    <PopoverTrigger asChild>
      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-required={required || undefined}
        aria-invalid={ariaInvalid || undefined}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex min-h-9 w-full min-w-0 flex-wrap items-center gap-2 rounded-md border bg-transparent px-3 py-1.5 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-within:border-ring",
          inputTagsTriggerInvalidClasses,
          "cursor-pointer",
          className,
        )}
        {...props}
      >
        {selectedValues.length > 0 ? (
          selectedValues.map((tagValue) => {
            const option = options.find((opt) => opt.value === tagValue);
            const label = option?.tagLabel ?? option?.label ?? tagValue;
            return (
              <Tag
                key={tagValue}
                removable={!disabled}
                onRemove={() => handleRemoveTag(tagValue)}
              >
                {label}
              </Tag>
            );
          })
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </div>
    </PopoverTrigger>
  );
}

function InputTagsContent({
  className,
  align = "start",
  side = "bottom",
  onWheel,
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      className={cn("w-[300px] p-0", className)}
      align={align}
      side={side}
      onWheel={(event) => {
        // Radix Dialog / Sheet uses scroll lock; portaled popovers are outside the
        // dialog node, so wheel events can bubble in a way that prevents the list
        // from scrolling. Stop propagation so CommandList keeps wheel scrolling.
        event.stopPropagation();
        onWheel?.(event);
      }}
      {...props}
    />
  );
}

function InputTagsCommand({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Command>) {
  const { placeholder, searchValue, setSearchValue } = useInputTagsContext();

  return (
    <Command className={className} shouldFilter={false} {...props}>
      <CommandInput
        placeholder={placeholder}
        value={searchValue}
        onValueChange={setSearchValue}
      />
      {children}
    </Command>
  );
}

function InputTagsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandList>) {
  const {
    value: selectedValues,
    options,
    limit,
    disabled,
    readOnly,
    handleAddTag,
    searchValue,
    asyncSearch,
  } = useInputTagsContext();

  // Filter options based on search (skipped when parent owns async filtering).
  const filteredOptions = React.useMemo(() => {
    return options.filter((opt) => {
      if (selectedValues.includes(opt.value)) return false;
      if (opt.disabled) return false;
      if (asyncSearch || !searchValue) return true;
      const searchLower = searchValue.toLowerCase();
      const desc = opt.description?.toLowerCase() ?? "";
      return (
        opt.label.toLowerCase().includes(searchLower) ||
        opt.value.toLowerCase().includes(searchLower) ||
        desc.includes(searchLower)
      );
    });
  }, [options, searchValue, selectedValues, asyncSearch]);

  // Check if we should show "Create new" option
  const shouldShowCreateNew = React.useMemo(() => {
    if (readOnly || !searchValue?.trim()) return false;
    const trimmedSearch = searchValue.trim();
    const searchLower = trimmedSearch.toLowerCase();
    // Show if no exact match found
    return !options.some((opt) => {
      const desc = opt.description?.toLowerCase() ?? "";
      return (
        opt.value.toLowerCase() === searchLower ||
        opt.label.toLowerCase() === searchLower ||
        desc === searchLower
      );
    });
  }, [readOnly, searchValue, options]);

  const isAtLimit = limit !== undefined && selectedValues.length >= limit;

  return (
    <CommandList className={className} {...props}>
      {filteredOptions.length > 0 && (
        <CommandGroup>
          {filteredOptions.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            const isDisabled =
              option.disabled ?? disabled ?? isAtLimit ?? false;

            const showDescription =
              option.description != null && option.description.trim() !== "";

            return (
              <CommandItem
                key={option.value}
                value={`${option.label} ${option.value} ${option.description ?? ""}`}
                onSelect={() => {
                  if (!isDisabled && !isSelected) {
                    handleAddTag(option.value);
                  }
                }}
                disabled={isDisabled || isSelected}
                className={cn(
                  "relative cursor-pointer pr-8",
                  showDescription && "items-start py-2",
                )}
              >
                {showDescription ? (
                  <div className="grid min-w-0 gap-0.5">
                    <span className="truncate leading-snug">{option.label}</span>
                    <span className="text-muted-foreground truncate text-xs leading-snug">
                      {option.description}
                    </span>
                  </div>
                ) : (
                  option.label
                )}
                {isSelected && (
                  <span className="absolute right-2 flex size-3.5 items-center justify-center">
                    <Check className="size-4" />
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
      )}
      {shouldShowCreateNew && (
        <CommandGroup>
          <CommandItem
            value={`create-${searchValue}`}
            onSelect={() => {
              if (!isAtLimit) {
                handleAddTag(searchValue.trim());
              }
            }}
            disabled={isAtLimit}
            className="relative pr-8 cursor-pointer text-muted-foreground"
          >
            <Plus className="size-4 mr-2" />
            Create "{searchValue.trim()}"
          </CommandItem>
        </CommandGroup>
      )}
      {children}
    </CommandList>
  );
}

function InputTagsEmpty({
  emptyText,
  ...props
}: React.ComponentProps<typeof CommandEmpty> & {
  emptyText?: string;
}) {
  const { emptyText: contextEmptyText } = useInputTagsContext();
  return (
    <CommandEmpty {...props}>{emptyText ?? contextEmptyText}</CommandEmpty>
  );
}

export {
  InputTags,
  InputTagsTrigger,
  InputTagsContent,
  InputTagsCommand,
  InputTagsList,
  InputTagsEmpty,
};
