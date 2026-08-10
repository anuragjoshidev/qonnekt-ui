import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { DataTableViewOptions } from "../components/data-table";

type Row = { name: string; role: string };

const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role", enableHiding: true },
];

const meta = {
  title: "Data/DataTableViewOptions",
  component: DataTableViewOptions,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableViewOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Demo() {
    const table = useReactTable({
      data: [{ name: "Ada", role: "Engineer" }],
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
    return <DataTableViewOptions table={table} />;
  },
};
