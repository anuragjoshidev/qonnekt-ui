import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputCurrency } from "./input-currency";

afterEach(() => cleanup());

function CurrencyField(
  props: Partial<React.ComponentProps<typeof InputCurrency>> & {
    initial?: number;
  },
) {
  const { initial = 0, onChange, ...rest } = props;
  const [value, setValue] = React.useState(initial);
  return (
    <InputCurrency
      aria-label="Amount"
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
      {...rest}
    />
  );
}

describe("InputCurrency", () => {
  it("calls onChange(0) when cleared and allowEmptyAsZero is on", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CurrencyField initial={12} onChange={onChange} />);

    const input = screen.getByRole("textbox", { name: "Amount" });
    await user.clear(input);
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("renders 0 as empty when showEmptyWhenZero is on", () => {
    render(<CurrencyField initial={0} showEmptyWhenZero />);
    expect(screen.getByRole("textbox", { name: "Amount" })).toHaveValue("");
  });

  it("parses a decimal amount", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CurrencyField onChange={onChange} showEmptyWhenZero />);

    await user.type(screen.getByRole("textbox", { name: "Amount" }), "12.5");
    expect(onChange).toHaveBeenLastCalledWith(12.5);
  });

  it("rejects a leading minus when negatives are disallowed", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CurrencyField onChange={onChange} allowNegative={false} showEmptyWhenZero />,
    );

    await user.type(screen.getByRole("textbox", { name: "Amount" }), "-");
    expect(screen.getByRole("textbox", { name: "Amount" })).toHaveValue("");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("formats to fixed decimals on blur", async () => {
    const user = userEvent.setup();
    render(<CurrencyField initial={1} decimalPlaces={2} showEmptyWhenZero={false} />);

    const input = screen.getByRole("textbox", { name: "Amount" });
    input.focus();
    await user.tab();
    expect(input).toHaveValue("1.00");
  });

  it("shows the INR symbol by default", () => {
    render(<CurrencyField />);
    expect(screen.getByText("₹")).toBeInTheDocument();
  });
});
