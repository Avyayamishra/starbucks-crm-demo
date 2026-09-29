"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target } from "lucide-react";
import type { Segment } from "@/lib/data";
import { useCrmStore } from "@/lib/store";

export function SegmentCard({ segment, onClick }: { segment: Segment; onClick?: () => void }) {
  const setView = useCrmStore((s) => s.setView);
  const setSegmentFilter = useCrmStore((s) => s.setSegmentFilter);

  const engagementTone: Record<Segment["engagement"], string> = {
    High: "bg-[oklch(0.46_0.11_158/0.12)] text-[oklch(0.4_0.11_158)]",
    Medium: "bg-[oklch(0.78_0.12_80/0.18)] text-[oklch(0.5_0.1_80)]",
    Low: "bg-[oklch(0.62_0.18_25/0.14)] text-[oklch(0.5_0.18_25)]",
  };

  const go = () => {
    if (onClick) {
      onClick();
      return;
    }
    setSegmentFilter(segment.id);
    setView("customers");
  };

  return (
    <Card className="gap-0 py-5">
      <div className="flex items-start justify-between px-5">
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: segment.accent }}
          >
            <Target className="size-5" />
          </div>
          <div>
            <div className="font-semibold leading-tight">{segment.label}</div>
            <div className="text-xs text-muted-foreground">{segment.description}</div>
          </div>
        </div>
        <Badge variant="outline" className={engagementTone[segment.engagement]}>
          {segment.engagement}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 px-5 text-center">
        <Stat label="Customers" value={segment.count.toLocaleString("en-IN")} />
        <Stat label="Avg Spend" value={`₹${segment.avgSpend}`} />
        <Stat label="Avg Visits" value={`${segment.avgVisits}/mo`} />
      </div>

      <div className="mt-4 px-5">
        <div className="rounded-lg bg-primary/5 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-primary">
            Recommended CRM Action
          </div>
          <p className="mt-1 text-sm leading-relaxed">{segment.crmAction}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border px-5 pt-3">
        <span className="text-xs text-muted-foreground">Click to view customers</span>
        <button
          onClick={go}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:gap-2 transition-all"
        >
          Explore <ArrowRight className="size-3.5" />
        </button>
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/50 px-2 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold tabular-nums">{value}</div>
    </div>
  );
}
