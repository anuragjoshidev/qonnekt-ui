import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Chip } from "../components/chip";

const meta = {
  title: "Labels/Chip",
  component: Chip,
  tags: ["autodocs"],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [selected, setSelected] = React.useState(false);
    return (
      <Chip selectable selected={selected} onSelectedChange={setSelected}>
        Filter
      </Chip>
    );
  },
};
