import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { ColumnDef, PaginationState, RowSelectionState } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, createSelectColumn } from "../components/data-table";

type Person = { id: string; name: string; role: string };

const data: Person[] = [
  { id: "1", name: "Ada Lovelace", role: "Engineer" },
  { id: "2", name: "Grace Hopper", role: "Admiral" },
  { id: "3", name: "Alan Turing", role: "Scientist" },
  { id: "4", name: "Katherine Johnson", role: "Mathematician" },
  { id: "5", name: "Margaret Hamilton", role: "Engineer" },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
  },
];

const meta = {
  title: "Data/DataTable",
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      filterColumn="name"
      filterPlaceholder="Filter name..."
      showPagination
      tableClassName="w-full"
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyTitle="No people found"
      emptyDescription="Try a different search."
      tableClassName="w-full"
    />
  ),
};

export const RowSelection: Story = {
  render: function Demo() {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    return (
      <DataTable
        columns={[createSelectColumn<Person>(), ...columns]}
        data={data}
        getRowId={(row) => row.id}
        state={{ rowSelection }}
        onRowSelectionChange={setRowSelection}
        tableClassName="w-full"
      />
    );
  },
};

export const ManualPagination: Story = {
  render: function Demo() {
    const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 2,
    });
    const pageCount = Math.ceil(data.length / pagination.pageSize);
    const page = data.slice(
      pagination.pageIndex * pagination.pageSize,
      pagination.pageIndex * pagination.pageSize + pagination.pageSize,
    );
    return (
      <DataTable
        columns={columns}
        data={page}
        getRowId={(row) => row.id}
        manualPagination
        pageCount={pageCount}
        rowCount={data.length}
        state={{ pagination }}
        onPaginationChange={setPagination}
        tableClassName="w-full"
      />
    );
  },
};
