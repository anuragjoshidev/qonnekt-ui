import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "../components/aspect-ratio";

const meta = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md" />
    </div>
  ),
};
