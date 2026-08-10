import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../components/empty";
import { Button } from "../components/button";

const meta = {
  title: "Feedback/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="max-w-sm">
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try adjusting your filters.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Clear filters</Button>
      </EmptyContent>
    </Empty>
  ),
};
