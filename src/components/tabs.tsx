import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // Foundry tab strip: muted surface, bordered, padded; tabs share equal width.
        "bg-muted text-muted-foreground border-border inline-flex w-full items-center justify-start gap-1 rounded-md border p-1.5",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Foundry tab: equal-width, centered, muted text when inactive; on active
        // flips to the dark navy "secondary" surface with white text and semibold.
        "cursor-pointer text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:font-semibold",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Make local TabCount-style badges (last child <span>) flip to amber on active.
        "data-[state=active]:[&>span:last-child]:bg-primary data-[state=active]:[&>span:last-child]:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
