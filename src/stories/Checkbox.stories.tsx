import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../components/checkbox";
import { Label } from "../components/label";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms</Label>
    </div>
  ),
};
