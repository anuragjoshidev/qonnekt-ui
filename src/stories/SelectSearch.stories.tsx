import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  SelectSearch,
  SelectSearchTrigger,
  SelectSearchValue,
  SelectSearchContent,
  SelectSearchCommand,
  SelectSearchInput,
  SelectSearchList,
  SelectSearchEmpty,
  SelectSearchGroup,
  SelectSearchItem,
} from "../components/select-search";

const meta = {
  title: "Inputs/SelectSearch",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export const Default: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState("");
    return (
      <SelectSearch value={value} onValueChange={setValue} clearable>
        <SelectSearchTrigger className="w-[240px]">
          <SelectSearchValue placeholder="Fruit" />
        </SelectSearchTrigger>
        <SelectSearchContent>
          <SelectSearchCommand>
            <SelectSearchInput placeholder="Search..." />
            <SelectSearchList>
              <SelectSearchEmpty />
              <SelectSearchGroup>
                {OPTIONS.map((o) => (
                  <SelectSearchItem key={o.value} value={o.value} label={o.label}>
                    {o.label}
                  </SelectSearchItem>
                ))}
              </SelectSearchGroup>
            </SelectSearchList>
          </SelectSearchCommand>
        </SelectSearchContent>
      </SelectSearch>
    );
  },
};
