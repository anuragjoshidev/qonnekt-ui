import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatCurrencyCrore,
  getCurrencySymbol,
} from "./currency";

describe("formatCurrency", () => {
  it("returns an empty string for nullish or non-finite values", () => {
    expect(formatCurrency(null)).toBe("");
    expect(formatCurrency(undefined)).toBe("");
    expect(formatCurrency(Number.NaN)).toBe("");
  });

  it("formats a finite amount in INR by default", () => {
    const formatted = formatCurrency(0);
    expect(formatted).toMatch(/₹|INR|Rs/);
    expect(formatted).toMatch(/0/);
  });
});

describe("formatCurrencyCrore", () => {
  it("formats 1 crore with a Cr. suffix", () => {
    const formatted = formatCurrencyCrore(10_000_000);
    expect(formatted).toContain("Cr.");
    expect(formatted).toMatch(/1/);
  });
});

describe("getCurrencySymbol", () => {
  it("returns the rupee sign for default INR", () => {
    expect(getCurrencySymbol()).toBe("₹");
  });
});
