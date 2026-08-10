import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd, KbdGroup } from "../components/kbd";

const meta = {
  title: "Primitives/Kbd",
  component: Kbd,
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};
