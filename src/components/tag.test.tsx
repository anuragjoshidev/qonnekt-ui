import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "./tag";

afterEach(() => cleanup());

describe("Tag", () => {
  it("calls onRemove when remove is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Tag onRemove={onRemove} removeLabel="Remove design">
        Design
      </Tag>,
    );
    await user.click(screen.getByRole("button", { name: "Remove design" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("hides remove control when onRemove is omitted", () => {
    render(<Tag>Plain</Tag>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
