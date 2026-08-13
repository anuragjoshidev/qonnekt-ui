import {
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from "date-fns";


/** Parse `HH:mm` / `HH:mm:ss` (optional leading date) into `HH:mm:ss`. */
function parseTimeOfDayString(value: string): string | null {
  const trimmed = value.trim();
  const match = trimmed.match(/(?:T|\s)?(\d{1,2}):(\d{2})(?::(\d{2}))?\s*$/);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  const s = Number(match[3] ?? 0);
  if (h > 23 || m > 59 || s > 59) return null;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Display date format (DD MMM YYYY)
// ---------------------------------------------------------------------------

/** App-wide display date format: DD MMM YYYY (e.g. 14 Feb 2025). Use for all user-facing dates. */
const DISPLAY_DATE_FORMAT = "dd MMM yyyy";

/** Date + time for timestamps (12-hour clock). */
const DISPLAY_DATETIME_FORMAT = "dd MMM yyyy, h:mm a";

const ISO_DATE_ONLY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const HAS_TIMEZONE_RE = /(?:[zZ]|[+-]\d{2}:?\d{2})$/;

/** Parse API datetimes stored as UTC when no timezone suffix is present. */
export function parseUtcDateTime(value: string): Date {
  const trimmed = value.trim();
  if (!trimmed) return new Date(NaN);

  if (HAS_TIMEZONE_RE.test(trimmed)) {
    return new Date(trimmed);
  }

  const dateOnly = ISO_DATE_ONLY_RE.exec(trimmed);
  if (dateOnly) {
    return new Date(
      Number(dateOnly[1]),
      Number(dateOnly[2]) - 1,
      Number(dateOnly[3]),
    );
  }

  const iso = trimmed.includes("T")
    ? `${trimmed}Z`
    : `${trimmed.replace(" ", "T")}Z`;
  return new Date(iso);
}

function toLocalCalendarDate(date: Date | string | number): Date {
  if (typeof date === "string") {
    const trimmed = date.trim();
    const match = ISO_DATE_ONLY_RE.exec(trimmed);
    if (match) {
      return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    }
    const parsed = parseUtcDateTime(trimmed);
    // Calendar dates are stored as UTC midnight (YYYY-MM-DDT00:00:00.000Z).
    // Build a local Date from the UTC Y-M-D so the calendar day is timezone-stable.
    if (
      !Number.isNaN(parsed.getTime()) &&
      parsed.getUTCHours() === 0 &&
      parsed.getUTCMinutes() === 0 &&
      parsed.getUTCSeconds() === 0 &&
      parsed.getUTCMilliseconds() === 0
    ) {
      return new Date(
        parsed.getUTCFullYear(),
        parsed.getUTCMonth(),
        parsed.getUTCDate(),
      );
    }
    return parsed;
  }
  return typeof date === "object" && "getTime" in date ? date : new Date(date);
}

/**
 * Formats a date for display. Use this everywhere a date is shown in the UI.
 * Output format: DD MMM YYYY (e.g. 14 Feb 2025).
 */
export function formatDate(
  date: Date | string | number | null | undefined,
): string {
  if (date == null || date === "") return "";
  const d = toLocalCalendarDate(date);
  if (Number.isNaN(d.getTime())) return "";
  return format(d, DISPLAY_DATE_FORMAT);
}

/** Formats a UTC-stored date/time for display in the user's local timezone. */
export function formatDateTime(
  date: Date | string | number | null | undefined,
): string {
  if (date == null || date === "") return "";
  const d =
    typeof date === "string"
      ? parseUtcDateTime(date)
      : typeof date === "object" && "getTime" in date
        ? date
        : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return format(d, DISPLAY_DATETIME_FORMAT);
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Normalize to `HH:mm:ss` time values. Accepts time-only or datetime. */
export function normalizeTimeOfDay(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const fromClock = parseTimeOfDayString(trimmed);
  if (fromClock) return fromClock;

  const d = parseUtcDateTime(trimmed);
  if (!Number.isNaN(d.getTime())) {
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
  }

  const isoLocal = new Date(trimmed);
  if (!Number.isNaN(isoLocal.getTime())) {
    return `${pad2(isoLocal.getHours())}:${pad2(isoLocal.getMinutes())}:${pad2(isoLocal.getSeconds())}`;
  }

  return null;
}

/** `HH:mm:ss` (or datetime) → Date on today's local calendar for TimePicker. */
export function timeOfDayToDate(value: string | null | undefined): Date | null {
  const normalized = normalizeTimeOfDay(value);
  if (!normalized) return null;
  const [h, m, s] = normalized.split(":").map(Number);
  const d = new Date();
  d.setHours(h ?? 0, m ?? 0, s ?? 0, 0);
  return d;
}

/** Display a time-of-day value (`HH:mm` / `HH:mm:ss` / datetime). Defaults to 12-hour clock with AM/PM. */
export function formatTimeOfDay(
  value: string | null | undefined,
  pattern = "h:mm a",
): string {
  if (value == null || value === "") return "";
  const d = timeOfDayToDate(value);
  if (!d) return value;
  return format(d, pattern);
}

/** Local calendar YYYY-MM-DD for filters, API params, and date inputs. */
export function formatDateParam(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Local YYYY-MM-DDTHH:mm:ss for datetime form values. */
export function formatDatetimeLocalParam(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** Parse `YYYY-MM-DD` as a local calendar date. */
export function parseDateParam(value: string | undefined): Date | undefined {
  if (!value?.trim()) return undefined;
  const match = ISO_DATE_ONLY_RE.exec(value.trim());
  if (!match) return undefined;
  const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** `YYYY-MM-DD` date input → ISO for API (UTC midnight of that calendar day). */
export function dateInputToIso(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = ISO_DATE_ONLY_RE.exec(trimmed);
  if (!match) return null;
  // Store as UTC midnight so the calendar day in the ISO string is timezone-stable
  // (local midnight → toISOString() would shift the date for IST/etc.).
  return `${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`;
}

/** `YYYY-MM-DDTHH:mm` datetime-local input → ISO for API. */
export function datetimeLocalToIso(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

/** ISO/UTC API value → YYYY-MM-DD for `<input type="date">`. */
export function isoToDateInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const trimmed = iso.trim();
  const dateOnly = ISO_DATE_ONLY_RE.exec(trimmed);
  if (dateOnly) {
    return `${dateOnly[1]}-${dateOnly[2]}-${dateOnly[3]}`;
  }
  const d = parseUtcDateTime(trimmed);
  if (Number.isNaN(d.getTime())) return "";
  // New encoding: UTC midnight → read UTC calendar day.
  if (
    d.getUTCHours() === 0 &&
    d.getUTCMinutes() === 0 &&
    d.getUTCSeconds() === 0 &&
    d.getUTCMilliseconds() === 0
  ) {
    return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
  }
  // Legacy encoding (local midnight stored via toISOString) → local calendar day.
  return formatDateParam(d);
}

/** ISO/UTC API value → YYYY-MM-DDTHH:mm:ss for datetime form values. */
export function isoToDatetimeLocalInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = parseUtcDateTime(iso);
  if (Number.isNaN(d.getTime())) return "";
  return formatDatetimeLocalParam(d);
}

function parseDateLike(dateLike: string): Date {
  return parseUtcDateTime(dateLike);
}

/** Parts for a vertical timeline date column (day, month, split time). */
export type TimelineDateParts = {
  day: string;
  month: string;
  year: string;
  timeClock: string;
  timePeriod: string;
};

/** Stable `yyyy-MM` key for grouping or filtering by calendar month. */
export function getMonthKey(dateLike: string): string {
  const date = parseDateLike(dateLike);
  if (Number.isNaN(date.getTime())) return "";
  return format(date, "yyyy-MM");
}

/** Long month and year for section headings (e.g. April 2026). */
export function formatMonthHeading(dateLike: string): string {
  const date = parseDateLike(dateLike);
  if (Number.isNaN(date.getTime())) return "";
  return format(date, "MMMM yyyy");
}

/** Short month and year in local timezone (e.g. Feb 2026). */
export function formatMonthYearShort(dateLike: string): string {
  const date = parseDateLike(dateLike);
  if (Number.isNaN(date.getTime())) return "";
  return format(date, "MMM yyyy");
}

/**
 * Chronological compare for invoice period anchors (ISO dates, usually first of month).
 * Negative if a is before b; uses calendar month boundaries, not string order.
 */
export function compareInvoicePeriods(
  periodStartA: string,
  periodStartB: string,
): number {
  const ta = startOfMonth(new Date(periodStartA)).getTime();
  const tb = startOfMonth(new Date(periodStartB)).getTime();
  const safeA = Number.isNaN(ta) ? 0 : ta;
  const safeB = Number.isNaN(tb) ? 0 : tb;
  return safeA - safeB;
}

/** Day, abbreviated month, and clock + AM/PM on separate lines in the UI. */
export function formatTimelineDate(dateLike: string): TimelineDateParts {
  const date = parseDateLike(dateLike);
  if (Number.isNaN(date.getTime())) {
    return {
      day: "--",
      month: "--",
      year: "--",
      timeClock: "--",
      timePeriod: "--",
    };
  }

  return {
    day: format(date, "dd"),
    month: format(date, "MMM"),
    year: format(date, "yyyy"),
    timeClock: format(date, "h:mm"),
    timePeriod: format(date, "a").toUpperCase(),
  };
}

// ---------------------------------------------------------------------------
// Date range presets
// ---------------------------------------------------------------------------

/** Date range preset keys (enum-like, ALL_CAPS_SNAKE_CASE). */
export const DATE_RANGE_PRESET = {
  TODAY: "TODAY",
  YESTERDAY: "YESTERDAY",
  THIS_WEEK: "THIS_WEEK",
  LAST_WEEK: "LAST_WEEK",
  /** Clears the range — no created-at filter (not a calendar span). */
  CLEAR_RANGE: "CLEAR_RANGE",
  THIS_MONTH: "THIS_MONTH",
  LAST_MONTH: "LAST_MONTH",
  LAST_30_DAYS: "LAST_30_DAYS",
  THIS_YEAR: "THIS_YEAR",
  LAST_YEAR: "LAST_YEAR",
  LAST_QUARTER: "LAST_QUARTER",
  FY_25_26: "FY_25_26",
  FY_24_25: "FY_24_25",
  FY_23_24: "FY_23_24",
  FY_22_23: "FY_22_23",
} as const;

export type DateRangePreset =
  (typeof DATE_RANGE_PRESET)[keyof typeof DATE_RANGE_PRESET];

export const DATE_RANGE_PRESET_LABELS: Record<DateRangePreset, string> = {
  [DATE_RANGE_PRESET.TODAY]: "Today",
  [DATE_RANGE_PRESET.YESTERDAY]: "Yesterday",
  [DATE_RANGE_PRESET.THIS_WEEK]: "This Week",
  [DATE_RANGE_PRESET.LAST_WEEK]: "Last Week",
  [DATE_RANGE_PRESET.CLEAR_RANGE]: "Clear Filter",
  [DATE_RANGE_PRESET.THIS_MONTH]: "This Month",
  [DATE_RANGE_PRESET.LAST_MONTH]: "Last Month",
  [DATE_RANGE_PRESET.LAST_30_DAYS]: "Last 30 Days",
  [DATE_RANGE_PRESET.THIS_YEAR]: "This Year",
  [DATE_RANGE_PRESET.LAST_YEAR]: "Last Year",
  [DATE_RANGE_PRESET.LAST_QUARTER]: "Last Quarter",
  [DATE_RANGE_PRESET.FY_25_26]: "FY 25-26",
  [DATE_RANGE_PRESET.FY_24_25]: "FY 24-25",
  [DATE_RANGE_PRESET.FY_23_24]: "FY 23-24",
  [DATE_RANGE_PRESET.FY_22_23]: "FY 22-23",
};

/** Presets in display order for the date range picker UI. */
export const DATE_RANGE_PRESETS: readonly DateRangePreset[] = [
  DATE_RANGE_PRESET.TODAY,
  DATE_RANGE_PRESET.YESTERDAY,
  DATE_RANGE_PRESET.THIS_WEEK,
  DATE_RANGE_PRESET.LAST_WEEK,
  DATE_RANGE_PRESET.THIS_MONTH,
  DATE_RANGE_PRESET.LAST_MONTH,
  DATE_RANGE_PRESET.LAST_30_DAYS,
  DATE_RANGE_PRESET.THIS_YEAR,
  DATE_RANGE_PRESET.LAST_YEAR,
  DATE_RANGE_PRESET.LAST_QUARTER,
  DATE_RANGE_PRESET.FY_25_26,
  DATE_RANGE_PRESET.FY_24_25,
  DATE_RANGE_PRESET.FY_23_24,
  DATE_RANGE_PRESET.FY_22_23,
];

export function getDateRangePresetLabel(preset: DateRangePreset): string {
  return DATE_RANGE_PRESET_LABELS[preset] ?? preset;
}

/** Presets that clear the range (omit date filter), not a computed span. */
export function isClearDatePreset(preset: DateRangePreset): boolean {
  return preset === DATE_RANGE_PRESET.CLEAR_RANGE;
}

// ---------------------------------------------------------------------------
// Preset range calculation (week starts on Monday)
// ---------------------------------------------------------------------------

const WEEK_START = 1;

/**
 * Returns the { from, to } date range for a given preset and reference date.
 * Reusable for filters, API params, or any component that needs preset ranges.
 */
export function getPresetRange(
  preset: DateRangePreset,
  ref: Date,
): { from: Date; to: Date } {
  const today = startOfDay(ref);

  switch (preset) {
    case DATE_RANGE_PRESET.TODAY:
      return { from: today, to: endOfDay(today) };
    case DATE_RANGE_PRESET.YESTERDAY: {
      const y = subDays(today, 1);
      return { from: y, to: endOfDay(y) };
    }
    case DATE_RANGE_PRESET.THIS_WEEK: {
      const wStart = startOfWeek(today, { weekStartsOn: WEEK_START });
      const wEnd = endOfWeek(today, { weekStartsOn: WEEK_START });
      return { from: wStart, to: wEnd };
    }
    case DATE_RANGE_PRESET.LAST_WEEK: {
      const lastWeekStart = subWeeks(
        startOfWeek(today, { weekStartsOn: WEEK_START }),
        1,
      );
      const lastWeekEnd = endOfWeek(lastWeekStart, {
        weekStartsOn: WEEK_START,
      });
      return { from: lastWeekStart, to: lastWeekEnd };
    }
    case DATE_RANGE_PRESET.THIS_MONTH:
      return {
        from: startOfMonth(today),
        to: endOfMonth(today),
      };
    case DATE_RANGE_PRESET.LAST_MONTH: {
      const lastMonth = subMonths(today, 1);
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
      };
    }
    case DATE_RANGE_PRESET.LAST_30_DAYS:
      return {
        from: startOfDay(subDays(today, 29)),
        to: endOfDay(today),
      };
    case DATE_RANGE_PRESET.THIS_YEAR:
      return {
        from: startOfYear(today),
        to: endOfYear(today),
      };
    case DATE_RANGE_PRESET.LAST_YEAR: {
      const lastYear = subYears(today, 1);
      return {
        from: startOfYear(lastYear),
        to: endOfYear(lastYear),
      };
    }
    case DATE_RANGE_PRESET.LAST_QUARTER: {
      const lastQ = subQuarters(today, 1);
      return {
        from: startOfQuarter(lastQ),
        to: endOfQuarter(lastQ),
      };
    }
    case DATE_RANGE_PRESET.FY_25_26:
      return {
        from: new Date(2025, 3, 1),
        to: endOfDay(new Date(2026, 2, 31)),
      };
    case DATE_RANGE_PRESET.FY_24_25:
      return {
        from: new Date(2024, 3, 1),
        to: endOfDay(new Date(2025, 2, 31)),
      };
    case DATE_RANGE_PRESET.FY_23_24:
      return {
        from: new Date(2023, 3, 1),
        to: endOfDay(new Date(2024, 2, 31)),
      };
    case DATE_RANGE_PRESET.FY_22_23:
      return {
        from: new Date(2022, 3, 1),
        to: endOfDay(new Date(2023, 2, 31)),
      };
    default:
      return { from: today, to: endOfDay(today) };
  }
}
