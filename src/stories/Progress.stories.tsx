import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../components/progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { value: 60, className: "w-64" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
