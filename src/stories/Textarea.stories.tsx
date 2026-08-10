import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../components/textarea";

const meta = {
  title: "Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Write a note...", className: "max-w-sm" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
