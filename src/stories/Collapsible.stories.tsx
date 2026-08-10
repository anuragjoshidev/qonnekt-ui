import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/collapsible";
import { Button } from "../components/button";

const meta = {
  title: "Primitives/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-64 space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border p-3 text-sm">
        Hidden content
      </CollapsibleContent>
    </Collapsible>
  ),
};
