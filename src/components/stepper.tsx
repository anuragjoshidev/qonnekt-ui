import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Check } from "@untitledui/icons";

import { cn } from "../lib/utils";

type StepState = "active" | "completed" | "inactive";
type StepperOrientation = "horizontal" | "vertical";

type StepIndicators = {
  active?: React.ReactNode;
  completed?: React.ReactNode;
  inactive?: React.ReactNode;
  loading?: React.ReactNode;
};

type StepperContextValue = {
  activeStep: number;
  orientation: StepperOrientation;
  setActiveStep: (next: number) => void;
  indicators: StepIndicators;
};

const StepperContext = React.createContext<StepperContextValue | null>(null);

type StepItemContextValue = {
  step: number;
  state: StepState;
};

const StepItemContext = React.createContext<StepItemContextValue | null>(null);

export function useStepper() {
  const ctx = React.useContext(StepperContext);
  if (!ctx) throw new Error("useStepper must be used within a Stepper");
  return ctx;
}

export function useStepItem() {
  const ctx = React.useContext(StepItemContext);
  if (!ctx) throw new Error("useStepItem must be used within a StepperItem");
  return ctx;
}

export type StepperProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  orientation?: StepperOrientation;
  indicators?: StepIndicators;
};

export function Stepper({
  value,
  defaultValue = 1,
  onValueChange,
  orientation = "horizontal",
  indicators = {},
  className,
  children,
  ...props
}: StepperProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const activeStep = value ?? uncontrolledValue;

  const setActiveStep = React.useCallback(
    (next: number) => {
      if (value === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  const contextValue = React.useMemo<StepperContextValue>(
    () => ({
      activeStep,
      orientation,
      setActiveStep,
      indicators,
    }),
    [activeStep, orientation, setActiveStep, indicators],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        role="tablist"
        aria-orientation={orientation}
        data-slot="stepper"
        data-orientation={orientation}
        className={cn(
          "w-full",
          orientation === "vertical" && "flex flex-col",
          orientation === "horizontal" && "flex flex-row items-start gap-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

export type StepperItemProps = React.HTMLAttributes<HTMLDivElement> & {
  step: number;
  children?:
    | React.ReactNode
    | ((props: { state: StepState; step: number }) => React.ReactNode);
};

export function StepperItem({
  step,
  className,
  children,
  ...props
}: StepperItemProps) {
  const { activeStep, orientation } = useStepper();

  const state: StepState =
    step < activeStep
      ? "completed"
      : step === activeStep
        ? "active"
        : "inactive";

  return (
    <StepItemContext.Provider value={{ step, state }}>
      <div
        data-slot="stepper-item"
        data-state={state}
        aria-current={state === "active" ? "step" : undefined}
        className={cn(
          "relative group/stepper-item",
          orientation === "vertical"
            ? "flex w-full items-stretch gap-6"
            : "flex min-w-0 flex-1 flex-col",
          className,
        )}
        {...props}
      >
        {typeof children === "function" ? children({ state, step }) : children}
      </div>
    </StepItemContext.Provider>
  );
}

const indicatorVariants = cva(
  "flex size-[22px] shrink-0 items-center justify-center rounded-md text-[11px] transition-[background-color,color,transform] duration-500 ease-in-out",
  {
    variants: {
      state: {
        active: "bg-sidebar-accent text-primary-foreground",
        completed: "bg-sidebar-accent text-primary-foreground",
        inactive: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  },
);

export type StepperIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export function StepperIndicator({
  className,
  children,
  ...props
}: StepperIndicatorProps) {
  const { step, state } = useStepItem();
  const { indicators } = useStepper();

  if (children) {
    return (
      <div
        data-slot="stepper-indicator"
        data-state={state}
        className={cn(indicatorVariants({ state }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  const indicatorOverride =
    state === "active"
      ? indicators.active
      : state === "completed"
        ? indicators.completed
        : indicators.inactive;

  if (indicatorOverride) {
    return (
      <div
        data-slot="stepper-indicator"
        data-state={state}
        className={cn(indicatorVariants({ state }), className)}
        {...props}
      >
        {indicatorOverride}
      </div>
    );
  }

  return (
    <div
      data-slot="stepper-indicator"
      data-state={state}
      className={cn(indicatorVariants({ state }), className)}
      {...props}
    >
      {state === "completed" ? <Check className="size-3.5" /> : step}
    </div>
  );
}

export type StepperSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export function StepperSeparator({
  className,
  ...props
}: StepperSeparatorProps) {
  const { orientation } = useStepper();
  const { state } = useStepItem();

  return (
    <div
      data-slot="stepper-separator"
      data-state={state}
      className={cn(
        orientation === "vertical"
          ? "w-0.5 min-h-4 flex-1 rounded-full bg-muted transition-colors duration-500 ease-in-out group-data-[state=completed]/stepper-item:bg-sidebar-accent"
          : "h-0.5 flex-1 rounded-full bg-muted transition-colors duration-500 ease-in-out group-data-[state=completed]/stepper-item:bg-sidebar-accent",
        className,
      )}
      {...props}
    />
  );
}

export type StepperTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function StepperTitle({ className, ...props }: StepperTitleProps) {
  const { state } = useStepItem();
  return (
    <h3
      data-slot="stepper-title"
      data-state={state}
      className={cn(
        "text-base font-semibold leading-none transition-colors duration-500 ease-in-out",
        state === "active"
          ? "text-primary"
          : state === "completed"
            ? "text-muted-foreground"
            : "text-muted-foreground/70",
        className,
      )}
      {...props}
    />
  );
}

export type StepperDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export function StepperDescription({
  className,
  ...props
}: StepperDescriptionProps) {
  const { state } = useStepItem();

  return (
    <div
      data-slot="stepper-description"
      data-state={state}
      className={cn(
        "text-xs text-muted-foreground transition-colors duration-500 ease-in-out",
        state === "active" ? "text-primary" : "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export type StepperTriggerProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    step: number;
  };

export function StepperTrigger({
  asChild,
  step,
  className,
  ...props
}: StepperTriggerProps) {
  const { state } = useStepItem();
  const { setActiveStep } = useStepper();

  const Comp: React.ElementType = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="stepper-trigger"
      data-state={state}
      className={cn(
        "focus-visible:ring-ring/50 inline-flex cursor-pointer items-center outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      onClick={(e) => {
        props.onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
        if (!e.defaultPrevented) setActiveStep(step);
      }}
      {...props}
    />
  );
}

export type StepperIndicators = VariantProps<typeof indicatorVariants>;
