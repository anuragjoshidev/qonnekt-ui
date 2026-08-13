import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableList } from "../components/data-table";

type Row = { id: string; title: string };

const columns: ColumnDef<Row>[] = [
  { accessorKey: "title", header: "Title" },
];

const allRows: Row[] = Array.from({ length: 23 }, (_, i) => ({
  id: String(i + 1),
  title: `Item ${i + 1}`,
}));

const meta = {
  title: "Data/DataTableList",
  component: DataTableList,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Demo() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const pageCount = Math.ceil(allRows.length / pageSize);
    const data = allRows.slice((page - 1) * pageSize, page * pageSize);
    return (
      <DataTableList
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        manualPagination
        pageCount={pageCount}
        rowCount={allRows.length}
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        state={{ pagination: { pageIndex: page - 1, pageSize } }}
        tableClassName="w-full"
      />
    );
  },
};
