import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../components/slider";

const meta = {
  title: "Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: { defaultValue: [40], max: 100, step: 1, className: "w-64" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
