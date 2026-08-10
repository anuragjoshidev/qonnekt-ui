/** Toolbar sentinel: no filter on this dimension (omit API param). */
export const FILTER_CLEAR = "__clear__" as const;

export type FilterClear = typeof FILTER_CLEAR;

export function isFilterClear(value: string): value is FilterClear {
  return value === FILTER_CLEAR;
}
