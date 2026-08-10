import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, createSelectColumn } from "../components/data-table";

type Person = { id: string; name: string; role: string };

const data: Person[] = [
  { id: "1", name: "Ada Lovelace", role: "Engineer" },
  { id: "2", name: "Grace Hopper", role: "Admiral" },
  { id: "3", name: "Alan Turing", role: "Scientist" },
];

const columns: ColumnDef<Person>[] = [
  createSelectColumn<Person>(),
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
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

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
