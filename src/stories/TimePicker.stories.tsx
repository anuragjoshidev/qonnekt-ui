import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { TimePicker } from "../components/time-picker";

const meta = {
  title: "Inputs/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <TimePicker
        value={value}
        onChange={(t) => setValue(t ?? null)}
        className="max-w-xs"
        showSeconds={false}
      />
    );
  },
};
