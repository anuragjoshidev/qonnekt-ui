import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "../components/date-range-picker";

const meta = {
  title: "Inputs/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DateRangePicker label="Period" applyDefaultOnMount={false} className="max-w-sm" />
  ),
};
