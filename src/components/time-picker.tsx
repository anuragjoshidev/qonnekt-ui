import * as React from "react";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { Clock, XClose } from "@untitledui/icons";

import { cn } from "../lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";

export type TimePickerProps = {
  /** Controlled value. Pass `null` for an empty controlled value. */
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (time: Date | undefined, timeString: string) => void;
  /** Time format for the input display. Default `HH:mm:ss`. */
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  showNow?: boolean;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  /** When false, hides the seconds column. Default true. */
  showSeconds?: boolean;
  secondStep?: number;
  className?: string;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

type TimeColumnProps = {
  options: number[];
  value: number | null;
  onChange: (value: number) => void;
  label: string;
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function buildSteps(max: number, step: number): number[] {
  const values: number[] = [];
  for (let i = 0; i < max; i += step) values.push(i);
  return values;
}

const COLUMN_ITEM_HEIGHT = 28;

function TimeColumn({ options, value, onChange, label }: TimeColumnProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list || value == null) return;
    const index = options.indexOf(value);
    if (index < 0) return;
    const target =
      index * COLUMN_ITEM_HEIGHT -
      list.clientHeight / 2 +
      COLUMN_ITEM_HEIGHT / 2;
    list.scrollTop = Math.max(0, target);
  }, [options, value]);

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label={label}
      className="h-56 w-14 overflow-y-auto overscroll-contain py-1 [-ms-overflow-style:none] [scrollbar-width:thin]"
      onWheel={(event) => {
        // Keep wheel scrolling on this column; don't bubble to the page/popover.
        event.stopPropagation();
      }}
    >
      {options.map((option) => {
        const selected = value != null && option === value;
        return (
          <button
            key={option}
            type="button"
            role="option"
            aria-selected={selected}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground h-7 w-full shrink-0 text-sm tabular-nums focus:outline-none",
              selected && "bg-accent text-accent-foreground font-medium",
            )}
            onClick={() => onChange(option)}
          >
            {pad2(option)}
          </button>
        );
      })}
    </div>
  );
}

function applyTimeParts(
  base: Date,
  hour: number,
  minute: number,
  second: number,
): Date {
  return setSeconds(setMinutes(setHours(base, hour), minute), second);
}

export function TimePicker({
  value,
  defaultValue,
  onChange,
  format: timeFormatProp,
  placeholder = "Select time",
  disabled = false,
  allowClear = true,
  showNow = true,
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  showSeconds = true,
  secondStep = 1,
  className,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: TimePickerProps) {
  const timeFormat =
    timeFormatProp ??
    (use12Hours
      ? showSeconds
        ? "h:mm:ss a"
        : "h:mm a"
      : showSeconds
        ? "HH:mm:ss"
        : "HH:mm");

  const [open, setOpen] = React.useState(false);
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const selected = isControlled ? (value ?? undefined) : uncontrolled;

  const emitChange = React.useCallback(
    (next: Date | undefined) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next, next ? format(next, timeFormat) : "");
    },
    [isControlled, onChange, timeFormat],
  );

  const hour24 = selected?.getHours() ?? null;
  const minute = selected?.getMinutes() ?? null;
  const second = selected?.getSeconds() ?? null;
  const isPm = (hour24 ?? 0) >= 12;
  const hour12 = hour24 == null ? null : hour24 % 12 === 0 ? 12 : hour24 % 12;
  const displayHour = use12Hours ? hour12 : hour24;

  const hours = React.useMemo(() => {
    if (use12Hours) {
      return buildSteps(12, hourStep).map((h) => (h === 0 ? 12 : h));
    }
    return buildSteps(24, hourStep);
  }, [hourStep, use12Hours]);

  const minutes = React.useMemo(() => buildSteps(60, minuteStep), [minuteStep]);
  const seconds = React.useMemo(() => buildSteps(60, secondStep), [secondStep]);

  const ensureBase = React.useCallback((): Date => {
    if (selected) return new Date(selected);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, [selected]);

  const setHour = (nextHour: number) => {
    const base = ensureBase();
    let h = nextHour;
    if (use12Hours) {
      const normalized = nextHour === 12 ? 0 : nextHour;
      h = isPm ? normalized + 12 : normalized;
    }
    emitChange(
      applyTimeParts(base, h, minute ?? 0, showSeconds ? (second ?? 0) : 0),
    );
  };

  const setMinute = (nextMinute: number) => {
    emitChange(
      applyTimeParts(
        ensureBase(),
        hour24 ?? 0,
        nextMinute,
        showSeconds ? (second ?? 0) : 0,
      ),
    );
  };

  const setSecond = (nextSecond: number) => {
    emitChange(
      applyTimeParts(ensureBase(), hour24 ?? 0, minute ?? 0, nextSecond),
    );
  };

  const setMeridiem = (pm: boolean) => {
    const base = ensureBase();
    const normalized = (hour24 ?? 0) % 12;
    const h = pm ? normalized + 12 : normalized;
    emitChange(
      applyTimeParts(base, h, minute ?? 0, showSeconds ? (second ?? 0) : 0),
    );
  };

  const handleNow = () => {
    const now = new Date();
    if (!showSeconds) now.setSeconds(0, 0);
    else now.setMilliseconds(0);
    emitChange(now);
  };

  const handleClear = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    emitChange(undefined);
  };

  const display = selected ? format(selected, timeFormat) : null;
  const canConfirm = selected != null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          id={id}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          data-slot="time-picker"
          className={cn(
            "border-input h-9 w-full justify-start gap-2 px-3 font-normal",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            !display && "text-muted-foreground",
            className,
          )}
        >
          <span className="flex-1 truncate text-left">
            {display ?? placeholder}
          </span>
          {allowClear && selected && !disabled ? (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear"
              className="text-muted-foreground hover:text-foreground rounded-sm p-0.5"
              onClick={handleClear}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleClear(event as unknown as React.MouseEvent);
                }
              }}
            >
              <XClose className="size-3.5" />
            </span>
          ) : null}
          <Clock className="text-muted-foreground size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col">
          <div className="flex items-stretch p-1 pt-2">
            <TimeColumn
              label="Hours"
              options={hours}
              value={displayHour}
              onChange={setHour}
            />
            <Separator orientation="vertical" />
            <TimeColumn
              label="Minutes"
              options={minutes}
              value={minute}
              onChange={setMinute}
            />
            {showSeconds ? (
              <>
                <Separator orientation="vertical" />
                <TimeColumn
                  label="Seconds"
                  options={seconds}
                  value={second}
                  onChange={setSecond}
                />
              </>
            ) : null}
            {use12Hours ? (
              <>
                <Separator orientation="vertical" />
                <div
                  className="flex flex-col py-1"
                  role="listbox"
                  aria-label="AM/PM"
                >
                  {(["AM", "PM"] as const).map((label) => {
                    const pm = label === "PM";
                    const selectedMeridiem = selected != null && pm === isPm;
                    return (
                      <button
                        key={label}
                        type="button"
                        role="option"
                        aria-selected={selectedMeridiem}
                        className={cn(
                          "hover:bg-accent hover:text-accent-foreground h-7 w-12 text-sm focus:outline-none",
                          selectedMeridiem &&
                            "bg-accent text-accent-foreground font-medium",
                        )}
                        onClick={() => setMeridiem(pm)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            {showNow ? (
              <button
                type="button"
                className="text-blue-foreground text-sm hover:underline"
                onClick={handleNow}
              >
                Now
              </button>
            ) : (
              <span />
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canConfirm}
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
