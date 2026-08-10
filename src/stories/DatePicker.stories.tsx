import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DatePicker } from "../components/date-picker";
import { DateRangePicker } from "../components/date-range-picker";

const meta = {
  title: "Inputs/Date pickers",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Single: StoryObj = {
  render: function SingleDemo() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <DatePicker
        label="Start date"
        value={date}
        onChange={setDate}
        className="max-w-xs"
      />
    );
  },
};

export const Range: StoryObj = {
  render: () => (
    <DateRangePicker label="Period" applyDefaultOnMount={false} className="max-w-sm" />
  ),
};
