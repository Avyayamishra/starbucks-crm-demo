"use client";

import {
  LayoutDashboard,
  Users,
  Target,
  Gift,
  Star,
  Megaphone,
  BarChart3,
  Zap,
  Smartphone,
  Presentation,
  Coffee,
} from "lucide-react";
import { useCrmStore, type CrmView } from "@/lib/store";
import { cn } from "@/lib/utils";

interface NavItem {
  id: CrmView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "manager" | "experience" | "present";
}

const NAV: NavItem[] = [
  { id: "dashboard", label: "CRM Dashboard", icon: LayoutDashboard, group: "manager" },
  { id: "customers", label: "Customers", icon: Users, group: "manager" },
  { id: "segments", label: "Segments", icon: Target, group: "manager" },
  { id: "offers", label: "Offers", icon: Gift, group: "manager" },
  { id: "loyalty", label: "Loyalty", icon: Star, group: "manager" },
  { id: "campaigns", label: "Campaigns", icon: Megaphone, group: "manager" },
  { id: "analytics", label: "Analytics", icon: BarChart3, group: "manager" },
  { id: "crm-actions", label: "CRM Actions", icon: Zap, group: "manager" },
  { id: "customer-view", label: "Customer View", icon: Smartphone, group: "experience" },
  { id: "presentation", label: "Presentation Mode", icon: Presentation, group: "present" },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const view = useCrmStore((s) => s.view);
  const setView = useCrmStore((s) => s.setView);

  const handle = (id: CrmView) => {
    setView(id);
    onNavigate?.();
  };

  const managerItems = NAV.filter((n) => n.group === "manager");
  const experienceItems = NAV.filter((n) => n.group === "experience");
  const presentItems = NAV.filter((n) => n.group === "present");

  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Coffee className="size-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Starbucks CRM</div>
          <div className="text-[11px] text-muted-foreground">Brewing Loyalty · MVP</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scroll-area-thin px-3 py-4 space-y-6">
        <NavGroup label="Manager Workspace" items={managerItems} view={view} onPick={handle} />
        <NavGroup label="Customer Experience" items={experienceItems} view={view} onPick={handle} />
        <NavGroup label="Present" items={presentItems} view={view} onPick={handle} />
      </nav>

      <div className="border-t border-sidebar-border px-5 py-4">
        <div className="rounded-xl bg-primary/5 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            DATA → INSIGHT → ACTION
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Every screen here converts customer data into a CRM decision.
          </p>
        </div>
      </div>
    </aside>
  );
}

function NavGroup({
  label,
  items,
  view,
  onPick,
}: {
  label: string;
  items: NavItem[];
  view: CrmView;
  onPick: (id: CrmView) => void;
}) {
  return (
    <div>
      <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
        {label}
      </div>
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onPick(item.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                  )}
                />
                <span className="truncate font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
