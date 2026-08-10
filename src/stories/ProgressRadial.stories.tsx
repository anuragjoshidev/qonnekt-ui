import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressRadial } from "../components/progress-radial";

const meta = {
  title: "Feedback/ProgressRadial",
  component: ProgressRadial,
  tags: ["autodocs"],
  args: { value: 72 },
} satisfies Meta<typeof ProgressRadial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
