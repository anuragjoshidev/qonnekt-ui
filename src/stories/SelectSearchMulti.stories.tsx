import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  SelectSearchMulti,
  SelectSearchMultiTrigger,
  SelectSearchMultiValue,
  SelectSearchMultiContent,
  SelectSearchMultiCommand,
  SelectSearchMultiInput,
  SelectSearchMultiList,
  SelectSearchMultiEmpty,
  SelectSearchMultiGroup,
  SelectSearchMultiItem,
  SelectSearchMultiItemIndicator,
} from "../components/select-search-multi";

const meta = {
  title: "Inputs/SelectSearchMulti",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <SelectSearchMulti
        value={value}
        onValueChange={setValue}
        options={OPTIONS}
        clearable
        className="w-[280px]"
      >
        <SelectSearchMultiTrigger>
          <SelectSearchMultiValue placeholder="Frameworks" />
        </SelectSearchMultiTrigger>
        <SelectSearchMultiContent>
          <SelectSearchMultiCommand>
            <SelectSearchMultiInput placeholder="Search..." />
            <SelectSearchMultiList>
              <SelectSearchMultiEmpty />
              <SelectSearchMultiGroup>
                {OPTIONS.map((o) => (
                  <SelectSearchMultiItem key={o.value} value={o.value} label={o.label}>
                    <SelectSearchMultiItemIndicator />
                    {o.label}
                  </SelectSearchMultiItem>
                ))}
              </SelectSearchMultiGroup>
            </SelectSearchMultiList>
          </SelectSearchMultiCommand>
        </SelectSearchMultiContent>
      </SelectSearchMulti>
    );
  },
};
