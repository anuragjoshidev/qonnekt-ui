import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { Label } from "../components/label";

const meta = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="r-a" />
        <Label htmlFor="r-a">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="r-b" />
        <Label htmlFor="r-b">Option B</Label>
      </div>
    </RadioGroup>
  ),
};
