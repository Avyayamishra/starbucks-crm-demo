import { cn } from "@/lib/utils";

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[oklch(0.78_0.12_80/0.5)] bg-[oklch(0.78_0.12_80/0.12)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[oklch(0.5_0.1_80)]",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-[oklch(0.7_0.12_80)]" />
      Demo Data
    </span>
  );
}
