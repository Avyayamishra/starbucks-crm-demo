"use client";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Repeat,
  IndianRupee,
  Star,
  Activity,
  Sparkles,
  TrendingUp,
  Smartphone,
  Wallet,
  CheckCircle2,
  Heart,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CustomerAvatar, LoyaltyBadge } from "@/components/crm/customer-avatar";
import { DemoBadge } from "@/components/crm/demo-badge";
import { SectionHeading } from "@/components/crm/section-heading";
import {
  getCustomer,
  getCustomerOrders,
  formatINR,
  segmentLabels,
  segmentDotColor,
  NEXT_REWARD,
} from "@/lib/data";
import { autoPersonalize } from "@/lib/personalization";
import { useCrmStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Customer360View() {
  const id = useCrmStore((s) => s.selectedCustomerId);
  const setView = useCrmStore((s) => s.setView);
  const setSegmentFilter = useCrmStore((s) => s.setSegmentFilter);
  const aaravStars = useCrmStore((s) => s.aaravStars);
  const customer = getCustomer(id);

  if (!customer) {
    return (
      <Card className="py-12">
        <CardContent className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">Customer not found.</p>
          <Button onClick={() => setView("customers")}>Back to customers</Button>
        </CardContent>
      </Card>
    );
  }

  const orders = getCustomerOrders(customer.id);
  const stars = customer.id === "C-1001" ? aaravStars : customer.stars;
  const pct = Math.min(100, (stars / NEXT_REWARD) * 100);
  const remaining = Math.max(0, NEXT_REWARD - stars);
  const reco = autoPersonalize({ ...customer, stars });

  const timeline = [
    { label: "Joined", detail: customer.joinedDate, done: true },
    { label: "First Purchase", detail: customer.favoriteProduct, done: true },
    { label: "Frequent Visits", detail: `${customer.visitFrequency}/mo habit`, done: true },
    { label: "Gold Tier", detail: `${customer.loyaltyTier} reached`, done: customer.loyaltyTier !== "Green" },
    { label: "Personalized Offers", detail: "Recommendation engine active", done: true },
    { label: "Recent Purchase", detail: customer.lastVisit, done: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setView("customers")}>
          <ArrowLeft className="size-4" /> Customers
        </Button>
        <Separator orientation="vertical" className="hidden h-5 sm:block" />
        <SectionHeading title="Customer 360°" subtitle="Identity · Behavior · Transactions · Loyalty · Engagement · Preferences · Recommendation" icon={Sparkles} className="flex-1" />
      </div>

      {/* Hero profile card */}
      <Card className="dot-grid relative overflow-hidden py-0">
        <div className="relative z-10 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-center gap-4">
            <CustomerAvatar customer={customer} size="lg" />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">{customer.name}</h1>
                <LoyaltyBadge tier={customer.loyaltyTier} />
                <span className={cn("inline-flex items-center gap-1 text-xs", segmentDotColor[customer.segment])}>
                  <span className={cn("size-2 rounded-full", segmentDotColor[customer.segment])} />
                  <span className="text-muted-foreground">{segmentLabels[customer.segment]}</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" /> {customer.location}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" /> Age {customer.age}</span>
                <span className="inline-flex items-center gap-1"><Smartphone className="size-3.5" /> {customer.channel}</span>
                <span className="inline-flex items-center gap-1"><Wallet className="size-3.5" /> {customer.paymentPreference}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" />
              <span className="text-3xl font-semibold tabular-nums">{stars}</span>
              <span className="text-sm text-muted-foreground">Stars</span>
            </div>
            <div className="w-full md:w-56">
              <Progress value={pct} className="h-2 bg-primary/15" />
              <div className="mt-1 text-xs text-muted-foreground">
                {remaining} Stars to next reward · {NEXT_REWARD} threshold
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 360 facets */}
      <div className="grid gap-4 lg:grid-cols-3">
        <FacetCard icon={Activity} title="Behavioral Data">
          <Facet label="Visit frequency" value={`${customer.visitFrequency} visits / month`} />
          <Facet label="Preferred time" value={customer.preferredTime} />
          <Facet label="Channel" value={customer.channel} />
          <Facet label="Last visit" value={customer.lastVisit} />
        </FacetCard>

        <FacetCard icon={IndianRupee} title="Transactional Data">
          <Facet label="Average order value" value={formatINR(customer.averageOrderValue)} />
          <Facet label="Customer lifetime value" value={formatINR(customer.customerLifetimeValue)} />
          <Facet label="Payment preference" value={customer.paymentPreference} />
          <Facet label="Total orders (demo)" value={`${orders.length}+`} />
        </FacetCard>

        <FacetCard icon={Star} title="Loyalty Data">
          <Facet label="Tier" value={customer.loyaltyTier} />
          <Facet label="Stars" value={`${stars} ⭐`} />
          <Facet label="Next reward" value={`${remaining} Stars away`} />
          <Facet label="Member since" value={customer.joinedDate} />
        </FacetCard>

        <FacetCard icon={Zap} title="Engagement">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Engagement score</span>
              <span className="font-semibold tabular-nums">{customer.engagementScore}/100</span>
            </div>
            <Progress value={customer.engagementScore} className="h-2 bg-primary/15" />
          </div>
          <Facet label="App activity" value="High — daily check-ins" />
          <Facet label="Offer interaction" value="62% open · 38% redeem" />
        </FacetCard>

        <FacetCard icon={Heart} title="Preferences">
          <Facet label="Favorite category" value={customer.favoriteCategory} />
          <Facet label="Favorite product" value={customer.favoriteProduct} />
          <Facet label="Preferred time" value={customer.preferredTime} />
          <Facet label="Typical order" value="Mobile App · Evening" />
        </FacetCard>

        <FacetCard icon={Sparkles} title="CRM Recommendation" tone="primary">
          <p className="text-sm font-medium">{reco.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{reco.description}</p>
          <div className="mt-3 rounded-lg bg-background/60 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-primary">Why this?</div>
            <p className="mt-1 text-xs leading-relaxed">{reco.reason}</p>
          </div>
          <Button size="sm" className="mt-3 w-full" onClick={() => setView("offers")}>
            <Sparkles className="size-4" /> Create personalized offer
          </Button>
        </FacetCard>
      </div>

      {/* Purchase history + timeline */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="py-5 lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingBag className="size-4 text-primary" /> Purchase History
              <DemoBadge />
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => setView("customer-view")}>
              See customer experience
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto scroll-area-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-6 py-2 font-medium">Product</th>
                    <th className="px-6 py-2 font-medium">Category</th>
                    <th className="px-6 py-2 font-medium text-right">Amount</th>
                    <th className="px-6 py-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((o) => (
                      <tr key={o.id} className="border-t border-border hover:bg-accent/40">
                        <td className="px-6 py-3 font-medium">{o.product}</td>
                        <td className="px-6 py-3">
                          <Badge variant="secondary" className="text-[10px]">{o.category}</Badge>
                        </td>
                        <td className="px-6 py-3 text-right tabular-nums">{formatINR(o.amount)}</td>
                        <td className="px-6 py-3 text-muted-foreground">{o.date} · {o.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 text-center text-sm text-muted-foreground">
                        No demo orders recorded for this customer yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="py-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4 text-primary" /> CRM Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-4 pl-5">
              <span className="absolute left-[6px] top-1 bottom-1 w-px bg-border" aria-hidden />
              {timeline.map((t) => (
                <li key={t.label} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[14px] top-1 size-3 rounded-full ring-4 ring-background",
                      t.done ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  />
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.detail}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Engagement signals row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SignalCard icon={Repeat} label="Repeat purchase rate" value="68%" hint="Above segment average" />
        <SignalCard icon={Clock} label="Habitual visit time" value={customer.preferredTime} hint="Strongest signal" />
        <SignalCard icon={IndianRupee} label="Lifetime value" value={formatINR(customer.customerLifetimeValue)} hint="Projected 12-month" />
        <SignalCard icon={CheckCircle2} label="Re-engagement window" value={customer.lastVisitDays >= 7 ? "Open now" : "Healthy"} hint={`${customer.lastVisit} since last visit`} tone={customer.lastVisitDays >= 7 ? "rose" : "green"} />
      </div>

      {/* Quick actions */}
      <Card className="bg-primary/5 py-4">
        <CardContent className="flex flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            <span className="font-medium">Next CRM action:</span> Deliver a personalized re-engagement offer to {customer.name}.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setSegmentFilter(customer.segment); setView("customers"); }}>
              See similar customers
            </Button>
            <Button size="sm" onClick={() => setView("offers")}>
              <Sparkles className="size-4" /> Generate offer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FacetCard({
  icon: Icon,
  title,
  children,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  tone?: "default" | "primary";
}) {
  return (
    <Card className={cn("py-5", tone === "primary" && "border-primary/30 bg-primary/5")}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon className="size-4 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">{children}</CardContent>
    </Card>
  );
}

function Facet({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function SignalCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "green" | "rose";
}) {
  const tones = {
    default: "text-primary bg-primary/8",
    green: "text-[oklch(0.4_0.11_158)] bg-[oklch(0.46_0.11_158/0.1)]",
    rose: "text-[oklch(0.5_0.18_25)] bg-[oklch(0.62_0.18_25/0.12)]",
  };
  return (
    <Card className="py-4">
      <CardContent className="flex items-center gap-3 px-4">
        <div className={cn("flex size-10 items-center justify-center rounded-xl", tones[tone])}>
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-base font-semibold">{value}</div>
          <div className="text-[11px] text-muted-foreground">{hint}</div>
        </div>
      </CardContent>
    </Card>
  );
}
