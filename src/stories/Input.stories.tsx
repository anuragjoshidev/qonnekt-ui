import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components/input";

const meta = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Type here...", className: "max-w-xs" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
