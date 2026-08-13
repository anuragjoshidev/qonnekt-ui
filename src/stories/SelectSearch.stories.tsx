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
  parameters: { a11y: { test: "error" } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

function FruitSelect({
  clearable = false,
  loading = false,
  disabledCherry = false,
}: {
  clearable?: boolean;
  loading?: boolean;
  disabledCherry?: boolean;
}) {
  const [value, setValue] = React.useState("");
  const selected = OPTIONS.find((option) => option.value === value);
  return (
    <SelectSearch value={value} onValueChange={setValue} clearable={clearable}>
      <SelectSearchTrigger className="w-[240px]" loading={loading}>
        <SelectSearchValue placeholder="Fruit">{selected?.label}</SelectSearchValue>
      </SelectSearchTrigger>
      <SelectSearchContent>
        <SelectSearchCommand>
          <SelectSearchInput placeholder="Search..." />
          <SelectSearchList>
            <SelectSearchEmpty />
            <SelectSearchGroup>
              {OPTIONS.map((option) => (
                <SelectSearchItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  disabled={disabledCherry && option.value === "cherry"}
                >
                  {option.label}
                </SelectSearchItem>
              ))}
            </SelectSearchGroup>
          </SelectSearchList>
        </SelectSearchCommand>
      </SelectSearchContent>
    </SelectSearch>
  );
}

export const Default: Story = {
  render: () => <FruitSelect />,
};

export const Clearable: Story = {
  render: () => <FruitSelect clearable />,
};

export const Loading: Story = {
  render: () => <FruitSelect loading />,
};

export const DisabledOption: Story = {
  render: () => <FruitSelect disabledCherry />,
};

export const AsyncSearch: Story = {
  render: function Demo() {
    const [value, setValue] = React.useState("");
    const [query, setQuery] = React.useState("");
    const [options, setOptions] = React.useState(OPTIONS);
    const [loading, setLoading] = React.useState(false);
    const selected = OPTIONS.find((option) => option.value === value);

    React.useEffect(() => {
      setLoading(true);
      const id = window.setTimeout(() => {
        const q = query.trim().toLowerCase();
        setOptions(
          OPTIONS.filter((option) => option.label.toLowerCase().includes(q)),
        );
        setLoading(false);
      }, 250);
      return () => window.clearTimeout(id);
    }, [query]);

    return (
      <SelectSearch
        value={value}
        onValueChange={setValue}
        onSearchChange={setQuery}
      >
        <SelectSearchTrigger className="w-[240px]" loading={loading}>
          <SelectSearchValue placeholder="Fruit">{selected?.label}</SelectSearchValue>
        </SelectSearchTrigger>
        <SelectSearchContent>
          <SelectSearchCommand shouldFilter={false}>
            <SelectSearchInput placeholder="Search remote..." />
            <SelectSearchList>
              <SelectSearchEmpty />
              <SelectSearchGroup>
                {options.map((option) => (
                  <SelectSearchItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
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
