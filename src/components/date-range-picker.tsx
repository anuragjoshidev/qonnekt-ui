

import * as React from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Field, FieldLabel } from "./field";
import { Separator } from "./separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { ArrowNarrowRight } from "@untitledui/icons";
import type { DateRange } from "react-day-picker";
import {
  DATE_RANGE_PRESET,
  DATE_RANGE_PRESETS,
  formatDate,
  getDateRangePresetLabel,
  getPresetRange,
  isClearDatePreset,
  type DateRangePreset,
} from "../lib/utils/date";
import { cn } from "../lib/utils";

export {
  DATE_RANGE_PRESET,
  DATE_RANGE_PRESETS,
  getDateRangePresetLabel,
  isClearDatePreset,
};
export type { DateRangePreset };

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  /** Initial/default preset when value is not set. Defaults to THIS_MONTH. */
  preset?: DateRangePreset;
  /**
   * When true (default) and `value` is undefined, applies `preset` once on mount
   * via `onChange`. Set false for optional filters where "no range" should mean
   * no filtering (e.g. client leads follow-up filter).
   */
  applyDefaultOnMount?: boolean;
  label?: string;
  placeholder?: string;
  id?: string;
  compact?: boolean;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
}

export function DateRangePicker({
  value,
  onChange,
  preset: presetProp = DATE_RANGE_PRESET.THIS_MONTH,
  applyDefaultOnMount = true,
  label,
  placeholder = "Select a Date Range",
  id = "date-range-picker",
  compact = false,
  className,
  "aria-invalid": ariaInvalid,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(new Date());
  const hasAppliedDefault = React.useRef(false);

  React.useEffect(() => {
    if (
      !applyDefaultOnMount ||
      value !== undefined ||
      !onChange ||
      hasAppliedDefault.current
    ) {
      return;
    }
    hasAppliedDefault.current = true;
    if (isClearDatePreset(presetProp)) {
      onChange(undefined);
      return;
    }
    const range = getPresetRange(presetProp, ref.current);
    onChange({ from: range.from, to: range.to });
  }, [applyDefaultOnMount, presetProp, onChange, value]);

  const handlePresetClick = React.useCallback(
    (preset: DateRangePreset) => {
      if (isClearDatePreset(preset)) {
        onChange?.(undefined);
        setOpen(false);
        return;
      }
      const range = getPresetRange(preset, ref.current);
      onChange?.({ from: range.from, to: range.to });
      setOpen(false);
    },
    [onChange],
  );

  const content = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={className ? "ghost" : "outline"}
          id={id}
          data-slot={className ? "input-group-control" : undefined}
          aria-invalid={
            ariaInvalid === true || ariaInvalid === "true" || undefined
          }
          className={cn(
            className && "h-9 w-full justify-start",
            className,
          )}
        >
          {value?.from ? (
            value.to ? (
              <>
                {formatDate(value.from)}{" "}
                <ArrowNarrowRight className="size-4 shrink-0" />{" "}
                {formatDate(value.to)}
              </>
            ) : (
              formatDate(value.from)
            )
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          <div className="flex flex-col border-r border-border">
            <div
              className="flex max-h-[min(60vh,20rem)] min-w-40 flex-col overflow-y-auto p-2"
              role="list"
            >
              <button
                type="button"
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive focus:outline-none dark:hover:bg-destructive/20 dark:focus:bg-destructive/20",
                )}
                onClick={() => handlePresetClick(DATE_RANGE_PRESET.CLEAR_RANGE)}
              >
                {getDateRangePresetLabel(DATE_RANGE_PRESET.CLEAR_RANGE)}
              </button>
              <Separator className="my-1" />
              {DATE_RANGE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  onClick={() => handlePresetClick(preset)}
                >
                  {getDateRangePresetLabel(preset)}
                </button>
              ))}
            </div>
          </div>
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  );

  if (label) {
    return (
      <Field className="w-full">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {content}
      </Field>
    );
  }

  return content;
}
