import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "../components/toggle";

const meta = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: { children: "Bold", "aria-label": "Toggle bold" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
