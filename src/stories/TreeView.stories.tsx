import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { TreeView, type TreeDataItem } from "../components/tree-view";

const meta = {
  title: "Data/TreeView",
  component: TreeView,
  tags: ["autodocs"],
} satisfies Meta<typeof TreeView>;

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

export const Default: Story = {
  render: function Demo() {
    const [expandedIds, setExpandedIds] = React.useState<string[]>(["src"]);
    const [selectedId, setSelectedId] = React.useState<string | undefined>();
    return (
      <TreeView
        data={data}
        expandedIds={expandedIds}
        onExpandedChange={setExpandedIds}
        selectedId={selectedId}
        onSelectChange={(item) => setSelectedId(item.id)}
        className="w-64 rounded-md border p-2"
      />
    );
  },
};
