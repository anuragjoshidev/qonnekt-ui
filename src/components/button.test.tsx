import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

afterEach(() => cleanup());

describe("Button", () => {
  it("renders a button with its label", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("shows a spinner, disables, and keeps the label when loading", () => {
    render(<Button loading>Saving</Button>);
    const button = screen.getByRole("button", { name: /saving/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    expect(button).toHaveTextContent("Saving");
  });

  it("renders an anchor when href is set", () => {
    render(<Button href="https://example.com">Docs</Button>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("does not inject a spinner on href when loading", () => {
    render(
      <Button href="https://example.com" loading>
        Docs
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a tooltip on hover", async () => {
    const user = userEvent.setup();
    render(<Button tooltip="More info">Hint</Button>);
    await user.hover(screen.getByRole("button", { name: "Hint" }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("More info");
  });
});
