import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Tag } from "../components/tag";

const meta = {
  title: "Labels/Tag",
  component: Tag,
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return <span className="text-muted-foreground">Removed</span>;
    return (
      <Tag removable onRemove={() => setVisible(false)} removeLabel="Remove">
        Design
      </Tag>
    );
  },
};
