import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "../components/divider";

const meta = {
  title: "Layout/Divider",
  component: Divider,
  tags: ["autodocs"],
  args: { children: "OR", titlePlacement: "center" },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Divider {...args} />
    </div>
  ),
};
