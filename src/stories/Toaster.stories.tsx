import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/button";
import { Toaster, toast } from "../components/toaster";

const meta = {
  title: "Feedback/Toaster",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Saved")}>Success</Button>
        <Button variant="outline" onClick={() => toast.error("Failed")}>
          Error
        </Button>
        <Button variant="secondary" onClick={() => toast("Hello")}>
          Default
        </Button>
      </div>
    </>
  ),
};
