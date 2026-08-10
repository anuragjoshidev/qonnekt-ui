import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { InputSearch } from "../components/input-search";

const meta = {
  title: "Inputs/InputSearch",
  component: InputSearch,
  tags: ["autodocs"],
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState("");
    return (
      <InputSearch
        value={value}
        onChange={setValue}
        placeholder="Search..."
        className="max-w-xs"
      />
    );
  },
};
