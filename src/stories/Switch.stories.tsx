import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "../components/switch";
import { Label } from "../components/label";

const meta = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
};
