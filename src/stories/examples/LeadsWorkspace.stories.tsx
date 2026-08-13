import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { ColumnDef } from "../../components/data-table";
import type { DateRange } from "react-day-picker";
import {
  DataTable,
  DataTableColumnHeader,
} from "../../components/data-table";
import {
  SelectSearch,
  SelectSearchCommand,
  SelectSearchContent,
  SelectSearchEmpty,
  SelectSearchGroup,
  SelectSearchInput,
  SelectSearchItem,
  SelectSearchList,
  SelectSearchTrigger,
  SelectSearchValue,
  SELECT_SEARCH_CLEAR_VALUE,
  isSelectSearchClear,
} from "../../components/select-search";
import {
  SelectSearchMulti,
  SelectSearchMultiCommand,
  SelectSearchMultiContent,
  SelectSearchMultiEmpty,
  SelectSearchMultiGroup,
  SelectSearchMultiInput,
  SelectSearchMultiItem,
  SelectSearchMultiItemIndicator,
  SelectSearchMultiList,
  SelectSearchMultiTrigger,
  SelectSearchMultiValue,
} from "../../components/select-search-multi";
import { DateRangePicker } from "../../components/date-range-picker";
import { InputSearch } from "../../components/input-search";
import { Chip } from "../../components/chip";
import { formatCurrency } from "../../lib/utils/currency";
import { formatDate } from "../../lib/utils/date";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/sidebar";

const meta = {
  title: "Examples/Leads workspace",
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type LeadStatus = "new" | "qualified" | "won" | "lost";

type Lead = {
  id: string;
  name: string;
  company: string;
  owner: string;
  amount: number;
  status: LeadStatus;
  followUp: string;
};

const OWNERS = [
  { value: "anika", label: "Anika Shah" },
  { value: "rohan", label: "Rohan Mehta" },
  { value: "maya", label: "Maya Iyer" },
];

const STATUSES: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "qualified", label: "Qualified" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const statusColor: Record<LeadStatus, "blue" | "yellow" | "green" | "red"> = {
  new: "blue",
  qualified: "yellow",
  won: "green",
  lost: "red",
};

const LEADS: Lead[] = [
  { id: "1", name: "Priya Nair", company: "Northwind", owner: "anika", amount: 240000, status: "qualified", followUp: "2026-02-18T00:00:00.000Z" },
  { id: "2", name: "Arjun Kapoor", company: "Brightline", owner: "rohan", amount: 85000, status: "new", followUp: "2026-02-20T00:00:00.000Z" },
  { id: "3", name: "Sana Qureshi", company: "Helio", owner: "maya", amount: 1250000, status: "won", followUp: "2026-01-12T00:00:00.000Z" },
  { id: "4", name: "Dev Patel", company: "Kiteworks", owner: "anika", amount: 420000, status: "qualified", followUp: "2026-03-02T00:00:00.000Z" },
  { id: "5", name: "Leah Chen", company: "Orbit", owner: "rohan", amount: 67000, status: "lost", followUp: "2026-01-28T00:00:00.000Z" },
  { id: "6", name: "Imran Ali", company: "Cedar", owner: "maya", amount: 310000, status: "new", followUp: "2026-02-25T00:00:00.000Z" },
  { id: "7", name: "Nora Das", company: "Lumen", owner: "anika", amount: 980000, status: "qualified", followUp: "2026-03-08T00:00:00.000Z" },
  { id: "8", name: "Vikram Rao", company: "Pinnacle", owner: "rohan", amount: 155000, status: "won", followUp: "2026-01-05T00:00:00.000Z" },
  { id: "9", name: "Elena Cruz", company: "Harbor", owner: "maya", amount: 54000, status: "new", followUp: "2026-02-14T00:00:00.000Z" },
  { id: "10", name: "Kabir Singh", company: "Nimbus", owner: "anika", amount: 2100000, status: "qualified", followUp: "2026-03-15T00:00:00.000Z" },
  { id: "11", name: "Amelia Frost", company: "Solstice", owner: "rohan", amount: 275000, status: "lost", followUp: "2026-02-01T00:00:00.000Z" },
  { id: "12", name: "Rahul Bose", company: "Aperture", owner: "maya", amount: 640000, status: "won", followUp: "2026-01-22T00:00:00.000Z" },
];

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "company",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company" />,
  },
  {
    id: "owner",
    accessorFn: (row) => OWNERS.find((owner) => owner.value === row.owner)?.label ?? row.owner,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Owner" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const label = STATUSES.find((item) => item.value === status)?.label ?? status;
      return (
        <Chip color={statusColor[status]} selectable={false}>
          {label}
        </Chip>
      );
    },
  },
  {
    accessorKey: "followUp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Follow-up" />,
    cell: ({ row }) => formatDate(row.original.followUp),
  },
];

function inRange(iso: string, range: DateRange | undefined) {
  if (!range?.from) return true;
  const day = new Date(iso);
  if (Number.isNaN(day.getTime())) return true;
  const from = range.from;
  const to = range.to ?? range.from;
  return day >= from && day <= to;
}

function LeadsWorkspace() {
  const [section, setSection] = React.useState<"leads" | "invoices">("leads");
  const [owner, setOwner] = React.useState<string>(SELECT_SEARCH_CLEAR_VALUE);
  const [statuses, setStatuses] = React.useState<string[]>([]);
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [query, setQuery] = React.useState("");
  const selectedOwner = OWNERS.find((item) => item.value === owner);

  const rows = LEADS.filter((lead) => {
    if (!isSelectSearchClear(owner) && lead.owner !== owner) return false;
    if (statuses.length > 0 && !statuses.includes(lead.status)) return false;
    if (!inRange(lead.followUp, range)) return false;
    if (query.trim()) {
      const haystack = `${lead.name} ${lead.company}`.toLowerCase();
      if (!haystack.includes(query.trim().toLowerCase())) return false;
    }
    return true;
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-4 py-3 font-medium">Qonnekt</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={section === "leads"}
                    onClick={() => setSection("leads")}
                  >
                    Leads
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={section === "invoices"}
                    onClick={() => setSection("invoices")}
                  >
                    Invoices
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-sm font-medium">
            {section === "leads" ? "Leads" : "Invoices"}
          </h1>
        </header>
        <div className="p-4">
          {section === "invoices" ? (
            <p className="text-muted-foreground text-sm">
              Invoices would use the same table, currency, and filter kit.
            </p>
          ) : (
            <DataTable
              columns={columns}
              data={rows}
              getRowId={(row) => row.id}
              filterDebounceMs={0}
              showPagination
              initialState={{ pagination: { pageIndex: 0, pageSize: 8 } }}
              emptyTitle="No leads match"
              emptyDescription="Clear a filter or try another search."
              tableClassName="w-full"
              toolbarExtraBeforeFilters={
                <div className="flex flex-wrap items-center gap-3">
                  <SelectSearch
                    value={owner}
                    onValueChange={setOwner}
                    clearable
                  >
                    <SelectSearchTrigger className="w-[200px]">
                      <SelectSearchValue placeholder="Owner">
                        {selectedOwner?.label}
                      </SelectSearchValue>
                    </SelectSearchTrigger>
                    <SelectSearchContent>
                      <SelectSearchCommand>
                        <SelectSearchInput placeholder="Search owners..." />
                        <SelectSearchList>
                          <SelectSearchEmpty />
                          <SelectSearchGroup>
                            {OWNERS.map((item) => (
                              <SelectSearchItem
                                key={item.value}
                                value={item.value}
                                label={item.label}
                              >
                                {item.label}
                              </SelectSearchItem>
                            ))}
                          </SelectSearchGroup>
                        </SelectSearchList>
                      </SelectSearchCommand>
                    </SelectSearchContent>
                  </SelectSearch>
                  <SelectSearchMulti
                    value={statuses}
                    onValueChange={setStatuses}
                    options={STATUSES}
                    clearable
                  >
                    <SelectSearchMultiTrigger className="w-[220px]">
                      <SelectSearchMultiValue placeholder="Status" />
                    </SelectSearchMultiTrigger>
                    <SelectSearchMultiContent>
                      <SelectSearchMultiCommand>
                        <SelectSearchMultiInput placeholder="Search status..." />
                        <SelectSearchMultiList>
                          <SelectSearchMultiEmpty />
                          <SelectSearchMultiGroup>
                            {STATUSES.map((item) => (
                              <SelectSearchMultiItem
                                key={item.value}
                                value={item.value}
                                label={item.label}
                              >
                                <SelectSearchMultiItemIndicator />
                                {item.label}
                              </SelectSearchMultiItem>
                            ))}
                          </SelectSearchMultiGroup>
                        </SelectSearchMultiList>
                      </SelectSearchMultiCommand>
                    </SelectSearchMultiContent>
                  </SelectSearchMulti>
                  <DateRangePicker
                    value={range}
                    onChange={setRange}
                    applyDefaultOnMount={false}
                    placeholder="Follow-up"
                    className="w-[240px]"
                  />
                  <InputSearch
                    value={query}
                    onChange={setQuery}
                    placeholder="Search name or company"
                    debounceMs={0}
                    className="w-[220px]"
                  />
                </div>
              }
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const Default: Story = {
  render: () => <LeadsWorkspace />,
};
