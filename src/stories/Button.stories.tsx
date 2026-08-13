import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Loading: Story = { args: { loading: true } };
export const LoadingWithLabel: Story = {
  args: { loading: true, children: "Saving" },
};
export const Tooltip: Story = { args: { tooltip: "More information" } };
export const DisabledTooltip: Story = {
  args: {
    disabled: true,
    tooltip: "Available when enabled",
    disabledTooltip: "You cannot do this yet",
  },
};
export const Href: Story = {
  args: { href: "https://example.com", children: "Open docs" },
};
