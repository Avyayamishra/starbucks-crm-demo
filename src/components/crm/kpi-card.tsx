import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  icon: Icon,
  delta,
  tone = "default",
  footnote,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: { value: string; positive?: boolean };
  tone?: "default" | "green" | "gold" | "brown" | "rose";
  footnote?: string;
}) {
  const tones: Record<string, string> = {
    default: "bg-primary/8 text-primary",
    green: "bg-[oklch(0.46_0.11_158/0.1)] text-[oklch(0.4_0.11_158)]",
    gold: "bg-[oklch(0.78_0.12_80/0.15)] text-[oklch(0.5_0.1_80)]",
    brown: "bg-[oklch(0.5_0.07_50/0.12)] text-[oklch(0.4_0.07_50)]",
    rose: "bg-[oklch(0.62_0.18_25/0.12)] text-[oklch(0.5_0.18_25)]",
  };
  return (
    <Card className="relative gap-0 overflow-hidden py-5">
      <div className="flex items-start justify-between px-5">
        <div className="space-y-1">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
          <div className="text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </div>
        </div>
        <div className={cn("flex size-10 items-center justify-center rounded-xl", tones[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 px-5">
        {delta && (
          <span
            className={cn(
              "text-xs font-medium",
              delta.positive ? "text-[oklch(0.46_0.11_158)]" : "text-[oklch(0.62_0.18_25)]"
            )}
          >
            {delta.positive ? "▲" : "▼"} {delta.value}
          </span>
        )}
        {footnote && <span className="text-[11px] text-muted-foreground">{footnote}</span>}
      </div>
    </Card>
  );
}
