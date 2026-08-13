import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { TreeView, type TreeDataItem } from "../components/tree-view";
import { Badge } from "../components/badge";
import { Button } from "../components/button";

const meta = {
  title: "Data/TreeView",
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const data: TreeDataItem[] = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "src-components", name: "components" },
      { id: "src-lib", name: "lib" },
    ],
  },
  { id: "readme", name: "README.md" },
];

function TreeDemo({ items }: { items: TreeDataItem[] }) {
  const [expandedIds, setExpandedIds] = React.useState<string[]>(["src"]);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  return (
    <TreeView
      data={items}
      expandedIds={expandedIds}
      onExpandedChange={setExpandedIds}
      selectedId={selectedId}
      onSelectChange={(item) => setSelectedId(item.id)}
      className="w-64 rounded-md border p-2"
    />
  );
}

export const Default: Story = {
  render: () => <TreeDemo items={data} />,
};

export const WithBadge: Story = {
  render: () => (
    <TreeDemo
      items={[
        {
          id: "src",
          name: "src",
          badge: <Badge color="blue">dir</Badge>,
          children: [
            { id: "src-components", name: "components" },
            { id: "src-lib", name: "lib" },
          ],
        },
        {
          id: "readme",
          name: "README.md",
          badge: <Badge color="grey">md</Badge>,
        },
      ]}
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <TreeDemo
      items={[
        {
          id: "src",
          name: "src",
          children: [{ id: "src-lib", name: "lib" }],
        },
        {
          id: "readme",
          name: "README.md",
          actions: (
            <Button size="icon-sm" variant="ghost" aria-label="More">
              ···
            </Button>
          ),
        },
      ]}
    />
  ),
};
