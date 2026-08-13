import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputUrl } from "../components/input-url";

const meta = {
  title: "Inputs/InputUrl",
  component: InputUrl,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { placeholder: "example.com", className: "max-w-sm" },
} satisfies Meta<typeof InputUrl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
