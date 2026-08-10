# Qonnekt UI

React component library for [Qonnekt](https://github.com/anuragjoshidev/qonnekt-ui) — Radix primitives, Tailwind v4 tokens, and production composites (SelectSearch, DataTable, form inputs).

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

| Component | Interaction |
|-----------|-------------|
| `Badge` | Static status / metadata |
| `Chip` | Selectable toggle |
| `Tag` | Removable label |

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
