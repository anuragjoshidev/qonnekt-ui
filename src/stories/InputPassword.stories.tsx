import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputPassword } from "../components/input-password";

const meta = {
  title: "Inputs/InputPassword",
  component: InputPassword,
  tags: ["autodocs"],
  args: { placeholder: "Password", className: "max-w-xs" },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
