import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Calendar } from "../components/calendar";

const meta = {
  title: "Inputs/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    );
  },
};
