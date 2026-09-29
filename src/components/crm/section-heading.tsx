import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/crm/demo-badge";
import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  icon: Icon,
  demo,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  demo?: boolean;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-4 text-primary" />}
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
          {demo && <DemoBadge />}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
