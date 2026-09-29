"use client";

import {
  Star,
  Crown,
  Gift,
  Plus,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { CustomerAvatar, LoyaltyBadge } from "@/components/crm/customer-avatar";
import { AARAV, rewardsCatalog, NEXT_REWARD } from "@/lib/data";
import { useCrmStore } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function LoyaltyView() {
  const stars = useCrmStore((s) => s.aaravStars);
  const addStars = useCrmStore((s) => s.addStars);
  const pct = Math.min(100, (stars / NEXT_REWARD) * 100);
  const remaining = Math.max(0, NEXT_REWARD - stars);

  const addStarsHandler = (n: number) => {
    addStars(n);
    toast.success(`+${n} Stars added`, { description: "Live demo: stars update instantly across the CRM." });
  };

  const nextReward = rewardsCatalog.find((r) => r.stars >= stars && r.stars > 0) ?? rewardsCatalog[2];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Loyalty & Rewards"
        subtitle="A Starbucks-inspired rewards model. Members earn Stars, Stars unlock rewards, rewards build retention."
        icon={Star}
        demo
      />

      {/* Aarav's loyalty card */}
      <Card className="dot-grid relative overflow-hidden py-0">
        <div className="relative z-10 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-center gap-4">
            <CustomerAvatar customer={AARAV} size="lg" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{AARAV.name}'s Rewards</h2>
                <LoyaltyBadge tier={AARAV.loyaltyTier} />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Crown className="size-4 text-[oklch(0.78_0.12_80)]" />
                <span className="font-medium">Gold Member</span>
                <span className="text-muted-foreground">· since {AARAV.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-2">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Current Stars</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tabular-nums">{stars}</span>
                  <Star className="size-5 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Next reward</div>
                <div className="text-sm font-medium">{remaining} Stars away</div>
              </div>
            </div>
            <Progress value={pct} className="h-2.5 bg-primary/15" />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>0</span>
              <span>Next: {nextReward.title} @ {nextReward.stars} ⭐</span>
              <span>{NEXT_REWARD}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Live demo: add stars */}
      <Card className="bg-primary/5 border-primary/20 py-4">
        <CardContent className="flex flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="size-4 text-primary" /> Live demo: simulate a purchase
            </div>
            <div className="text-xs text-muted-foreground">Award Stars to Aarav and watch the loyalty progress update.</div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => addStarsHandler(5)}>+5 Stars</Button>
            <Button size="sm" variant="outline" onClick={() => addStarsHandler(15)}>+15 Stars</Button>
            <Button size="sm" onClick={() => addStarsHandler(25)}>+25 Stars</Button>
          </div>
        </CardContent>
      </Card>

      {/* Rewards catalog */}
      <div className="space-y-3">
        <SectionHeading title="Rewards Catalog" subtitle="Tiered rewards that match the customer journey." icon={Gift} demo />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rewardsCatalog.map((r) => {
            const unlocked = r.stars === 0 || stars >= r.stars;
            return (
              <Card key={r.id} className={cn("gap-0 py-5", unlocked && "border-primary/30 bg-primary/5")}>
                <div className="flex items-start justify-between px-5">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex size-10 items-center justify-center rounded-xl",
                      unlocked ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    )}>
                      <Star className="size-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-xs text-muted-foreground">{r.tier} tier reward</div>
                    </div>
                  </div>
                  {unlocked ? (
                    <Badge className="bg-[oklch(0.46_0.11_158/0.12)] text-[oklch(0.4_0.11_158)]">
                      <CheckCircle2 className="size-3" /> Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="secondary">{r.stars - stars} to go</Badge>
                  )}
                </div>
                <div className="mt-3 px-5">
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border px-5 pt-3">
                  <span className="text-xs text-muted-foreground">Cost</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold tabular-nums">
                    {r.stars === 0 ? "Auto" : <>{r.stars} <Star className="size-3.5 fill-[oklch(0.78_0.12_80)] text-[oklch(0.78_0.12_80)]" /></>}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Loyalty tiers */}
      <Card className="py-5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Crown className="size-4 text-primary" /> Loyalty Tiers
            <DemoBadge />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <TierCard
            tier="Green"
            from="0 ⭐"
            to="50 ⭐"
            benefits={["Earn 1 Star per ₹50", "Birthday treat", "App-only offers"]}
            tone="green"
          />
          <TierCard
            tier="Gold"
            from="50 ⭐"
            to="400 ⭐"
            benefits={["Free customization", "Double-Stars days", "Personalized offers"]}
            tone="gold"
            current
          />
          <TierCard
            tier="Platinum"
            from="400 ⭐"
            to="∞"
            benefits={["Free handcrafted drink", "Early access", "Birthday reward"]}
            tone="platinum"
          />
        </CardContent>
      </Card>
    </div>
  );
}

function TierCard({
  tier,
  from,
  to,
  benefits,
  tone,
  current,
}: {
  tier: string;
  from: string;
  to: string;
  benefits: string[];
  tone: "green" | "gold" | "platinum";
  current?: boolean;
}) {
  const tones = {
    green: "bg-[oklch(0.46_0.11_158/0.1)] text-[oklch(0.4_0.11_158)] border-[oklch(0.46_0.11_158/0.3)]",
    gold: "bg-[oklch(0.78_0.12_80/0.15)] text-[oklch(0.5_0.1_80)] border-[oklch(0.78_0.12_80/0.4)]",
    platinum: "bg-[oklch(0.6_0.04_260/0.12)] text-[oklch(0.35_0.05_260)] border-[oklch(0.6_0.04_260/0.3)]",
  };
  return (
    <div className={cn("rounded-xl border p-4", tones[tone], current && "ring-2 ring-primary/30")}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold uppercase tracking-wide">{tier}</div>
        {current && <Badge className="bg-primary text-primary-foreground">Aarav</Badge>}
      </div>
      <div className="mt-1 text-xs opacity-80">{from} → {to}</div>
      <ul className="mt-3 space-y-1.5 text-xs">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Plus className="mt-0.5 size-3 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
