export type CurrencyFormatOptions = {
  locale?: string;
  currency?: string;
};

const DEFAULT_LOCALE = "en-IN";
const DEFAULT_CURRENCY = "INR";
const CRORE = 10_000_000;

/**
 * Formats a currency amount for display.
 * Defaults to INR / en-IN; pass `locale` and `currency` to override.
 */
export function formatCurrency(
  value: number | null | undefined,
  options: CurrencyFormatOptions = {},
): string {
  if (value == null || !Number.isFinite(value)) return "";
  const locale = options.locale ?? DEFAULT_LOCALE;
  const currency = options.currency ?? DEFAULT_CURRENCY;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Compact crore display for large amounts (e.g. ₹1.25 Cr.).
 * Only meaningful for INR-style scales; override currency/locale as needed.
 */
export function formatCurrencyCrore(
  value: number | null | undefined,
  options: CurrencyFormatOptions = {},
): string {
  if (value == null || !Number.isFinite(value)) return "";
  const locale = options.locale ?? DEFAULT_LOCALE;
  const currency = options.currency ?? DEFAULT_CURRENCY;
  const cr = value / CRORE;
  const amount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cr);
  return `${amount} Cr.`;
}

/** Currency glyph for InputCurrency addon / labels. */
export function getCurrencySymbol(options: CurrencyFormatOptions = {}): string {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const currency = options.currency ?? DEFAULT_CURRENCY;
  return (
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    })
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? currency
  );
}
