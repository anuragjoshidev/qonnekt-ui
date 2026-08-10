import type { Meta, StoryObj } from "@storybook/react-vite";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../components/item";

const meta = {
  title: "Primitives/Item",
  component: Item,
  tags: ["autodocs"],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item className="w-80">
      <ItemContent>
        <ItemTitle>Inbox</ItemTitle>
        <ItemDescription>You have 3 unread messages.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};
