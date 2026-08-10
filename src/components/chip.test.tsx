import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./chip";

afterEach(() => cleanup());

describe("Chip", () => {
  it("toggles selected state when selectable", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    render(
      <Chip selectable selected={false} onSelectedChange={onSelectedChange}>
        Option
      </Chip>,
    );
    const chip = screen.getByRole("button", { name: /option/i });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await user.click(chip);
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("supports keyboard toggle", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    render(
      <Chip selectable selected={false} onSelectedChange={onSelectedChange}>
        Keyboard
      </Chip>,
    );
    const chip = screen.getByRole("button", { name: /keyboard/i });
    chip.focus();
    await user.keyboard("{Enter}");
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });
});
