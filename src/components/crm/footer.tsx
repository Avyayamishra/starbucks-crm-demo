import { Coffee } from "lucide-react";
import { DemoBadge } from "@/components/crm/demo-badge";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background/80 px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Coffee className="size-3.5 text-primary" />
          <span>
            <span className="font-medium text-foreground">Brewing Loyalty</span>{" "}
            · Starbucks-inspired CRM MVP for academic demonstration.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <DemoBadge />
          <span>Simulated data · Not affiliated with Starbucks.</span>
        </div>
      </div>
    </footer>
  );
}
