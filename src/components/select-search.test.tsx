import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  SELECT_SEARCH_CLEAR_VALUE,
  SelectSearch,
  SelectSearchCommand,
  SelectSearchContent,
  SelectSearchEmpty,
  SelectSearchGroup,
  SelectSearchInput,
  SelectSearchItem,
  SelectSearchList,
  SelectSearchTrigger,
  SelectSearchValue,
} from "./select-search";

afterEach(() => cleanup());

const OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry", disabled: true },
];

function FruitSearch({
  clearable = false,
  onValueChange,
  onSearchChange,
}: {
  clearable?: boolean;
  onValueChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");
  return (
    <SelectSearch
      value={value}
      onValueChange={(next) => {
        setValue(next);
        onValueChange?.(next);
      }}
      clearable={clearable}
      onSearchChange={onSearchChange}
    >
      <SelectSearchTrigger>
        <SelectSearchValue placeholder="Fruit">
          {OPTIONS.find((option) => option.value === value)?.label}
        </SelectSearchValue>
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
                  disabled={option.disabled}
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

describe("SelectSearch", () => {
  it("opens, lists options, and commits a selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FruitSearch onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /Fruit/ }));
    expect(await screen.findByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(onValueChange).toHaveBeenCalledWith("apple");
    expect(screen.queryByRole("option", { name: "Banana" })).not.toBeInTheDocument();
  });

  it("clears to the sentinel value when clearable", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FruitSearch clearable onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /Fruit/ }));
    await user.click(await screen.findByRole("option", { name: "Apple" }));
    expect(onValueChange).toHaveBeenCalledWith("apple");

    await user.click(screen.getByRole("button", { name: /Apple/ }));
    await user.click(await screen.findByRole("option", { name: "Clear Filter" }));
    expect(onValueChange).toHaveBeenCalledWith(SELECT_SEARCH_CLEAR_VALUE);
  });

  it("reports search text", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(<FruitSearch onSearchChange={onSearchChange} />);

    await user.click(screen.getByRole("button", { name: /Fruit/ }));
    const input = await screen.findByPlaceholderText("Search...");
    await user.type(input, "ban");
    expect(onSearchChange).toHaveBeenCalledWith("ban");
  });

  it("does not select a disabled option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FruitSearch onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /Fruit/ }));
    const cherry = await screen.findByRole("option", { name: "Cherry" });
    expect(cherry).toHaveAttribute("aria-disabled", "true");
    await user.click(cherry);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("shows empty text when nothing matches", async () => {
    const user = userEvent.setup();
    render(<FruitSearch />);

    await user.click(screen.getByRole("button", { name: /Fruit/ }));
    const input = await screen.findByPlaceholderText("Search...");
    await user.type(input, "zzzz");
    expect(await screen.findByText("No results found.")).toBeInTheDocument();
  });
});
