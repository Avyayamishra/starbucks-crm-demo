"use client";

import {
  Smartphone,
  Coffee,
  Star,
  Gift,
  Repeat,
  Bell,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  Layers,
  Heart,
  RefreshCw,
  Database,
  Brain,
  Wand2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { CustomerAvatar, LoyaltyBadge } from "@/components/crm/customer-avatar";
import {
  AARAV,
  getCustomerOrders,
  formatINR,
  journeyStages,
  crmLoop,
  NEXT_REWARD,
  type Customer,
} from "@/lib/data";
import { autoPersonalize } from "@/lib/personalization";
import { useCrmStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const LOOP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Database,
  Brain,
  Users,
  Sparkles,
  Bell,
  Heart,
  RefreshCw,
};

export function CustomerExperienceView() {
  const stars = useCrmStore((s) => s.aaravStars);
  const addStars = useCrmStore((s) => s.addStars);
  const offers = useCrmStore((s) => s.offers);
  const redeemOffer = useCrmStore((s) => s.redeemOffer);
  const setView = useCrmStore((s) => s.setView);

  const reco = autoPersonalize({ ...AARAV, stars });
  const orders = getCustomerOrders(AARAV.id).slice(0, 3);
  const pct = Math.min(100, (stars / NEXT_REWARD) * 100);
  const remaining = Math.max(0, NEXT_REWARD - stars);

  const aaravOffer = offers.find((o) => o.customerId === AARAV.id && o.status !== "Redeemed");
  const headlineOffer = aaravOffer
    ? { title: aaravOffer.title, description: aaravOffer.description, id: aaravOffer.id }
    : { title: reco.title, description: reco.description, id: null };

  const redeem = () => {
    if (headlineOffer.id) {
      redeemOffer(headlineOffer.id);
    }
    addStars(20);
    toast.success("Reward redeemed!", { description: "Aarav earned 20 bonus Stars. ☕" });
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Customer Experience"
        subtitle="The CRM Manager's data becomes Aarav's personalized coffee moment. This is the final output of CRM."
        icon={Smartphone}
        demo
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Phone mockup */}
        <div className="lg:col-span-1">
          <div className="mx-auto w-full max-w-[340px]">
            <PhoneMockup stars={stars} pct={pct} remaining={remaining} offer={headlineOffer} orders={orders} onRedeem={redeem} />
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Starbucks-style mobile experience · <DemoBadge className="ml-1" />
          </p>
        </div>

        {/* Right column: Before/After + Journey */}
        <div className="space-y-6 lg:col-span-2">
          <BeforeAfterCRM />
          <CustomerJourney />
        </div>
      </div>

      {/* CRM loop */}
      <CrmLoop />

      <Card className="bg-primary/5 border-primary/20 py-4">
        <CardContent className="flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            <span className="font-medium">Final demo:</span> The same data that powers the CRM dashboard powers the cup in Aarav's hand.
          </p>
          <Button size="sm" onClick={() => setView("presentation")}>
            <Sparkles className="size-4" /> Open Presentation Mode
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------

function PhoneMockup({
  stars,
  pct,
  remaining,
  offer,
  orders,
  onRedeem,
}: {
  stars: number;
  pct: number;
  remaining: number;
  offer: { title: string; description: string; id: string | null };
  orders: { id: string; product: string; amount: number; date: string }[];
  onRedeem: () => void;
}) {
  return (
    <div className="relative rounded-[2.4rem] border-[10px] border-[oklch(0.18_0.02_160)] bg-[oklch(0.18_0.02_160)] shadow-xl">
      <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[oklch(0.18_0.02_160)]" />
      <div className="h-[640px] overflow-y-auto scroll-area-thin rounded-[1.8rem] bg-[oklch(0.97_0.012_95)]">
        {/* App header */}
        <div className="bg-primary px-5 pb-6 pt-8 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="size-5" />
              <span className="text-sm font-semibold tracking-tight">Starbucks</span>
            </div>
            <Bell className="size-5" />
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Good evening, Aarav ☕</div>
            <div className="text-xs text-primary-foreground/80">Gurugram · {AARAV.preferredTime} person</div>
          </div>
          {/* Stars strip */}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-foreground/10 p-3">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" />
              <span className="text-2xl font-semibold tabular-nums">{stars}</span>
              <span className="text-xs text-primary-foreground/80">Stars</span>
            </div>
            <LoyaltyBadge tier="Gold" />
          </div>
          <div className="mt-2">
            <Progress value={pct} className="h-1.5 bg-primary-foreground/15" />
            <div className="mt-1 text-[10px] text-primary-foreground/80">{remaining} Stars to your next reward</div>
          </div>
        </div>

        {/* Recommended */}
        <Section icon={Sparkles} title="Recommended for You">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-2">
              <Coffee className="size-4 text-primary" />
              <span className="text-sm font-semibold">{AARAV.favoriteProduct}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Because it's your usual {AARAV.preferredTime.toLowerCase()} favorite.</p>
            <Button size="sm" className="mt-3 w-full">
              <Repeat className="size-4" /> Order Again
            </Button>
          </div>
        </Section>

        {/* Personalized reward */}
        <Section icon={Gift} title="Your Personalized Reward">
          <div className="rounded-xl bg-[oklch(0.78_0.12_80/0.12)] p-3">
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" />
              <span className="text-sm font-semibold">{offer.title}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{offer.description}</p>
            <p className="mt-1 text-[10px] text-muted-foreground/80">Just for you.</p>
            <Button size="sm" variant="secondary" className="mt-3 w-full bg-[oklch(0.78_0.12_80)] text-[oklch(0.3_0.1_80)] hover:bg-[oklch(0.7_0.12_80)]" onClick={onRedeem}>
              Redeem
            </Button>
          </div>
        </Section>

        {/* Recent orders */}
        <Section icon={ShoppingCart} title="Recent Orders">
          <div className="space-y-2">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                <div>
                  <div className="text-sm font-medium">{o.product}</div>
                  <div className="text-[10px] text-muted-foreground">{o.date}</div>
                </div>
                <div className="text-sm font-semibold tabular-nums">{formatINR(o.amount)}</div>
              </div>
            ))}
          </div>
        </Section>

        <div className="h-4" />
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 pt-4">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5 text-primary" /> {title}
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------

function BeforeAfterCRM() {
  return (
    <Card className="py-5">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-base">
          <Wand2 className="size-4 text-primary" /> Without CRM vs. With CRM
        </CardTitle>
        <DemoBadge />
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {/* Without */}
        <div className="rounded-xl border border-dashed border-[oklch(0.62_0.18_25/0.4)] bg-[oklch(0.62_0.18_25/0.05)] p-4">
          <Badge className="mb-2 bg-[oklch(0.62_0.18_25/0.15)] text-[oklch(0.5_0.18_25)]">Without CRM</Badge>
          <div className="text-lg font-semibold">"20% OFF ALL COFFEE"</div>
          <p className="mt-1 text-sm text-muted-foreground">Same message → Everyone. No preference, no timing, no incentive design.</p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>· Generic blast</li>
            <li>· No customer preference</li>
            <li>· Low redemption</li>
          </ul>
        </div>

        {/* With */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <Badge className="mb-2 bg-primary/15 text-primary">With CRM</Badge>
          <div className="text-lg font-semibold">"Your favorite Frappuccino is waiting."</div>
          <p className="mt-1 text-sm text-muted-foreground">Specific customer. Specific preference. Specific timing. Specific incentive.</p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>· Aarav · Frappuccino · Evening</li>
            <li>· 20% off — personalized</li>
            <li>· Higher redemption</li>
          </ul>
        </div>
      </CardContent>
      <CardContent className="pt-2">
        <div className="rounded-lg bg-primary p-3 text-center text-sm font-semibold text-primary-foreground">
          Generic Marketing → Personalized Relationship
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------

function CustomerJourney() {
  const [active, setActive] = useState(4); // personalization
  const stage = journeyStages[active];

  return (
    <Card className="py-5">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="size-4 text-primary" /> Customer Journey
          <DemoBadge />
        </CardTitle>
        <span className="text-xs text-muted-foreground">Click each stage</span>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Horizontal stepper */}
        <div className="flex flex-wrap items-center gap-1.5">
          {journeyStages.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <div key={s.id} className="flex items-center gap-1.5">
                <button
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : isDone
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-muted-foreground hover:bg-accent"
                  )}
                >
                  {i + 1}. {s.label}
                </button>
                {i < journeyStages.length - 1 && <ArrowRight className="size-3 text-muted-foreground/50" />}
              </div>
            );
          })}
        </div>

        {/* Stage detail */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 animate-fade-up" key={stage.id}>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">Stage {active + 1}</Badge>
            <h3 className="text-base font-semibold">{stage.label}</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{stage.description}</p>
          <div className="mt-3 rounded-lg bg-background/70 p-3 text-xs leading-relaxed">
            <span className="font-semibold text-primary">CRM activity:</span> {stage.detail}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button size="sm" variant="ghost" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>
            <ArrowLeft className="size-4" /> Previous
          </Button>
          <span className="text-xs text-muted-foreground">{active + 1} / {journeyStages.length}</span>
          <Button size="sm" variant="ghost" onClick={() => setActive(Math.min(journeyStages.length - 1, active + 1))} disabled={active === journeyStages.length - 1}>
            Next <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------

function CrmLoop() {
  return (
    <Card className="py-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <RefreshCw className="size-4 text-primary" /> The Starbucks CRM Loop
          <DemoBadge />
        </CardTitle>
        <p className="text-sm text-muted-foreground">A continuous cycle — not a one-time funnel.</p>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto max-w-3xl">
          {/* center label */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">CRM</div>
            <div className="text-sm font-semibold text-primary">Loop</div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {crmLoop.map((step, i) => {
              const Icon = LOOP_ICONS[step.icon] ?? Database;
              const isLast = i === crmLoop.length - 1;
              return (
                <div key={step.id} className="relative">
                  <div className="flex flex-col items-center rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-4" />
                    </div>
                    <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground">{step.sub}</div>
                  </div>
                  {i < crmLoop.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-primary/40 lg:block" />
                  )}
                  {isLast && (
                    <div className="mt-1 text-center text-[10px] text-muted-foreground">↻ back to COLLECT</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
