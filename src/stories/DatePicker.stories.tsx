import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DatePicker } from "../components/date-picker";

const meta = {
  title: "Inputs/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <DatePicker label="Start date" value={date} onChange={setDate} className="max-w-xs" />
    );
  },
};
