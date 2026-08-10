import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../lib/utils";

function TabsUnderline({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs-underline"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TabsUnderlineList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-underline-list"
      className={cn(
        "border-border text-muted-foreground flex w-full items-center justify-start gap-1 overflow-x-auto overflow-y-hidden border-b",
        className,
      )}
      {...props}
    />
  );
}

function TabsUnderlineTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-underline-trigger"
      className={cn(
        "cursor-pointer focus-visible:ring-ring/40 -mb-px inline-flex shrink-0 items-center gap-3 border-b-2 border-transparent px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        "hover:text-foreground",
        "data-[state=active]:border-sidebar-accent data-[state=active]:text-sidebar-accent data-[state=active]:font-semibold",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[state=active]:[&>span:last-child]:bg-primary data-[state=active]:[&>span:last-child]:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsUnderlineContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-underline-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  TabsUnderline,
  TabsUnderlineList,
  TabsUnderlineTrigger,
  TabsUnderlineContent,
};
