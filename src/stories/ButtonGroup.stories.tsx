import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup } from "../components/button-group";
import { Button } from "../components/button";

const meta = {
  title: "Primitives/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};
