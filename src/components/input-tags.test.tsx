import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  InputTags,
  InputTagsCommand,
  InputTagsContent,
  InputTagsEmpty,
  InputTagsList,
  InputTagsTrigger,
} from "./input-tags";

afterEach(() => cleanup());

const OPTIONS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
];

function TagsField({
  initial = ["design"],
  onValueChange,
}: {
  initial?: string[];
  onValueChange?: (value: string[]) => void;
}) {
  const [value, setValue] = React.useState<string[]>(initial);
  return (
    <InputTags
      value={value}
      onValueChange={(next) => {
        setValue(next);
        onValueChange?.(next);
      }}
      options={OPTIONS}
    >
      <InputTagsTrigger />
      <InputTagsContent>
        <InputTagsCommand>
          <InputTagsList />
          <InputTagsEmpty />
        </InputTagsCommand>
      </InputTagsContent>
    </InputTags>
  );
}

describe("InputTags", () => {
  it("adds a tag from the list", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TagsField initial={[]} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Engineering" }));
    expect(onValueChange).toHaveBeenCalledWith(["engineering"]);
  });

  it("removes a tag without keeping that value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TagsField onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Remove tag" }));
    expect(onValueChange).toHaveBeenCalledWith([]);
  });
});
