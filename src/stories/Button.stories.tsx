import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Loading: Story = { args: { loading: true } };
export const WithTooltip: Story = {
  args: { tooltip: "Helpful tip", children: "Hover me" },
};
export const LinkHref: Story = {
  args: { href: "https://example.com", children: "External link" },
};
