import type { Preview } from "@storybook/react-vite";
import React from "react";
import "../src/styles/theme.css";
import { ThemeProvider } from "../src/components/theme-provider";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
    layout: "padded",
  },
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
      return React.createElement(
        ThemeProvider,
        {
          attribute: "class",
          defaultTheme: theme,
          forcedTheme: theme,
          enableSystem: false,
        },
        React.createElement(
          "div",
          { className: "bg-background text-foreground min-h-screen p-4" },
          React.createElement(Story),
        ),
      );
    },
  ],
};

export default preview;
