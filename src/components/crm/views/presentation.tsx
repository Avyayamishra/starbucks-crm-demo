"use client";

import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Database,
  Users,
  Target,
  Sparkles,
  Star,
  Megaphone,
  Smartphone,
  RefreshCw,
  Brain,
  Bell,
  Heart,
  Coffee,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DemoBadge } from "@/components/crm/demo-badge";
import { CustomerAvatar, LoyaltyBadge } from "@/components/crm/customer-avatar";
import { SegmentDonut } from "@/components/crm/charts/segment-donut";
import {
  AARAV,
  segments,
  segmentLabels,
  formatINR,
  kpis,
  journeyStages,
  crmLoop,
  getCustomerOrders,
  NEXT_REWARD,
} from "@/lib/data";
import { autoPersonalize } from "@/lib/personalization";
import { useCrmStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const LOOP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Database, Brain, Users, Sparkles, Bell, Heart, RefreshCw,
};

const STEPS = [
  { id: 1, label: "Customer Data", icon: Database },
  { id: 2, label: "Customer 360°", icon: Users },
  { id: 3, label: "Segmentation", icon: Target },
  { id: 4, label: "Personalization", icon: Sparkles },
  { id: 5, label: "Loyalty", icon: Star },
  { id: 6, label: "Campaign", icon: Megaphone },
  { id: 7, label: "Customer Experience", icon: Smartphone },
  { id: 8, label: "CRM Impact", icon: RefreshCw },
];

export function PresentationView() {
  const step = useCrmStore((s) => s.presentationStep);
  const setStep = useCrmStore((s) => s.setPresentationStep);
  const setView = useCrmStore((s) => s.setView);
  const stars = useCrmStore((s) => s.aaravStars);

  const total = STEPS.length;
  const goNext = () => setStep(Math.min(total - 1, step + 1));
  const goPrev = () => setStep(Math.max(0, step - 1));
  const exit = () => setView("dashboard");

  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[oklch(0.97_0.012_95)]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Coffee className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Presentation Mode</div>
            <div className="text-[11px] text-muted-foreground">Brewing Loyalty · The Starbucks Secret</div>
          </div>
        </div>
        <div className="hidden items-center gap-1.5 md:flex">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : done
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground hover:bg-accent"
                )}
              >
                <Icon className="size-3.5" />
                <span className="hidden lg:inline">{String(s.id).padStart(2, "0")} · {s.label}</span>
                <span className="lg:hidden">{s.id}</span>
              </button>
            );
          })}
        </div>
        <Button variant="ghost" size="sm" onClick={exit}>
          <X className="size-4" /> Exit
        </Button>
      </header>

      {/* Progress */}
      <div className="px-4 pt-3 md:px-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {step + 1} of {total} — {current.label}</span>
          <span className="inline-flex items-center gap-1">
            <DemoBadge /> simulated data
          </span>
        </div>
        <Progress value={((step + 1) / total) * 100} className="mt-1.5 h-1.5 bg-primary/15" />
      </div>

      {/* Slide content */}
      <main className="flex-1 overflow-y-auto scroll-area-thin px-4 py-6 md:px-10">
        <div className="mx-auto max-w-6xl animate-fade-up">
          <Slide step={step} stars={stars} />
        </div>
      </main>

      {/* Controls */}
      <footer className="flex items-center justify-between border-t border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6">
        <Button variant="outline" onClick={goPrev} disabled={step === 0}>
          <ArrowLeft className="size-4" /> Previous
        </Button>
        <div className="text-center">
          <div className="text-sm font-semibold">{String(current.id).padStart(2, "0")} — {current.label}</div>
          <div className="text-[11px] text-muted-foreground">Use ← / → keys during your live demo</div>
        </div>
        {step === total - 1 ? (
          <Button onClick={exit}>
            <RefreshCw className="size-4" /> Finish
          </Button>
        ) : (
          <Button onClick={goNext}>
            Next <ArrowRight className="size-4" />
          </Button>
        )}
      </footer>
    </div>
  );
}

function Slide({ step, stars }: { step: number; stars: number }) {
  switch (step) {
    case 0:
      return <SlideCustomerData />;
    case 1:
      return <SlideCustomer360 stars={stars} />;
    case 2:
      return <SlideSegmentation />;
    case 3:
      return <SlidePersonalization stars={stars} />;
    case 4:
      return <SlideLoyalty stars={stars} />;
    case 5:
      return <SlideCampaign />;
    case 6:
      return <SlideCustomerExperience stars={stars} />;
    case 7:
      return <SlideCrmLoop />;
    default:
      return null;
  }
}

function SlideHeader({ no, title, subtitle }: { no: string; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Slide {no}</div>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-3xl text-base text-muted-foreground">{subtitle}</p>
    </div>
  );
}

// --- Slide 1: Customer Data ------------------------------------------------
function SlideCustomerData() {
  const dataPoints = [
    { icon: Coffee, label: "Purchases", desc: "Product, value, store, time" },
    { icon: RefreshCw, label: "Order frequency", desc: "Visits per week / month" },
    { icon: Heart, label: "Favorite products", desc: "Category & SKU affinity" },
    { icon: Bell, label: "Visit timing", desc: "Morning / evening patterns" },
    { icon: Target, label: "Average spending", desc: "AOV and lifetime value" },
    { icon: Star, label: "Rewards activity", desc: "Stars earned & redeemed" },
    { icon: Smartphone, label: "App interactions", desc: "Sessions & offer views" },
    { icon: Sparkles, label: "Offer responses", desc: "Open, redeem, ignore" },
  ];
  return (
    <div>
      <SlideHeader
        no="01"
        title="Customer Data"
        subtitle="Starbucks collects customer interaction data continuously — purchases, frequency, favorites, timing, rewards activity and offer responses. This data is the raw material of CRM."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dataPoints.map((d) => (
          <Card key={d.label} className="py-5">
            <CardContent className="flex flex-col items-start gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                <d.icon className="size-5" />
              </div>
              <div className="text-sm font-semibold">{d.label}</div>
              <div className="text-xs text-muted-foreground">{d.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm">
        <Database className="size-5 text-primary" />
        <span>
          <span className="font-semibold">Key idea:</span> Every interaction is recorded. Data is not the goal —
          relationships built from data are.
        </span>
      </div>
    </div>
  );
}

// --- Slide 2: Customer 360 -------------------------------------------------
function SlideCustomer360({ stars }: { stars: number }) {
  const orders = getCustomerOrders(AARAV.id).slice(0, 4);
  return (
    <div>
      <SlideHeader
        no="02"
        title="Customer 360°"
        subtitle="Aarav Sharma — our demo customer. The CRM unifies identity, behavior, transactions, loyalty, engagement and preferences into one view."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="dot-grid py-0 lg:col-span-1">
          <div className="flex flex-col gap-3 p-5">
            <CustomerAvatar customer={AARAV} size="lg" />
            <div>
              <div className="text-xl font-semibold">{AARAV.name}</div>
              <div className="text-sm text-muted-foreground">{AARAV.age} · {AARAV.location}</div>
            </div>
            <LoyaltyBadge tier={AARAV.loyaltyTier} />
            <div className="mt-2 flex items-center gap-2">
              <Star className="size-5 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" />
              <span className="text-2xl font-semibold">{stars}</span>
              <span className="text-xs text-muted-foreground">Stars</span>
            </div>
            <div className="text-xs text-muted-foreground">Favorite: {AARAV.favoriteProduct} · {AARAV.preferredTime}</div>
          </div>
        </Card>

        <Card className="py-5 lg:col-span-2">
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Stat label="Visit frequency" value={`${AARAV.visitFrequency} / month`} />
            <Stat label="Average order value" value={formatINR(AARAV.averageOrderValue)} />
            <Stat label="Lifetime value (est.)" value={formatINR(AARAV.customerLifetimeValue)} />
            <Stat label="Engagement score" value={`${AARAV.engagementScore}/100`} />
            <Stat label="Preferred time" value={AARAV.preferredTime} />
            <Stat label="Last visit" value={AARAV.lastVisit} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 py-5">
        <CardContent className="space-y-2">
          <div className="text-sm font-semibold">Recent purchase behavior</div>
          {orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between border-t border-border py-2 text-sm">
              <span>{o.product}</span>
              <span className="text-muted-foreground">{o.date} · {o.time}</span>
              <span className="font-semibold tabular-nums">{formatINR(o.amount)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm">
        <Users className="size-5 text-primary" />
        <span><span className="font-semibold">CRM principle:</span> A 360° view turns raw data into a person you can serve specifically.</span>
      </div>
    </div>
  );
}

// --- Slide 3: Segmentation -------------------------------------------------
function SlideSegmentation() {
  return (
    <div>
      <SlideHeader
        no="03"
        title="Segmentation"
        subtitle="Customers are grouped into behaviorally meaningful segments — each receiving a distinct CRM response."
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="py-5 lg:col-span-3">
          <CardContent>
            <SegmentDonut />
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-2">
          {segments.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <span className="size-3 rounded-full" style={{ backgroundColor: s.accent }} />
              <div className="flex-1">
                <div className="text-sm font-semibold">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.count.toLocaleString("en-IN")} customers</div>
              </div>
              <Badge variant="outline" className="text-[10px]">{s.engagement}</Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm">
        <Target className="size-5 text-primary" />
        <span>
          <span className="font-semibold">Insight:</span> High-value customers are few but disproportionately
          active. At-Risk customers are the clearest re-engagement opportunity.
        </span>
      </div>
    </div>
  );
}

// --- Slide 4: Personalization ----------------------------------------------
function SlidePersonalization({ stars }: { stars: number }) {
  const reco = autoPersonalize({ ...AARAV, stars });
  return (
    <div>
      <SlideHeader
        no="04"
        title="Personalization Engine"
        subtitle="A transparent, rule-based engine: Customer Data → CRM Rule → Personalized Action. Not a black box."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="py-5">
          <CardContent>
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">Customer Data</div>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>· favoriteCategory = Frappuccino</li>
              <li>· preferredTime = Evening</li>
              <li>· lastVisitDays = 2 (≥ 2)</li>
              <li>· segment = Loyal Regulars</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="py-5 border-primary/30 bg-primary/5">
          <CardContent>
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">CRM Rule</div>
            <p className="mt-2 text-sm leading-relaxed">
              IF customer frequently purchases <span className="font-semibold">cold beverages</span> AND usually visits in the <span className="font-semibold">evening</span> AND has not purchased for 2+ days,
              THEN generate an evening re-engagement offer on their favorite Frappuccino.
            </p>
          </CardContent>
        </Card>
        <Card className="py-5">
          <CardContent>
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">Personalized Action</div>
            <div className="mt-2 text-base font-semibold">{reco.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{reco.description}</p>
            <Badge className="mt-2">20% OFF</Badge>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Why this offer?</div>
        <p className="mt-1 text-sm">{reco.reason}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm">
        <Sparkles className="size-5 text-primary" />
        <span><span className="font-semibold">Key idea:</span> Personalization = matching the right offer to the right customer at the right time — with a reason.</span>
      </div>
    </div>
  );
}

// --- Slide 5: Loyalty ------------------------------------------------------
function SlideLoyalty({ stars }: { stars: number }) {
  const pct = Math.min(100, (stars / NEXT_REWARD) * 100);
  const remaining = Math.max(0, NEXT_REWARD - stars);
  return (
    <div>
      <SlideHeader
        no="05"
        title="Loyalty & Rewards"
        subtitle="A Starbucks-inspired rewards model. Stars build progress, progress unlocks rewards, rewards build retention."
      />
      <Card className="dot-grid py-0">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <CustomerAvatar customer={AARAV} size="lg" />
          <div>
            <div className="text-2xl font-semibold">{AARAV.name}'s Rewards</div>
            <LoyaltyBadge tier={AARAV.loyaltyTier} />
          </div>
          <div className="flex items-center gap-2">
            <Star className="size-8 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" />
            <span className="text-5xl font-semibold tabular-nums">{stars}</span>
            <span className="text-sm text-muted-foreground">Stars</span>
          </div>
          <div className="w-full max-w-md">
            <Progress value={pct} className="h-3 bg-primary/15" />
            <div className="mt-2 text-sm text-muted-foreground">{remaining} Stars to your next reward</div>
          </div>
        </div>
      </Card>
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm">
        <Star className="size-5 text-primary" />
        <span><span className="font-semibold">CRM role:</span> Loyalty isn't a perk — it's a retention mechanism that converts one purchase into a habit.</span>
      </div>
    </div>
  );
}

// --- Slide 6: Campaign -----------------------------------------------------
function SlideCampaign() {
  const c = {
    name: "Your Favorite Is Back",
    target: "VIP / High-value Frappuccino customers",
    sent: 860,
    redeemed: 301,
    repeat: 64,
  };
  const open = Math.round((731 / c.sent) * 100);
  const redeem = Math.round((c.redeemed / c.sent) * 100);
  return (
    <div>
      <SlideHeader
        no="06"
        title="Campaign"
        subtitle="Personalized offers are delivered as targeted campaigns — with measurable redemption and repeat-purchase lift."
      />
      <Card className="py-6">
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <Badge variant="secondary">{c.target}</Badge>
            <h3 className="mt-2 text-xl font-semibold">{c.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">A targeted push to high-value Frappuccino fans with a personalized favorite-product offer.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Customers targeted" value={c.sent.toLocaleString("en-IN")} />
              <Stat label="Offers redeemed" value={c.redeemed.toLocaleString("en-IN")} />
              <Stat label="Repeat purchase rate" value={`${c.repeat}%`} />
              <Stat label="Avg order value" value={formatINR(kpis.averageOrderValue)} />
            </div>
          </div>
          <div className="space-y-3">
            <Bar label="Open rate" value={open} color="bg-[oklch(0.62_0.1_180)]" />
            <Bar label="Redemption rate" value={redeem} color="bg-primary" />
            <Bar label="Repeat purchase rate" value={c.repeat} color="bg-[oklch(0.78_0.12_80)]" />
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm">
        <Megaphone className="size-5 text-primary" />
        <span><span className="font-semibold">CRM role:</span> Campaigns close the loop between insight and revenue — and feed new data back into the system.</span>
      </div>
    </div>
  );
}

// --- Slide 7: Customer Experience -----------------------------------------
function SlideCustomerExperience({ stars }: { stars: number }) {
  const reco = autoPersonalize({ ...AARAV, stars });
  return (
    <div>
      <SlideHeader
        no="07"
        title="Customer Experience"
        subtitle="This is what Aarav actually sees — the personalized output of every CRM decision behind the scenes."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="py-5">
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-primary p-4 text-primary-foreground">
              <div className="text-sm">Good evening, Aarav ☕</div>
              <div className="mt-2 flex items-center gap-2">
                <Star className="size-5 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" />
                <span className="text-3xl font-semibold">{stars}</span>
                <span className="text-xs">Stars · Gold</span>
              </div>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">Recommended for you</div>
              <div className="mt-1 text-base font-semibold">{AARAV.favoriteProduct}</div>
              <p className="text-xs text-muted-foreground">Because it's your usual {AARAV.preferredTime.toLowerCase()} favorite.</p>
              <Button size="sm" className="mt-2"><Coffee className="size-4" /> Order Again</Button>
            </div>
            <div className="rounded-xl bg-[oklch(0.78_0.12_80/0.12)] p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-[oklch(0.5_0.1_80)]">Your personalized reward</div>
              <div className="mt-1 text-base font-semibold">{reco.title}</div>
              <p className="text-xs text-muted-foreground">{reco.description}</p>
              <Button size="sm" variant="secondary" className="mt-2 bg-[oklch(0.78_0.12_80)] text-[oklch(0.3_0.1_80)]">Redeem</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="py-5">
          <CardContent className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Generic vs Personalized</div>
            <div className="rounded-lg border border-dashed border-[oklch(0.62_0.18_25/0.4)] bg-[oklch(0.62_0.18_25/0.05)] p-3">
              <div className="text-sm font-semibold">Without CRM</div>
              <div className="text-xs text-muted-foreground">"20% OFF ALL COFFEE" — same message, everyone.</div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="text-sm font-semibold">With CRM</div>
              <div className="text-xs text-muted-foreground">"Your favorite Frappuccino is waiting." — specific customer, time, preference, incentive.</div>
            </div>
            <div className="rounded-lg bg-primary p-3 text-center text-sm font-semibold text-primary-foreground">
              Generic Marketing → Personalized Relationship
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm">
        <Smartphone className="size-5 text-primary" />
        <span><span className="font-semibold">Key idea:</span> The customer doesn't see the dashboard — they see a personalized experience that feels like it was made for them.</span>
      </div>
    </div>
  );
}

// --- Slide 8: CRM Loop -----------------------------------------------------
function SlideCrmLoop() {
  return (
    <div>
      <SlideHeader
        no="08"
        title="The Starbucks CRM Loop"
        subtitle="CRM is not a one-time funnel — it is a continuous cycle. Each pass generates new data, sharper insight, better personalization and stronger retention."
      />
      <Card className="py-6">
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {crmLoop.map((step) => {
              const Icon = LOOP_ICONS[step.icon] ?? Database;
              return (
                <div key={step.id} className="flex flex-col items-center rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wide">{step.label}</div>
                  <div className="text-[10px] text-muted-foreground">{step.sub}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            ↻ …and back to <span className="font-semibold text-primary">COLLECT</span>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4 border-primary/20 bg-primary/5 py-5">
        <CardContent className="space-y-3 text-center">
          <h3 className="text-lg font-semibold">The central idea</h3>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Starbucks' CRM approach can be understood as a continuous cycle where customer interactions generate data,
            data enables segmentation and personalization, and personalized experiences encourage continued engagement.
          </p>
          <p className="mx-auto max-w-2xl text-base font-semibold text-primary">
            "Starbucks turns customer data into personalized experiences — and personalized experiences into loyalty."
          </p>
          <p className="text-[11px] text-muted-foreground">
            Academic demonstration · All figures are simulated demo data inspired by publicly known Starbucks CRM concepts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold tabular-nums">{value}</div>
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
