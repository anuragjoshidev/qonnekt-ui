import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../components/badge";

const meta = {
  title: "Labels/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge", color: "green" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: "outline", color: undefined, children: "Outline" } };
