"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  Eye,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerAvatar, LoyaltyBadge } from "@/components/crm/customer-avatar";
import { SectionHeading } from "@/components/crm/section-heading";
import { DemoBadge } from "@/components/crm/demo-badge";
import {
  customers,
  segmentLabels,
  segmentDotColor,
  formatINR,
  type SegmentId,
} from "@/lib/data";
import { useCrmStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const SEGMENT_FILTERS: { id: SegmentId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vip", label: "VIP" },
  { id: "loyal", label: "Loyal" },
  { id: "occasional", label: "Occasional" },
  { id: "new", label: "New" },
  { id: "at-risk", label: "At Risk" },
];

export function CustomersView() {
  const searchQuery = useCrmStore((s) => s.searchQuery);
  const setSearchQuery = useCrmStore((s) => s.setSearchQuery);
  const segmentFilter = useCrmStore((s) => s.segmentFilter);
  const setSegmentFilter = useCrmStore((s) => s.setSegmentFilter);
  const selectCustomer = useCrmStore((s) => s.selectCustomer);
  const setView = useCrmStore((s) => s.setView);
  const [localSearch, setLocalSearch] = useState("");

  const effectiveQuery = (localSearch || searchQuery).trim().toLowerCase();

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSegment = segmentFilter === "all" || c.segment === segmentFilter;
      const matchesSearch =
        !effectiveQuery ||
        c.name.toLowerCase().includes(effectiveQuery) ||
        c.location.toLowerCase().includes(effectiveQuery) ||
        c.favoriteProduct.toLowerCase().includes(effectiveQuery);
      return matchesSegment && matchesSearch;
    });
  }, [effectiveQuery, segmentFilter]);

  const open360 = (id: string) => {
    selectCustomer(id);
    setView("customer-360");
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Customers"
        subtitle="Every Starbucks Rewards member is one row of CRM data away from a personalized relationship."
        icon={Filter}
      />

      {/* Controls */}
      <Card className="py-4">
        <CardContent className="flex flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search by name, location or favorite product…"
              className="h-9 rounded-full pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <SlidersHorizontal className="size-3.5" /> Segment:
            </span>
            {SEGMENT_FILTERS.map((f) => (
              <Button
                key={f.id}
                size="sm"
                variant={segmentFilter === f.id ? "default" : "outline"}
                onClick={() => setSegmentFilter(f.id)}
                className="h-8 rounded-full px-3 text-xs"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
          {customers.length} demo customers · <DemoBadge className="ml-1" />
        </span>
        <Button variant="ghost" size="sm" onClick={() => { setLocalSearch(""); setSearchQuery(""); setSegmentFilter("all"); }}>
          Reset
        </Button>
      </div>

      {/* Customer cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="group gap-0 py-5 transition-all hover:shadow-md">
            <div className="flex items-start gap-3 px-5">
              <CustomerAvatar customer={c} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <button
                      onClick={() => open360(c.id)}
                      className="truncate font-semibold hover:text-primary"
                    >
                      {c.name}
                    </button>
                    <div className="text-xs text-muted-foreground">
                      {c.age} · {c.location}
                    </div>
                  </div>
                  <LoyaltyBadge tier={c.loyaltyTier} />
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={cn("size-2 rounded-full", segmentDotColor[c.segment])} />
                  <span className="text-xs text-muted-foreground">
                    {segmentLabels[c.segment]}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 px-5">
              <MiniStat label="Favorite" value={c.favoriteProduct} />
              <MiniStat label="Preferred time" value={c.preferredTime} />
              <MiniStat label="Avg order" value={formatINR(c.averageOrderValue)} />
              <MiniStat label="Visits / mo" value={`${c.visitFrequency}`} />
              <MiniStat label="Stars" value={`⭐ ${c.stars}`} />
              <MiniStat label="Last visit" value={c.lastVisit} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border px-5 pt-3">
              <Badge variant="secondary" className="text-[10px]">{c.channel}</Badge>
              <Button size="sm" variant="ghost" onClick={() => open360(c.id)}>
                <Eye className="size-4" /> Customer 360°
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center gap-2 text-center">
            <Search className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No customers match your filters.</p>
            <Button variant="outline" size="sm" onClick={() => { setLocalSearch(""); setSearchQuery(""); setSegmentFilter("all"); }}>
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-primary/5 py-4">
        <CardContent className="flex items-center justify-between gap-3 px-5">
          <p className="text-sm">
            <span className="font-medium">Tip:</span> Click <span className="font-medium">Aarav Sharma</span> to follow the full CRM demo story.
          </p>
          <Button size="sm" onClick={() => { selectCustomer("C-1001"); setView("customer-360"); }}>
            Open Aarav's 360° <ArrowRight className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="truncate text-sm font-medium" title={value}>{value}</div>
    </div>
  );
}
