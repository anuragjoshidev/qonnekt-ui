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
  parameters: { a11y: { test: "error" } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

function FrameworkMulti({
  applyOnConfirm = false,
  selectAll = true,
}: {
  applyOnConfirm?: boolean;
  selectAll?: boolean;
}) {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <SelectSearchMulti
      value={value}
      onValueChange={setValue}
      options={OPTIONS}
      clearable
      applyOnConfirm={applyOnConfirm}
      selectAll={selectAll}
    >
      <SelectSearchMultiTrigger className="w-[280px]">
        <SelectSearchMultiValue placeholder="Frameworks" />
      </SelectSearchMultiTrigger>
      <SelectSearchMultiContent>
        <SelectSearchMultiCommand>
          <SelectSearchMultiInput placeholder="Search..." />
          <SelectSearchMultiList>
            <SelectSearchMultiEmpty />
            <SelectSearchMultiGroup>
              {OPTIONS.map((option) => (
                <SelectSearchMultiItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  <SelectSearchMultiItemIndicator />
                  {option.label}
                </SelectSearchMultiItem>
              ))}
            </SelectSearchMultiGroup>
          </SelectSearchMultiList>
        </SelectSearchMultiCommand>
      </SelectSearchMultiContent>
    </SelectSearchMulti>
  );
}

export const Default: Story = {
  render: () => <FrameworkMulti />,
};

export const ApplyOnConfirm: Story = {
  render: () => <FrameworkMulti applyOnConfirm />,
};

export const SelectAll: Story = {
  render: () => <FrameworkMulti selectAll />,
};
