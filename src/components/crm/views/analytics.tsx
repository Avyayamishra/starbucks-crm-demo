"use client";

import { BarChart3, TrendingUp, PieChart as PieIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { RevenueLine } from "@/components/crm/charts/revenue-line";
import { CategoryDonut } from "@/components/crm/charts/category-donut";
import { VisitTimeBar } from "@/components/crm/charts/visit-time-bar";
import { SegmentDonut } from "@/components/crm/charts/segment-donut";
import { KpiCard } from "@/components/crm/kpi-card";
import { kpis, formatINR } from "@/lib/data";
import { IndianRupee, Users, Activity, Star } from "lucide-react";

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Analytics Dashboard"
        subtitle="Management KPIs and behavioral trends. Every number here is simulated demo data."
        icon={BarChart3}
        demo
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Monthly Revenue" value={formatINR(kpis.monthlyRevenue)} icon={IndianRupee} tone="brown" delta={{ value: "+2.3% MoM", positive: true }} />
        <KpiCard label="Active Customers" value={kpis.activeCustomers.toLocaleString("en-IN")} icon={Users} tone="green" delta={{ value: "+2.1% MoM", positive: true }} />
        <KpiCard label="Avg Engagement" value={`${kpis.avgEngagement}%`} icon={Activity} tone="default" delta={{ value: "+1pt MoM", positive: true }} />
        <KpiCard label="Loyalty Members" value={kpis.loyaltyMembers.toLocaleString("en-IN")} icon={Star} tone="gold" delta={{ value: "+5.0% MoM", positive: true }} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="py-5 lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4 text-primary" /> Revenue & Customer Growth
              <DemoBadge />
            </CardTitle>
            <Badge variant="secondary" className="text-[10px]">6 months</Badge>
          </CardHeader>
          <CardContent>
            <RevenueLine />
            <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[oklch(0.5_0.07_50)]" /> Revenue</span>
              <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-primary" /> Customers</span>
            </div>
          </CardContent>
        </Card>

        <Card className="py-5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <PieIcon className="size-4 text-primary" /> Category Share
              <DemoBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryDonut />
          </CardContent>
        </Card>

        <Card className="py-5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="size-4 text-primary" /> Visit Time Distribution
              <DemoBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VisitTimeBar />
          </CardContent>
        </Card>

        <Card className="py-5 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="size-4 text-primary" /> Segment Distribution
              <DemoBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SegmentDonut />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20 py-4">
        <CardContent className="flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            <span className="font-medium">Insight:</span> Engagement and revenue are rising together — a sign that
            personalized re-engagement is converting At-Risk customers into Loyal Regulars.
          </p>
          <Badge className="self-start sm:self-auto"><DemoBadge className="mr-1 border-0 p-0 text-[10px]" /> Simulated insight</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
