import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight, Minus } from "@untitledui/icons";
import { cva } from "class-variance-authority";

import { cn } from "../lib/utils";

type TreeIconComponent = React.ComponentType<{ className?: string }>;

export type TreeDataItem = {
  id: string;
  name: string;
  icon?: TreeIconComponent;
  openIcon?: TreeIconComponent;
  /** Always-visible status slot, rendered before the hover-revealed actions. */
  badge?: React.ReactNode;
  /** Rendered at the row end, outside the expand trigger so buttons stay valid. */
  actions?: React.ReactNode;
  children?: TreeDataItem[];
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export type TreeRenderItemParams = {
  item: TreeDataItem;
  level: number;
  isLeaf: boolean;
  isSelected: boolean;
  isOpen: boolean;
  hasChildren: boolean;
};

export type TreeViewProps = Omit<React.ComponentProps<"div">, "children"> & {
  data: TreeDataItem[];
  /** Ids of open branches. Expansion is fully controlled by the caller. */
  expandedIds: string[];
  onExpandedChange: (ids: string[]) => void;
  selectedId?: string;
  onSelectChange?: (item: TreeDataItem) => void;
  defaultNodeIcon?: TreeIconComponent;
  defaultLeafIcon?: TreeIconComponent;
  renderItem?: (params: TreeRenderItemParams) => React.ReactNode;
};

// The hover highlight is painted by a pseudo-element so it spans the whole row
// width. `isolate` keeps the negative z-index inside the row's own stacking
// context, otherwise it would slide behind an opaque ancestor background.
const treeRowVariants = cva(
  "group/tree-row relative isolate flex min-h-10 w-full items-center gap-1 rounded-md pr-1 text-sm before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-accent/70 before:opacity-0 hover:before:opacity-100",
);

const selectedTreeRowVariants = cva(
  "text-accent-foreground before:opacity-100",
);

type TreeContextValue = {
  expandedIds: string[];
  onLevelChange: (levelIds: string[], nextOpenIds: string[]) => void;
  selectedId?: string;
  onSelect: (item: TreeDataItem) => void;
  defaultNodeIcon?: TreeIconComponent;
  defaultLeafIcon?: TreeIconComponent;
  renderItem?: (params: TreeRenderItemParams) => React.ReactNode;
};

const TreeContext = React.createContext<TreeContextValue | null>(null);

function useTreeContext(): TreeContextValue {
  const context = React.useContext(TreeContext);
  if (!context) {
    throw new Error("Tree components must be rendered inside <TreeView>");
  }
  return context;
}

function hasChildren(item: TreeDataItem): boolean {
  return (item.children?.length ?? 0) > 0;
}

function TreeView({
  data,
  expandedIds,
  onExpandedChange,
  selectedId,
  onSelectChange,
  defaultNodeIcon,
  defaultLeafIcon,
  renderItem,
  className,
  ...props
}: TreeViewProps) {
  // Every nesting level renders its own accordion root, so a level only ever
  // reports the ids it owns. Merging keeps the other levels open.
  const onLevelChange = React.useCallback(
    (levelIds: string[], nextOpenIds: string[]) => {
      const owned = new Set(levelIds);
      const others = expandedIds.filter((id) => !owned.has(id));
      onExpandedChange([...others, ...nextOpenIds]);
    },
    [expandedIds, onExpandedChange],
  );

  const onSelect = React.useCallback(
    (item: TreeDataItem) => {
      onSelectChange?.(item);
      item.onClick?.();
    },
    [onSelectChange],
  );

  const context = React.useMemo(
    (): TreeContextValue => ({
      expandedIds,
      onLevelChange,
      selectedId,
      onSelect,
      defaultNodeIcon,
      defaultLeafIcon,
      renderItem,
    }),
    [
      expandedIds,
      onLevelChange,
      selectedId,
      onSelect,
      defaultNodeIcon,
      defaultLeafIcon,
      renderItem,
    ],
  );

  return (
    <TreeContext.Provider value={context}>
      <div
        data-slot="tree-view"
        role="tree"
        className={cn("w-full", className)}
        {...props}
      >
        <TreeLevel items={data} level={1} />
      </div>
    </TreeContext.Provider>
  );
}

function TreeLevel({ items, level }: { items: TreeDataItem[]; level: number }) {
  const { expandedIds, onLevelChange } = useTreeContext();

  const branchIds = React.useMemo(
    () => items.filter(hasChildren).map((item) => item.id),
    [items],
  );

  const openIds = React.useMemo(() => {
    const owned = new Set(branchIds);
    return expandedIds.filter((id) => owned.has(id));
  }, [branchIds, expandedIds]);

  return (
    <AccordionPrimitive.Root
      data-slot="tree-level"
      role={level === 1 ? "presentation" : "group"}
      type="multiple"
      value={openIds}
      onValueChange={(next) => onLevelChange(branchIds, next)}
      className="flex flex-col"
    >
      {items.map((item) =>
        hasChildren(item) ? (
          <TreeBranch key={item.id} item={item} level={level} />
        ) : (
          <TreeLeaf key={item.id} item={item} level={level} />
        ),
      )}
    </AccordionPrimitive.Root>
  );
}

function TreeBranch({ item, level }: { item: TreeDataItem; level: number }) {
  const { expandedIds, selectedId, onSelect, defaultNodeIcon, renderItem } =
    useTreeContext();

  const isOpen = expandedIds.includes(item.id);
  const isSelected = selectedId === item.id;

  return (
    <AccordionPrimitive.Item
      data-slot="tree-branch"
      role="presentation"
      value={item.id}
      className="border-none"
    >
      <AccordionPrimitive.Header asChild>
        <div
          role="treeitem"
          aria-level={level}
          aria-expanded={isOpen}
          aria-selected={selectedId == null ? undefined : isSelected}
          className={cn(
            treeRowVariants(),
            isSelected && selectedTreeRowVariants(),
            item.className,
          )}
        >
          <AccordionPrimitive.Trigger
            data-slot="tree-branch-trigger"
            disabled={item.disabled}
            onClick={() => onSelect(item)}
            className="flex min-w-0 flex-1 items-center gap-2 self-stretch pl-2 text-left outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg:first-child]:rotate-90"
          >
            <ChevronRight className="text-muted-foreground size-4 shrink-0 transition-transform duration-200" />
            <TreeItemIcon
              item={item}
              isOpen={isOpen}
              fallback={defaultNodeIcon}
            />
            {renderItem ? (
              renderItem({
                item,
                level,
                isLeaf: false,
                isSelected,
                isOpen,
                hasChildren: true,
              })
            ) : (
              <span className="text-muted-foreground truncate">
                {item.name}
              </span>
            )}
          </AccordionPrimitive.Trigger>
          {item.badge ? (
            <div className="shrink-0 pl-2">{item.badge}</div>
          ) : null}
          <TreeItemActions>{item.actions}</TreeItemActions>
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        role="presentation"
        className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      >
        <div className="border-border/70 ml-4 border-l pl-1">
          <TreeLevel items={item.children ?? []} level={level + 1} />
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

function TreeLeaf({ item, level }: { item: TreeDataItem; level: number }) {
  const { selectedId, onSelect, defaultLeafIcon, renderItem } =
    useTreeContext();

  const isSelected = selectedId === item.id;

  return (
    <div
      data-slot="tree-leaf"
      role="treeitem"
      aria-level={level}
      aria-selected={selectedId == null ? undefined : isSelected}
      className={cn(
        treeRowVariants(),
        isSelected && selectedTreeRowVariants(),
        item.className,
      )}
    >
      <button
        type="button"
        disabled={item.disabled}
        onClick={() => onSelect(item)}
        className="flex min-w-0 flex-1 items-center gap-2 self-stretch pl-2 text-left outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        <Minus className="text-muted-foreground size-4 shrink-0" />
        <TreeItemIcon item={item} isOpen={false} fallback={defaultLeafIcon} />
        {renderItem ? (
          renderItem({
            item,
            level,
            isLeaf: true,
            isSelected,
            isOpen: false,
            hasChildren: false,
          })
        ) : (
          <span className="truncate">{item.name}</span>
        )}
      </button>
      {item.badge ? <div className="shrink-0 pl-2">{item.badge}</div> : null}
      <TreeItemActions>{item.actions}</TreeItemActions>
    </div>
  );
}

function TreeItemIcon({
  item,
  isOpen,
  fallback,
}: {
  item: TreeDataItem;
  isOpen: boolean;
  fallback?: TreeIconComponent;
}) {
  const Icon = (isOpen ? item.openIcon : undefined) ?? item.icon ?? fallback;
  if (!Icon) return null;
  return <Icon className="text-muted-foreground size-4 shrink-0" />;
}

function TreeItemActions({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div
      data-slot="tree-actions"
      className="flex shrink-0 items-center gap-1 transition-opacity focus-within:opacity-100 md:opacity-0 md:group-hover/tree-row:opacity-100"
    >
      {children}
    </div>
  );
}

export { TreeView };
