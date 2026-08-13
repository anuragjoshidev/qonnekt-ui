import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DataTablePagination } from "../components/data-table";

const meta = {
  title: "Data/DataTablePagination",
  component: DataTablePagination,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Demo() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    return (
      <DataTablePagination
        currentPage={page}
        pageCount={5}
        pageSize={pageSize}
        totalRows={47}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};
