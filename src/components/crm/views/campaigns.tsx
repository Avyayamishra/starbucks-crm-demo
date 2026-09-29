"use client";

import { Megaphone, Target, Mail, Ticket, Repeat, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { campaigns, segmentLabels, formatINR } from "@/lib/data";
import { useCrmStore } from "@/lib/store";

export function CampaignsView() {
  const setView = useCrmStore((s) => s.setView);

  const totals = campaigns.reduce(
    (a, c) => ({
      sent: a.sent + c.sent,
      opened: a.opened + c.opened,
      redeemed: a.redeemed + c.redeemed,
    }),
    { sent: 0, opened: 0, redeemed: 0 }
  );

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Campaigns"
        subtitle="Targeted, segment-aware campaigns. Each campaign maps a segment → an objective → measurable redemption."
        icon={Megaphone}
        demo
      />

      {/* Campaign performance summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={Megaphone} label="Total campaigns" value={`${campaigns.length}`} hint="Active in last 30 days" />
        <SummaryCard icon={Mail} label="Total sent" value={totals.sent.toLocaleString("en-IN")} hint="Across all segments" />
        <SummaryCard icon={Ticket} label="Total redeemed" value={totals.redeemed.toLocaleString("en-IN")} hint={`${Math.round((totals.redeemed / totals.sent) * 100)}% redemption`} />
        <SummaryCard icon={Repeat} label="Avg repeat rate" value={`${Math.round(campaigns.reduce((a, c) => a + c.repeatPurchaseRate, 0) / campaigns.length)}%`} hint="Post-campaign" />
      </div>

      <div className="space-y-3">
        <SectionHeading title="Campaign Performance" icon={Target} demo />
        <div className="grid gap-4 md:grid-cols-2">
          {campaigns.map((c) => {
            const openRate = Math.round((c.opened / c.sent) * 100);
            const redeemRate = Math.round((c.redeemed / c.sent) * 100);
            return (
              <Card key={c.id} className="py-5">
                <CardHeader className="pb-3 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{c.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{c.tagline}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {segmentLabels[c.targetSegment]}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Mini label="Target segment" value={segmentLabels[c.targetSegment]} />
                    <Mini label="Objective" value={c.objective} />
                    <Mini label="Sent" value={c.sent.toLocaleString("en-IN")} />
                    <Mini label="Redeemed" value={c.redeemed.toLocaleString("en-IN")} />
                  </div>

                  <Bar label="Open rate" value={openRate} color="bg-[oklch(0.62_0.1_180)]" />
                  <Bar label="Redemption rate" value={redeemRate} color="bg-primary" />
                  <Bar label="Repeat purchase rate" value={c.repeatPurchaseRate} color="bg-[oklch(0.78_0.12_80)]" />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      Est. uplift: <span className="font-medium text-foreground">{formatINR(c.redeemed * 320)}</span>
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setView("analytics")}>
                      Analyze <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="py-5">
      <CardContent className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="text-xl font-semibold tabular-nums">{value}</div>
          <div className="text-[11px] text-muted-foreground">{hint}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-medium truncate" title={value}>{value}</div>
    </div>
  );
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}%</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
