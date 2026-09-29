import {
  type Customer,
  type Offer,
  type OfferObjective,
  type PreferenceCategory,
  type SegmentId,
} from "@/lib/data";

// ---------------------------------------------------------------------------
// Personalization engine — a small, transparent, RULE-BASED engine.
//
// The goal is academic clarity: show that CRM personalization is
//   Customer Data → CRM Rule → Personalized Action
// NOT a magical AI black box.
// ---------------------------------------------------------------------------

export interface OfferInput {
  customer: Pick<
    Customer,
    "id" | "name" | "favoriteCategory" | "favoriteProduct" | "preferredTime" | "lastVisitDays" | "segment" | "loyaltyTier"
  >;
  segment: SegmentId;
  preference: PreferenceCategory;
  objective: OfferObjective;
}

export interface OfferResult {
  title: string;
  description: string;
  reason: string;
  rules: string[];
  discount: string;
}

interface Template {
  title: (c: OfferInput) => string;
  description: (c: OfferInput) => string;
  reason: (c: OfferInput) => string;
  rules: string[];
  discount: string;
}

const TEMPLATES: Record<OfferObjective, Template> = {
  "Re-engage": {
    title: () => "Come back to your favorite.",
    description: (c) =>
      `Get 20% off your favorite ${c.preference} on your next visit.`,
    reason: (c) =>
      `${c.customer.name} previously purchased ${c.preference} frequently but has not visited recently (${
        c.customer.lastVisitDays
      } day${c.customer.lastVisitDays === 1 ? "" : "s"} ago).`,
    rules: [
      "lastVisitDays >= 2",
      "favoriteCategory match",
      "preferredTime match",
    ],
    discount: "20% OFF",
  },
  "Increase frequency": {
    title: () => "Double Stars this week.",
    description: (c) =>
      `Earn 2× Stars on every ${c.preference} order until Sunday.`,
    reason: (c) =>
      `Visit cadence for ${c.customer.name} is below the loyal threshold. Double Stars reinforce a repeat habit.`,
    rules: ["visitFrequency < 4", "favoriteCategory match"],
    discount: "2× STARS",
  },
  "Increase order value": {
    title: () => "Upgrade your usual.",
    description: (c) =>
      `Add a food pairing to your ${c.preference} and save ₹60.`,
    reason: (c) =>
      `${c.customer.name}'s AOV can grow with a relevant add-on tied to their favorite category.`,
    rules: ["favoriteCategory match", "add-on recommendation"],
    discount: "₹60 OFF BUNDLE",
  },
  "Reward loyalty": {
    title: () => "A loyal thank-you.",
    description: (c) =>
      `Enjoy 2× Stars on your next 2 ${c.preference} orders.`,
    reason: (c) =>
      `${c.customer.name} is a ${c.customer.loyaltyTier} member with high engagement. Rewarding consistency protects retention.`,
    rules: ["loyaltyTier in (Gold, Platinum)", "engagement >= High"],
    discount: "2× STARS",
  },
  "Introduce new product": {
    title: () => "Something new for you.",
    description: (c) =>
      `First sip of our new seasonal ${c.preference} — 15% off this week.`,
    reason: (c) =>
      `Based on ${c.customer.name}'s affinity for ${c.preference}, this new launch is a strong behavioral match.`,
    rules: ["new product in favoriteCategory", "preference match"],
    discount: "15% OFF",
  },
};

export function buildOffer(input: OfferInput): OfferResult {
  const t = TEMPLATES[input.objective];
  return {
    title: t.title(input),
    description: t.description(input),
    reason: t.reason(input),
    rules: t.rules,
    discount: t.discount,
  };
}

// Auto-personalization for a single customer (used on the customer view)
export function autoPersonalize(c: Customer): {
  title: string;
  description: string;
  reason: string;
  rules: string[];
} {
  const rules: string[] = [];
  rules.push(`favoriteCategory = ${c.favoriteCategory}`);
  rules.push(`preferredTime = ${c.preferredTime}`);
  if (c.lastVisitDays >= 2) rules.push(`lastVisitDays = ${c.lastVisitDays} (≥ 2)`);

  if (c.segment === "at-risk" || c.lastVisitDays >= 7) {
    return {
      title: "Come back to your favorite.",
      description: `Get 20% off your favorite ${c.favoriteProduct} today.`,
      reason: `${c.name}'s visit frequency has declined. Personalized re-engagement tied to their favorite product is the highest-conversion CRM action.`,
      rules,
    };
  }

  return {
    title: "We saved your evening.",
    description: `20% off your favorite ${c.favoriteProduct} — because it's your usual ${c.preferredTime.toLowerCase()} favorite.`,
    reason: `${c.name} frequently purchases ${c.favoriteCategory} in the ${c.preferredTime.toLowerCase()} and has not visited in ${c.lastVisitDays} day${
      c.lastVisitDays === 1 ? "" : "s"
    }.`,
    rules,
  };
}

export function toOffer(
  input: OfferInput,
  result: OfferResult
): Offer {
  return {
    id: "OFF-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    customerId: input.customer.id,
    title: result.title,
    description: result.description,
    reason: result.reason,
    rules: result.rules,
    segment: input.segment,
    preference: input.preference,
    objective: input.objective,
    status: "Drafted",
    discount: result.discount,
  };
}
