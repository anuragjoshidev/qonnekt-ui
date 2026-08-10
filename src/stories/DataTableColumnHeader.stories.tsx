import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "../components/data-table";

type Row = { name: string };

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" helpMessage="Full name" />
    ),
  },
];

const meta = {
  title: "Data/DataTableColumnHeader",
  component: DataTableColumnHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableColumnHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const table = useReactTable({
      data: [{ name: "Ada" }, { name: "Grace" }],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
    const header = table.getHeaderGroups()[0]?.headers[0];
    if (!header) return null;
    return (
      <div className="p-2">
        {typeof header.column.columnDef.header === "function"
          ? header.column.columnDef.header(header.getContext())
          : null}
      </div>
    );
  },
};
