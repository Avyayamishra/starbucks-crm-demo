import { cn } from "@/lib/utils";
import type { Customer } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function CustomerAvatar({
  customer,
  size = "md",
  className,
}: {
  customer: Pick<Customer, "name" | "avatarColor">;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-14 text-lg",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-sm",
        sizes[size]
      )}
      style={{ backgroundColor: customer.avatarColor }}
    >
      {initials}
    </div>
  );
}

export function LoyaltyBadge({ tier }: { tier: Customer["loyaltyTier"] }) {
  const map: Record<Customer["loyaltyTier"], string> = {
    Green: "bg-[oklch(0.46_0.11_158/0.12)] text-[oklch(0.4_0.11_158)] border-[oklch(0.46_0.11_158/0.25)]",
    Gold: "bg-[oklch(0.78_0.12_80/0.18)] text-[oklch(0.5_0.1_80)] border-[oklch(0.78_0.12_80/0.4)]",
    Platinum: "bg-[oklch(0.6_0.04_260/0.12)] text-[oklch(0.35_0.05_260)] border-[oklch(0.6_0.04_260/0.3)]",
  };
  return (
    <Badge variant="outline" className={cn("gap-1 font-medium", map[tier])}>
      {tier} Member
    </Badge>
  );
}
