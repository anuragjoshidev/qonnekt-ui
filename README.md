# Qonnekt UI

React component library for [Qonnekt](https://github.com/anuragjoshidev/qonnekt-ui) — Radix primitives, Tailwind v4 tokens, and production composites (SelectSearch, DataTable, form inputs).

**Current version:** `0.1.0`

## Install

```bash
npm i qonnekt-ui
```

Peer dependencies: `react` and `react-dom` ^19.

## Setup

1. Import the theme (required):

```ts
import "qonnekt-ui/theme.css";
```

2. Ensure Tailwind v4 scans the package (so utility classes inside `qonnekt-ui` are generated). In your CSS:

```css
@import "tailwindcss";
@import "qonnekt-ui/theme.css";
@source "../node_modules/qonnekt-ui/dist";
```

Adjust the `@source` path to match your app layout.

3. Import components by path:

```tsx
import { Button } from "qonnekt-ui/button";
import { DatePicker } from "qonnekt-ui/date-picker";
import { Toaster, toast } from "qonnekt-ui/toaster";
```

## Labels

| Component | Path | Interaction |
|-----------|------|-------------|
| Badge | `qonnekt-ui/badge` | Static status / metadata |
| Chip | `qonnekt-ui/chip` | Selectable toggle |
| Tag | `qonnekt-ui/tag` | Removable label |

## Components in 0.1.0

Import path is `qonnekt-ui/<path>`.

### Primitives

| Path | Primary exports |
|------|-----------------|
| `accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `avatar` | `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarInitials` |
| `button` | `Button`, `buttonVariants` |
| `button-group` | `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText` |
| `checkbox` | `Checkbox` |
| `collapsible` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| `item` | `Item`, `ItemContent`, `ItemTitle`, `ItemDescription`, … |
| `kbd` | `Kbd`, `KbdGroup` |
| `radio-group` | `RadioGroup`, `RadioGroupItem` |
| `separator` | `Separator` |
| `slider` | `Slider` |
| `switch` | `Switch` |
| `toggle` | `Toggle`, `toggleVariants` |
| `toggle-group` | `ToggleGroup`, `ToggleGroupItem` |

### Inputs

| Path | Primary exports |
|------|-----------------|
| `calendar` | `Calendar`, `CalendarDayButton` |
| `date-picker` | `DatePicker` |
| `date-range-picker` | `DateRangePicker` |
| `input` | `Input` |
| `input-currency` | `InputCurrency` |
| `input-group` | `InputGroup`, `InputGroupAddon`, `InputGroupInput`, … |
| `input-number` | `InputNumber` |
| `input-otp` | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` |
| `input-password` | `InputPassword` |
| `input-phone` | `InputPhone` |
| `input-search` | `InputSearch` |
| `input-tags` | `InputTags`, `InputTagsTrigger`, `InputTagsContent`, … |
| `input-url` | `InputUrl` |
| `select` | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, … |
| `select-search` | `SelectSearch`, `SelectSearchTrigger`, `SelectSearchContent`, … |
| `select-search-multi` | `SelectSearchMulti`, `SelectSearchMultiTrigger`, … |
| `textarea` | `Textarea` |
| `time-picker` | `TimePicker` |

### Overlays

| Path | Primary exports |
|------|-----------------|
| `alert-dialog` | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, … |
| `command` | `Command`, `CommandInput`, `CommandList`, `CommandItem`, … |
| `context-menu` | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, … |
| `dialog` | `Dialog`, `DialogTrigger`, `DialogContent`, … |
| `drawer` | `Drawer`, `DrawerTrigger`, `DrawerContent`, … |
| `dropdown-menu` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, … |
| `hover-card` | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` |
| `popover` | `Popover`, `PopoverTrigger`, `PopoverContent` |
| `sheet` | `Sheet`, `SheetTrigger`, `SheetContent`, … |
| `tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |

### Navigation

| Path | Primary exports |
|------|-----------------|
| `breadcrumb` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, … |
| `menubar` | `Menubar`, `MenubarMenu`, `MenubarTrigger`, … |
| `navigation-menu` | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, … |
| `pagination` | `Pagination`, `PaginationContent`, `PaginationLink`, … |
| `sidebar` | `Sidebar`, `SidebarProvider`, `SidebarTrigger`, `useSidebar`, … |
| `stepper` | `Stepper`, `StepperItem`, `StepperTrigger`, `StepperIndicator`, … |
| `tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| `tabs-underline` | `TabsUnderline`, `TabsUnderlineList`, `TabsUnderlineTrigger`, `TabsUnderlineContent` |

### Layout

| Path | Primary exports |
|------|-----------------|
| `aspect-ratio` | `AspectRatio` |
| `card` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, … |
| `divider` | `Divider` |
| `resizable` | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` |
| `scroll-area` | `ScrollArea`, `ScrollBar` |

### Feedback

| Path | Primary exports |
|------|-----------------|
| `alert` | `Alert`, `AlertTitle`, `AlertDescription` |
| `empty` | `Empty`, `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, … |
| `progress` | `Progress` |
| `progress-radial` | `ProgressRadial` |
| `skeleton` | `Skeleton` |
| `spinner` | `Spinner` |
| `toaster` | `Toaster`, `toast` |

### Forms

| Path | Primary exports |
|------|-----------------|
| `field` | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, … |
| `form` | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `FormFieldError`, `useFormField` |
| `help-text` | `HelpText` |
| `label` | `Label` |

### Labels

| Path | Primary exports |
|------|-----------------|
| `badge` | `Badge` |
| `chip` | `Chip` |
| `tag` | `Tag` |

### Data

| Path | Primary exports |
|------|-----------------|
| `chart` | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, … |
| `data-table` | `DataTable`, `DataTableList`, `DataTableColumnHeader`, `DataTablePagination`, `DataTableViewOptions`, `createSelectColumn` |
| `table` | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, … |
| `tree-view` | `TreeView` |

### Theme & utilities

| Path | Primary exports |
|------|-----------------|
| `theme.css` | CSS tokens (required) |
| `theme-provider` | `ThemeProvider`, `useTheme` |
| `utils` | `cn` |
| `hooks/use-mobile` | `useIsMobile` |
| `lib/utils/date` | Date helpers (`formatDate`, presets, …) |
| `lib/utils/currency` | `formatCurrency`, `getCurrencySymbol`, … |
| `lib/utils/url` | `removeProtocol`, `detectProtocol`, … |
| `lib/filters/constants` | `FILTER_CLEAR`, `isFilterClear` |

## Storybook

```bash
npm install
npm run storybook
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build ESM + types to `dist/` |
| `npm run typecheck` | TypeScript check |
| `npm test` | Vitest unit tests |
| `npm run storybook` | Dev Storybook on :6006 |

## License

MIT
