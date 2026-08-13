import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  SelectSearchMulti,
  SelectSearchMultiCommand,
  SelectSearchMultiContent,
  SelectSearchMultiEmpty,
  SelectSearchMultiGroup,
  SelectSearchMultiInput,
  SelectSearchMultiItem,
  SelectSearchMultiItemIndicator,
  SelectSearchMultiList,
  SelectSearchMultiTrigger,
  SelectSearchMultiValue,
} from "./select-search-multi";

afterEach(() => cleanup());

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
];

function FrameworkMulti({
  applyOnConfirm = false,
  onValueChange,
}: {
  applyOnConfirm?: boolean;
  onValueChange?: (value: string[]) => void;
}) {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <SelectSearchMulti
      value={value}
      onValueChange={(next) => {
        setValue(next);
        onValueChange?.(next);
      }}
      options={OPTIONS}
      applyOnConfirm={applyOnConfirm}
      selectAll
      clearable
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
              {OPTIONS.map((option) => (
                <SelectSearchMultiItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  disabled={option.disabled}
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

describe("SelectSearchMulti", () => {
  it("commits each toggle immediately when applyOnConfirm is false", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FrameworkMulti onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /Frameworks/ }));
    await user.click(await screen.findByRole("option", { name: "React" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["react"]);
    await user.click(await screen.findByRole("option", { name: "Vue" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["react", "vue"]);
  });

  it("holds a draft until Apply Filter when applyOnConfirm is true", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FrameworkMulti applyOnConfirm onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /Frameworks/ }));
    await user.click(await screen.findByRole("option", { name: "React" }));
    expect(onValueChange).not.toHaveBeenCalled();

    await user.click(screen.getByRole("option", { name: "Apply Filter" }));
    expect(onValueChange).toHaveBeenCalledWith(["react"]);
  });

  it("selects all enabled matching options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FrameworkMulti onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /Frameworks/ }));
    await user.click(await screen.findByRole("option", { name: "Select All" }));
    expect(onValueChange).toHaveBeenCalledWith(["react", "vue"]);
  });

  it("does not select a disabled option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FrameworkMulti onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: /Frameworks/ }));
    const svelte = await screen.findByRole("option", { name: "Svelte" });
    expect(svelte).toHaveAttribute("aria-disabled", "true");
    await user.click(svelte);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
