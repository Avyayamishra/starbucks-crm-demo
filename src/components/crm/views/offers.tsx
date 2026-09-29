"use client";

import { useState } from "react";
import {
  Gift,
  Sparkles,
  Wand2,
  CheckCircle2,
  CircleDot,
  ArrowRight,
  Coffee,
  Brain,
  Cpu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import { CustomerAvatar } from "@/components/crm/customer-avatar";
import {
  segments,
  segmentLabels,
  customers,
  type OfferObjective,
  type PreferenceCategory,
  type SegmentId,
} from "@/lib/data";
import { buildOffer, toOffer } from "@/lib/personalization";
import { useCrmStore } from "@/lib/store";
import { toast } from "sonner";

const SEGMENTS: SegmentId[] = ["vip", "loyal", "occasional", "new", "at-risk"];
const PREFERENCES: PreferenceCategory[] = ["Coffee", "Frappuccino", "Tea", "Food", "Merchandise"];
const OBJECTIVES: OfferObjective[] = [
  "Increase frequency",
  "Increase order value",
  "Re-engage",
  "Reward loyalty",
  "Introduce new product",
];

export function OffersView() {
  const offers = useCrmStore((s) => s.offers);
  const addOffer = useCrmStore((s) => s.addOffer);
  const redeemOffer = useCrmStore((s) => s.redeemOffer);
  const selectedCustomerId = useCrmStore((s) => s.selectedCustomerId);
  const setView = useCrmStore((s) => s.setView);

  const selectedCustomer =
    customers.find((c) => c.id === selectedCustomerId) ?? customers[0];

  const [segment, setSegment] = useState<SegmentId>(selectedCustomer.segment);
  const [preference, setPreference] = useState<PreferenceCategory>(selectedCustomer.favoriteCategory);
  const [objective, setObjective] = useState<OfferObjective>("Re-engage");
  const [result, setResult] = useState<ReturnType<typeof buildOffer> | null>(null);

  const generate = () => {
    const r = buildOffer({
      customer: selectedCustomer,
      segment,
      preference,
      objective,
    });
    setResult(r);
  };

  const save = () => {
    if (!result) return;
    const offer = toOffer(
      { customer: selectedCustomer, segment, preference, objective },
      result
    );
    addOffer({ ...offer, status: "Sent" });
    toast.success("Personalized offer delivered", {
      description: `${offer.title} → ${selectedCustomer.name}`,
    });
    setResult(null);
  };

  const redeem = (id: string) => {
    redeemOffer(id);
    toast.success("Offer redeemed", {
      description: "Stars updated on the customer's account.",
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Personalized Offers"
        subtitle="A transparent, rule-based personalization engine: Customer Data → CRM Rule → Personalized Action."
        icon={Gift}
        demo
      />

      {/* Personalization engine explainer */}
      <Card className="bg-primary/5 border-primary/20 py-4">
        <CardContent className="flex flex-col gap-3 px-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Brain className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Personalization Engine — Rule Based</div>
              <div className="text-xs text-muted-foreground">Not a black box. Inputs map to a recommendation with an explainable reason.</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wide">
            <span className="rounded-md bg-background px-2 py-1">Customer Data</span>
            <ArrowRight className="size-3 text-muted-foreground" />
            <span className="rounded-md bg-background px-2 py-1">CRM Rule</span>
            <ArrowRight className="size-3 text-muted-foreground" />
            <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">Personalized Action</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Generator */}
        <Card className="py-5 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Wand2 className="size-4 text-primary" /> Create Personalized Offer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-secondary/40 p-3">
              <CustomerAvatar customer={selectedCustomer} />
              <div>
                <div className="text-sm font-medium">{selectedCustomer.name}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedCustomer.location} · {segmentLabels[selectedCustomer.segment]}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setView("customers")}>
                Change
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Customer Segment</Label>
              <Select value={segment} onValueChange={(v) => setSegment(v as SegmentId)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SEGMENTS.map((s) => (
                    <SelectItem key={s} value={s}>{segmentLabels[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Customer Preference</Label>
              <Select value={preference} onValueChange={(v) => setPreference(v as PreferenceCategory)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PREFERENCES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Objective</Label>
              <Select value={objective} onValueChange={(v) => setObjective(v as OfferObjective)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {OBJECTIVES.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={generate}>
              <Sparkles className="size-4" /> Generate Offer
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="py-5 lg:col-span-3">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Cpu className="size-4 text-primary" /> Generated CRM Action
            </CardTitle>
            {result && <Badge variant="secondary">{result.discount}</Badge>}
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                <Gift className="size-8 opacity-40" />
                <p>Configure the inputs and click <span className="font-medium text-foreground">Generate Offer</span> to see the personalization engine work.</p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-up">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-primary">Offer headline</div>
                  <div className="mt-1 text-lg font-semibold tracking-tight">{result.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{result.description}</p>
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Why this offer?</div>
                  <p className="mt-1 text-sm leading-relaxed">{result.reason}</p>
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Rules evaluated</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {result.rules.map((r) => (
                      <code key={r} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-mono">
                        {r}
                      </code>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={save}>
                    <CheckCircle2 className="size-4" /> Deliver to {selectedCustomer.name}
                  </Button>
                  <Button variant="outline" onClick={() => setView("customer-view")}>
                    Preview on customer's phone
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Existing offers list */}
      <div className="space-y-3">
        <SectionHeading title="Active & Redeemed Offers" icon={Coffee} demo />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((o) => {
            const cust = customers.find((c) => c.id === o.customerId);
            if (!cust) return null;
            const statusTone: Record<typeof o.status, string> = {
              Drafted: "bg-secondary text-secondary-foreground",
              Sent: "bg-[oklch(0.62_0.1_180/0.15)] text-[oklch(0.4_0.1_180)]",
              Redeemed: "bg-[oklch(0.46_0.11_158/0.12)] text-[oklch(0.4_0.11_158)]",
              Expired: "bg-muted text-muted-foreground",
            };
            return (
              <Card key={o.id} className="gap-0 py-5">
                <div className="flex items-start justify-between px-5">
                  <div className="flex items-center gap-2">
                    <CustomerAvatar customer={cust} size="sm" />
                    <div>
                      <div className="text-sm font-medium">{cust.name}</div>
                      <div className="text-[11px] text-muted-foreground">{segmentLabels[o.segment]} · {o.preference}</div>
                    </div>
                  </div>
                  <Badge className={statusTone[o.status]}>{o.status}</Badge>
                </div>
                <div className="mt-3 px-5">
                  <div className="text-base font-semibold">{o.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>
                  <div className="mt-2 rounded-lg bg-secondary/40 p-2.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Why this?</div>
                    <p className="mt-0.5 text-xs leading-relaxed">{o.reason}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border px-5 pt-3">
                  <span className="text-xs text-muted-foreground">
                    <CircleDot className="mr-1 inline size-3" /> Objective: {o.objective}
                  </span>
                  {o.status === "Sent" && (
                    <Button size="sm" variant="outline" onClick={() => redeem(o.id)}>
                      Mark as redeemed
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
