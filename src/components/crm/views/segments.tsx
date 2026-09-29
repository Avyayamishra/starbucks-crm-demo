"use client";

import { Target, Lightbulb, ArrowRight, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { SegmentDonut } from "@/components/crm/charts/segment-donut";
import { SegmentCard } from "@/components/crm/segment-card";
import { segments } from "@/lib/data";
import { useCrmStore } from "@/lib/store";

export function SegmentsView() {
  const setView = useCrmStore((s) => s.setView);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Customer Segmentation"
        subtitle="Starbucks groups its members into behaviorally meaningful segments — each receives a distinct CRM response."
        icon={Target}
        demo
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="py-5 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              Segment Distribution
              <DemoBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SegmentDonut />
          </CardContent>
        </Card>

        <Card className="py-5 lg:col-span-2 bg-[oklch(0.46_0.11_158/0.05)] border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="size-4 text-primary" /> Insight
              <Badge variant="outline" className="text-[10px]">Demo Insight</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              <span className="font-semibold text-primary">High-value customers</span> represent
              a smaller portion of the base (~7%) but generate a disproportionately higher share
              of purchase activity and revenue.
            </p>
            <p>
              Meanwhile, the largest single block — <span className="font-semibold">Occasional
              Customers</span> — holds the biggest <em>conversion upside</em> if visit frequency
              can be nudged upward.
            </p>
            <p>
              <span className="font-semibold text-[oklch(0.5_0.18_25)]">At-Risk customers
              (1,240)</span> are the clearest CRM opportunity today: re-engagement tied to their
              favorite product has the highest expected lift.
            </p>
            <div className="rounded-lg bg-background/70 p-3 text-xs">
              <span className="font-medium">CRM principle:</span> Segmentation is the bridge
              between raw data and personalized action.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segment detail cards */}
      <div className="space-y-3">
        <SectionHeading
          title="Segments & CRM Actions"
          subtitle="Each segment carries a recommended CRM response — DATA → INSIGHT → ACTION."
          icon={Layers}
          action={
            <Badge variant="secondary" className="text-xs">
              {segments.reduce((a, s) => a + s.count, 0).toLocaleString("en-IN")} demo customers
            </Badge>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((s) => (
            <SegmentCard key={s.id} segment={s} onClick={() => setView("customers")} />
          ))}
        </div>
      </div>

      <Card className="bg-primary/5 py-4">
        <CardContent className="flex items-center justify-between gap-3 px-5">
          <p className="text-sm">
            <span className="font-medium">Demo story:</span> Aarav Sharma sits in the{" "}
            <span className="font-semibold text-primary">Loyal Regulars</span> segment — high engagement, habitual evening Frappuccino.
          </p>
          <button
            onClick={() => setView("offers")}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
          >
            Generate his offer <ArrowRight className="size-4" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
