import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TreeView, type TreeDataItem } from "./tree-view";

afterEach(() => cleanup());

const data: TreeDataItem[] = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "src-lib", name: "lib" },
    ],
  },
  { id: "readme", name: "README.md" },
];

function Demo({
  onSelectChange,
  extra,
}: {
  onSelectChange?: (item: TreeDataItem) => void;
  extra?: Partial<TreeDataItem>;
}) {
  const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const tree: TreeDataItem[] = extra
    ? data.map((item) => (item.id === extra.id ? { ...item, ...extra } : item))
    : data;

  return (
    <TreeView
      data={tree}
      expandedIds={expandedIds}
      onExpandedChange={setExpandedIds}
      selectedId={selectedId}
      onSelectChange={(item) => {
        setSelectedId(item.id);
        onSelectChange?.(item);
      }}
    />
  );
}

describe("TreeView", () => {
  it("exposes a tree role", () => {
    render(<Demo />);
    expect(screen.getByRole("tree")).toBeInTheDocument();
  });

  it("selects a leaf", async () => {
    const user = userEvent.setup();
    const onSelectChange = vi.fn();
    render(<Demo onSelectChange={onSelectChange} />);

    await user.click(screen.getByRole("button", { name: /README.md/ }));
    expect(onSelectChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: "readme", name: "README.md" }),
    );
  });

  it("expands a branch", async () => {
    const user = userEvent.setup();
    render(<Demo />);

    expect(screen.queryByText("lib")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /src/ }));
    expect(await screen.findByText("lib")).toBeInTheDocument();
  });

  it("renders actions outside the expand trigger", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const onSelectChange = vi.fn();
    render(
      <Demo
        onSelectChange={onSelectChange}
        extra={{
          id: "readme",
          actions: (
            <button type="button" onClick={onAction}>
              More
            </button>
          ),
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "More" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
