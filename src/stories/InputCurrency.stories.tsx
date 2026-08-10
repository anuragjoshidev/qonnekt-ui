import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { InputCurrency } from "../components/input-currency";

const meta = {
  title: "Inputs/InputCurrency",
  component: InputCurrency,
  tags: ["autodocs"],
} satisfies Meta<typeof InputCurrency>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState(0);
    return (
      <InputCurrency value={value} onChange={setValue} className="max-w-xs" decimalPlaces={2} />
    );
  },
};
