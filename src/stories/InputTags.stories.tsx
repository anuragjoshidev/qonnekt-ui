import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  InputTags,
  InputTagsTrigger,
  InputTagsContent,
  InputTagsCommand,
  InputTagsList,
  InputTagsEmpty,
} from "../components/input-tags";

const meta = {
  title: "Inputs/InputTags",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState<string[]>(["design"]);
    return (
      <InputTags value={value} onValueChange={setValue} options={OPTIONS} className="w-[320px]">
        <InputTagsTrigger />
        <InputTagsContent>
          <InputTagsCommand>
            <InputTagsList />
            <InputTagsEmpty />
          </InputTagsCommand>
        </InputTagsContent>
      </InputTags>
    );
  },
};
