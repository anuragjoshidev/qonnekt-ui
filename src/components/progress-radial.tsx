import { Pie, PieChart } from "recharts";

import { type ChartConfig, ChartContainer } from "./chart";
import { cn } from "../lib/utils";

const chartConfig = {
  progress: {
    label: "Progress",
    color: "var(--emerald-foreground)",
  },
  track: {
    label: "Track",
    color: "var(--muted)",
  },
} satisfies ChartConfig;

export type ProgressRadialProps = {
  /** 0–100; omit for indeterminate spinner ring. */
  value?: number;
  showLabel?: boolean;
  /** Center label typography; ring size follows label + `ringPadding`. */
  labelClassName?: string;
  /** Space between center label and ring (Tailwind padding utilities). */
  ringPadding?: string;
  className?: string;
  "aria-label"?: string;
};

function progressChartData(clamped: number, indeterminate: boolean) {
  if (indeterminate) {
    return [
      { segment: "progress", value: 25, fill: "var(--color-progress)" },
      { segment: "track", value: 75, fill: "var(--color-track)" },
    ];
  }
  if (clamped >= 100) {
    return [{ segment: "progress", value: 100, fill: "var(--color-progress)" }];
  }
  if (clamped <= 0) {
    return [{ segment: "track", value: 100, fill: "var(--color-track)" }];
  }
  return [
    { segment: "progress", value: clamped, fill: "var(--color-progress)" },
    {
      segment: "track",
      value: 100 - clamped,
      fill: "var(--color-track)",
    },
  ];
}

export function ProgressRadial({
  value,
  showLabel = false,
  labelClassName = "text-xs font-medium",
  ringPadding = "p-0.5",
  className,
  "aria-label": ariaLabel,
}: ProgressRadialProps) {
  const indeterminate = value == null;
  const clamped = indeterminate ? 0 : Math.min(100, Math.max(0, value));
  const chartData = progressChartData(clamped, indeterminate);
  const displayPercent = indeterminate ? undefined : Math.round(clamped);
  const hasCenterLabel = showLabel && displayPercent != null;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center size-16",
        ringPadding,
        !hasCenterLabel && "size-16",
        className,
      )}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={displayPercent}
    >
      <ChartContainer
        config={chartConfig}
        className={cn(
          "absolute inset-0 aspect-square [&_.recharts-responsive-container]:size-full!",
          indeterminate && "animate-spin",
        )}
      >
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="segment"
            innerRadius="85%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            cornerRadius={4}
            isAnimationActive={!indeterminate}
          />
        </PieChart>
      </ChartContainer>

      {showLabel && displayPercent != null ? (
        <span
          className={cn(
            "relative z-10 tabular-nums text-foreground",
            labelClassName,
          )}
        >
          {displayPercent}%
        </span>
      ) : null}
    </div>
  );
}
