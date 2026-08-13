# Changelog

## Unreleased

- README framed as a starter UI kit; install from source (not npm)
- Button `loading` renders a spinner on native buttons
- Unit tests for SelectSearch, DataTable, domain inputs, TreeView, Button
- Storybook: Leads workspace example, extra composite stories, a11y `error` on originals
- CI (typecheck, test, lint, build) and GitHub Pages Storybook deploy
- Attribution for shadcn/ui in LICENSE

## 0.1.0

Initial public release of **Qonnekt UI**.

### Package

- Single package `qonnekt-ui` with path exports (`qonnekt-ui/button`, etc.)
- First-class `qonnekt-ui/theme.css` (Tailwind v4 tokens, Qonnekt brand neutrals)
- Storybook (React + Vite) with Docs and a11y addons
- Framework-agnostic `Button` (`asChild` / `href`; no react-router coupling)
- Labels: `Badge` (static), `Chip` (selectable), `Tag` (removable)
- `Toaster` + `toast` (Sonner-backed) at `qonnekt-ui/toaster`
- `DatePicker` + `DateRangePicker`

### Components included

Import as `qonnekt-ui/<path>`.

**Primitives:** `accordion`, `avatar`, `button`, `button-group`, `checkbox`, `collapsible`, `item`, `kbd`, `radio-group`, `separator`, `slider`, `switch`, `toggle`, `toggle-group`

**Inputs:** `calendar`, `date-picker`, `date-range-picker`, `input`, `input-currency`, `input-group`, `input-number`, `input-otp`, `input-password`, `input-phone`, `input-search`, `input-tags`, `input-url`, `select`, `select-search`, `select-search-multi`, `textarea`, `time-picker`

**Overlays:** `alert-dialog`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `hover-card`, `popover`, `sheet`, `tooltip`

**Navigation:** `breadcrumb`, `menubar`, `navigation-menu`, `pagination`, `sidebar`, `stepper`, `tabs`, `tabs-underline`

**Layout:** `aspect-ratio`, `card`, `divider`, `resizable`, `scroll-area`

**Feedback:** `alert`, `empty`, `progress`, `progress-radial`, `skeleton`, `spinner`, `toaster`

**Forms:** `field`, `form`, `help-text`, `label`

**Labels:** `badge`, `chip`, `tag`

**Data:** `chart`, `data-table` (`DataTable`, `DataTableList`, column helpers), `table`, `tree-view`

**Theme & utilities:** `theme.css`, `theme-provider`, `utils` (`cn`), `hooks/use-mobile`, `lib/utils/date`, `lib/utils/currency`, `lib/utils/url`, `lib/filters/constants`
