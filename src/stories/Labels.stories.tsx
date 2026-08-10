import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Badge } from "../components/badge";
import { Chip } from "../components/chip";
import { Tag } from "../components/tag";

const meta = {
  title: "Labels/Badge Chip Tag",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const BadgeStatic: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="green">Active</Badge>
      <Badge color="red">Failed</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const ChipSelectable: StoryObj = {
  render: function ChipDemo() {
    const [selected, setSelected] = React.useState(false);
    return (
      <Chip selectable selected={selected} onSelectedChange={setSelected}>
        Filter
      </Chip>
    );
  },
};

export const TagRemovable: StoryObj = {
  render: function TagDemo() {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return <span className="text-muted-foreground">Removed</span>;
    return (
      <Tag removable onRemove={() => setVisible(false)} removeLabel="Remove filter">
        Design
      </Tag>
    );
  },
};
