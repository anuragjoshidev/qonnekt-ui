import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpText } from "../components/help-text";
import { Label } from "../components/label";

const meta = {
  title: "Labels/HelpText",
  component: HelpText,
  tags: ["autodocs"],
} satisfies Meta<typeof HelpText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Label>API key</Label>
      <HelpText message="Used to authenticate requests to the public API." />
    </div>
  ),
};
