import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/hover-card";
import { Button } from "../components/button";

const meta = {
  title: "Overlays/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@qonnekt</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 text-sm">Hover card details.</HoverCardContent>
    </HoverCard>
  ),
};
