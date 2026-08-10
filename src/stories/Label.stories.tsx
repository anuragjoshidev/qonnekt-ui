import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../components/label";
import { Input } from "../components/input";

const meta = {
  title: "Labels/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid max-w-xs gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
    </div>
  ),
};
