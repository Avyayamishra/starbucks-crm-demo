"use client";

import { Zap, ArrowRight, Database, Brain, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { segments, segmentLabels } from "@/lib/data";
import { useCrmStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const DOT: Record<string, string> = {
  vip: "🟢",
  loyal: "🟢",
  occasional: "🟡",
  new: "🟡",
  "at-risk": "🔴",
};

export function CrmActionsView() {
  const setView = useCrmStore((s) => s.setView);
  const setSegmentFilter = useCrmStore((s) => s.setSegmentFilter);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Recommended CRM Actions"
        subtitle="CRM is not just collecting data — it is converting DATA into INSIGHT and INSIGHT into ACTION."
        icon={Zap}
        demo
      />

      {/* Big DATA → INSIGHT → ACTION banner */}
      <Card className="dot-grid relative overflow-hidden py-0">
        <div className="relative z-10 grid gap-4 p-6 sm:grid-cols-3 md:p-8">
          <Banner icon={Database} label="DATA" desc="Customer interactions, purchases, timing, rewards activity." />
          <Banner icon={Brain} label="INSIGHT" desc="Patterns, segments, preferences and risk signals." />
          <Banner icon={Target} label="ACTION" desc="A specific, personalized CRM move for each segment." highlight />
        </div>
      </Card>

      {/* Action cards */}
      <div className="space-y-3">
        <SectionHeading title="Action Center" subtitle="One recommended action per segment." icon={Target} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((s) => (
            <Card key={s.id} className="gap-0 py-5">
              <div className="flex items-start justify-between px-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{DOT[s.id]}</span>
                  <div>
                    <div className="font-semibold leading-tight">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{segmentLabels[s.id]}</div>
                  </div>
                </div>
                <Badge variant="secondary" className="tabular-nums">{s.count.toLocaleString("en-IN")}</Badge>
              </div>

              <div className="mt-4 px-5">
                <div className="rounded-xl bg-secondary/40 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-primary">Recommended action</div>
                  <p className="mt-1 text-sm leading-relaxed">{s.crmAction}</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 px-5 text-center">
                <Mini label="Avg spend" value={`₹${s.avgSpend}`} />
                <Mini label="Avg visits" value={`${s.avgVisits}/mo`} />
                <Mini label="Engagement" value={s.engagement} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border px-5 pt-3">
                <span className="text-xs text-muted-foreground">
                  Expected lift: <span className="font-medium text-foreground">+{s.engagement === "Low" ? 18 : s.engagement === "Medium" ? 9 : 4}%</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setSegmentFilter(s.id); setView("customers"); }}
                >
                  View these customers <ArrowRight className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20 py-4">
        <CardContent className="flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            <span className="font-medium">Remember:</span> the value of CRM is not the dashboard. It is the action the dashboard triggers.
          </p>
          <Button size="sm" onClick={() => setView("presentation")}>
            <Zap className="size-4" /> See it in Presentation Mode
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Banner({
  icon: Icon,
  label,
  desc,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all",
        highlight
          ? "border-primary/30 bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background/70"
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("size-5", highlight ? "" : "text-primary")} />
        <span className="text-sm font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className={cn("mt-1 text-xs leading-relaxed", highlight ? "text-primary-foreground/90" : "text-muted-foreground")}>
        {desc}
      </p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/40 px-2 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
