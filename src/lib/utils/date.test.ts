import { describe, expect, it } from "vitest";
import { formatDate, normalizeTimeOfDay } from "./date";

describe("formatDate", () => {
  it("keeps a UTC-midnight ISO string on the calendar day", () => {
    expect(formatDate("2025-02-14T00:00:00.000Z")).toBe("14 Feb 2025");
  });

  it("returns empty for nullish values", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
  });
});

describe("normalizeTimeOfDay", () => {
  it("pads HH:mm to HH:mm:ss", () => {
    expect(normalizeTimeOfDay("9:05")).toBe("09:05:00");
  });
});
