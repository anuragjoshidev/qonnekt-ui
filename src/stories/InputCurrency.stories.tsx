import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { InputCurrency } from "../components/input-currency";

const meta = {
  title: "Inputs/InputCurrency",
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState(0);
    return (
      <InputCurrency
        aria-label="Amount"
        value={value}
        onChange={setValue}
        className="max-w-xs"
        decimalPlaces={2}
      />
    );
  },
};

export const Negative: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState(-250);
    return (
      <InputCurrency
        aria-label="Adjustment"
        value={value}
        onChange={setValue}
        allowNegative
        className="max-w-xs"
      />
    );
  },
};

export const EmptyAsZero: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState(0);
    return (
      <InputCurrency
        aria-label="Amount"
        value={value}
        onChange={setValue}
        allowEmptyAsZero
        showEmptyWhenZero
        className="max-w-xs"
      />
    );
  },
};

export const USD: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState(19.99);
    return (
      <InputCurrency
        aria-label="Price"
        value={value}
        onChange={setValue}
        currency="USD"
        locale="en-US"
        decimalPlaces={2}
        showEmptyWhenZero={false}
        className="max-w-xs"
      />
    );
  },
};
