import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TabsUnderline,
  TabsUnderlineContent,
  TabsUnderlineList,
  TabsUnderlineTrigger,
} from "../components/tabs-underline";

const meta = {
  title: "Navigation/TabsUnderline",
  component: TabsUnderline,
  tags: ["autodocs"],
} satisfies Meta<typeof TabsUnderline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TabsUnderline defaultValue="one" className="w-80">
      <TabsUnderlineList>
        <TabsUnderlineTrigger value="one">One</TabsUnderlineTrigger>
        <TabsUnderlineTrigger value="two">Two</TabsUnderlineTrigger>
      </TabsUnderlineList>
      <TabsUnderlineContent value="one" className="text-sm pt-3">Panel one</TabsUnderlineContent>
      <TabsUnderlineContent value="two" className="text-sm pt-3">Panel two</TabsUnderlineContent>
    </TabsUnderline>
  ),
};
