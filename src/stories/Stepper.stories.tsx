import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../components/stepper";

const meta = {
  title: "Data/Stepper",
  component: Stepper,
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [step, setStep] = React.useState(1);
    return (
      <Stepper value={step} onValueChange={setStep} className="max-w-lg">
        {[1, 2, 3].map((n) => (
          <StepperItem key={n} step={n}>
            <StepperTrigger step={n} className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <StepperIndicator />
                <StepperTitle>Step {n}</StepperTitle>
              </div>
              <StepperDescription>Description {n}</StepperDescription>
            </StepperTrigger>
            {n < 3 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </Stepper>
    );
  },
};
