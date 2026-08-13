import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { createSelectColumn } from "./create-select-column";
import { DataTableColumnHeader } from "./data-table-column-header";

afterEach(() => cleanup());

type Person = { id: string; name: string; role: string };

const people: Person[] = [
  { id: "1", name: "Ada Lovelace", role: "Engineer" },
  { id: "2", name: "Grace Hopper", role: "Admiral" },
  { id: "3", name: "Alan Turing", role: "Scientist" },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
];

describe("DataTable", () => {
  it("renders rows", () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        getRowId={(row) => row.id}
        tableClassName="w-full"
      />,
    );
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
    expect(screen.getByText("Alan Turing")).toBeInTheDocument();
  });

  it("filters by name with debounce disabled", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={people}
        getRowId={(row) => row.id}
        filterColumn="name"
        filterPlaceholder="Filter name..."
        filterDebounceMs={0}
        tableClassName="w-full"
      />,
    );

    await user.type(screen.getByPlaceholderText("Filter name..."), "Grace");
    await waitFor(() => {
      expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
      expect(screen.queryByText("Ada Lovelace")).not.toBeInTheDocument();
    });
  });

  it("shows custom empty copy when there are no rows", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Nothing here"
        emptyDescription="Try another filter."
        tableClassName="w-full"
      />,
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Try another filter.")).toBeInTheDocument();
  });

  it("reports row selection through getRowId", async () => {
    const user = userEvent.setup();
    const onRowSelectionChange = vi.fn();

    function Demo() {
      const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
        {},
      );
      return (
        <DataTable
          columns={[createSelectColumn<Person>(), ...columns]}
          data={people}
          getRowId={(row) => row.id}
          state={{ rowSelection }}
          onRowSelectionChange={(updater) => {
            const next =
              typeof updater === "function" ? updater(rowSelection) : updater;
            setRowSelection(next);
            onRowSelectionChange(next);
          }}
          tableClassName="w-full"
        />
      );
    }

    render(<Demo />);
    await user.click(screen.getAllByRole("checkbox", { name: "Select row" })[0]!);
    expect(onRowSelectionChange).toHaveBeenCalledWith({ "1": true });
  });

  it("renders pagination when asked", () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        getRowId={(row) => row.id}
        showPagination
        initialState={{ pagination: { pageIndex: 0, pageSize: 2 } }}
        tableClassName="w-full"
      />,
    );
    expect(screen.getByText("Rows per page")).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.queryByText("Alan Turing")).not.toBeInTheDocument();
  });
});
