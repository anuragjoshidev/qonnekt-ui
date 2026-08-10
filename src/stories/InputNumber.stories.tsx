import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { InputNumber } from "../components/input-number";

const meta = {
  title: "Inputs/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState(1);
    return (
      <InputNumber value={value} onChange={setValue} className="max-w-xs" min={0} max={100} />
    );
  },
};
