import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputPhone } from "../components/input-phone";

const meta = {
  title: "Inputs/InputPhone",
  component: InputPhone,
  tags: ["autodocs"],
  args: { className: "max-w-sm" },
} satisfies Meta<typeof InputPhone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
