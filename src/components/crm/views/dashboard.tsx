"use client";

import {
  Users,
  Activity,
  Star,
  IndianRupee,
  Repeat,
  AlertTriangle,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/crm/kpi-card";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { CustomerAvatar } from "@/components/crm/customer-avatar";
import { SegmentDonut } from "@/components/crm/charts/segment-donut";
import { EngagementArea } from "@/components/crm/charts/engagement-area";
import { SegmentCard } from "@/components/crm/segment-card";
import {
  kpis,
  segments,
  orders,
  getCustomer,
  formatINR,
  segmentDotColor,
  segmentLabels,
} from "@/lib/data";
import { useCrmStore } from "@/lib/store";

export function DashboardView() {
  const setView = useCrmStore((s) => s.setView);
  const selectCustomer = useCrmStore((s) => s.selectCustomer);
  const recent = orders.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Hero greeting */}
      <div className="dot-grid relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <DemoBadge />
              <span className="text-xs text-muted-foreground">CRM Manager Workspace</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Good afternoon, CRM Manager
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Turn customer data into meaningful relationships. Today's signals show a healthy
              base — and a clear re-engagement opportunity for At-Risk customers.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setView("crm-actions")}>
              View CRM Actions <ArrowRight className="size-4" />
            </Button>
            <Button onClick={() => setView("presentation")}>
              <Sparkles className="size-4" /> Presentation Mode
            </Button>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Total Customers" value={kpis.totalCustomers.toLocaleString("en-IN")} icon={Users} tone="green" delta={{ value: "+3.4% MoM", positive: true }} />
        <KpiCard label="Active Customers" value={kpis.activeCustomers.toLocaleString("en-IN")} icon={Activity} tone="green" delta={{ value: "+2.1% MoM", positive: true }} />
        <KpiCard label="Loyalty Members" value={kpis.loyaltyMembers.toLocaleString("en-IN")} icon={Star} tone="gold" delta={{ value: "+5.0% MoM", positive: true }} />
        <KpiCard label="Avg Order Value" value={formatINR(kpis.averageOrderValue)} icon={IndianRupee} tone="brown" delta={{ value: "+1.8% MoM", positive: true }} />
        <KpiCard label="Repeat Purchase Rate" value={`${kpis.repeatPurchaseRate}%`} icon={Repeat} tone="default" delta={{ value: "+1pt MoM", positive: true }} />
        <KpiCard label="At-Risk Customers" value={kpis.atRiskCustomers.toLocaleString("en-IN")} icon={AlertTriangle} tone="rose" delta={{ value: "Needs attention", positive: false }} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 py-5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              Customer Engagement Trend
              <DemoBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EngagementArea />
          </CardContent>
        </Card>
        <Card className="py-5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              Customer Segments
              <DemoBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SegmentDonut />
          </CardContent>
        </Card>
      </div>

      {/* CRM action cards */}
      <div className="space-y-3">
        <SectionHeading
          title="Recommended CRM Actions"
          subtitle="DATA → INSIGHT → ACTION. Each segment receives a tailored CRM response."
          icon={Sparkles}
          action={
            <Button variant="ghost" size="sm" onClick={() => setView("crm-actions")}>
              See all <ArrowRight className="size-4" />
            </Button>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.slice(0, 3).map((s) => (
            <SegmentCard key={s.id} segment={s} />
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <Card className="py-5">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            Recent Customer Activity
            <DemoBadge />
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setView("customers")}>
            All customers <ArrowRight className="size-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto scroll-area-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-2 font-medium">Customer</th>
                  <th className="px-6 py-2 font-medium">Segment</th>
                  <th className="px-6 py-2 font-medium">Product</th>
                  <th className="px-6 py-2 font-medium text-right">Amount</th>
                  <th className="px-6 py-2 font-medium">When</th>
                  <th className="px-6 py-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => {
                  const c = getCustomer(o.customerId);
                  if (!c) return null;
                  return (
                    <tr key={o.id} className="border-t border-border hover:bg-accent/40">
                      <td className="px-6 py-3">
                        <button
                          className="flex items-center gap-3 text-left"
                          onClick={() => {
                            selectCustomer(c.id);
                            setView("customer-360");
                          }}
                        >
                          <CustomerAvatar customer={c} size="sm" />
                          <div className="leading-tight">
                            <div className="font-medium">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.location}</div>
                          </div>
                        </button>
                      </td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <span className={`size-2 rounded-full ${segmentDotColor[c.segment]}`} />
                          {segmentLabels[c.segment]}
                        </span>
                      </td>
                      <td className="px-6 py-3">{o.product}</td>
                      <td className="px-6 py-3 text-right tabular-nums font-medium">{formatINR(o.amount)}</td>
                      <td className="px-6 py-3 text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" /> {o.date} · {o.time}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Badge variant="secondary" className="text-[10px]">{c.loyaltyTier}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
