import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "../components/scroll-area";

const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-40 w-64 rounded-md border p-3">
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="text-sm py-1">Item {i + 1}</p>
      ))}
    </ScrollArea>
  ),
};
