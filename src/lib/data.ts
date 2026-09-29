// ---------------------------------------------------------------------------
// Starbucks CRM MVP — Mock data layer
//
// IMPORTANT: All numbers, customers, orders, offers and campaigns below are
// SIMULATED demo data inspired by publicly known Starbucks CRM concepts.
// They do NOT represent real Starbucks figures, systems or customers.
// ---------------------------------------------------------------------------

export type SegmentId =
  | "vip"
  | "loyal"
  | "occasional"
  | "new"
  | "at-risk";

export type LoyaltyTier = "Green" | "Gold" | "Platinum";

export type PreferenceCategory =
  | "Coffee"
  | "Frappuccino"
  | "Tea"
  | "Food"
  | "Merchandise";

export type PreferredTime = "Morning" | "Afternoon" | "Evening" | "Night";

export interface Customer {
  id: string;
  name: string;
  age: number;
  location: string;
  loyaltyTier: LoyaltyTier;
  stars: number;
  favoriteCategory: PreferenceCategory;
  favoriteProduct: string;
  visitFrequency: number; // visits per month
  averageOrderValue: number; // INR
  preferredTime: PreferredTime;
  lastVisit: string; // human readable, e.g. "2 days ago"
  lastVisitDays: number; // numeric for rule engine
  engagementScore: number; // 0-100
  customerLifetimeValue: number; // INR estimate
  segment: SegmentId;
  channel: "Mobile App" | "In-store" | "Both";
  paymentPreference: string;
  avatarColor: string;
  joinedDate: string;
}

export interface Order {
  id: string;
  customerId: string;
  product: string;
  category: PreferenceCategory;
  amount: number;
  date: string;
  time: string;
}

export interface Offer {
  id: string;
  customerId: string;
  title: string;
  description: string;
  reason: string;
  rules: string[];
  segment: SegmentId;
  preference: PreferenceCategory;
  objective: OfferObjective;
  status: "Drafted" | "Sent" | "Redeemed" | "Expired";
  discount: string;
}

export type OfferObjective =
  | "Increase frequency"
  | "Increase order value"
  | "Re-engage"
  | "Reward loyalty"
  | "Introduce new product";

export interface Campaign {
  id: string;
  name: string;
  tagline: string;
  targetSegment: SegmentId;
  objective: OfferObjective;
  sent: number;
  opened: number;
  redeemed: number;
  repeatPurchaseRate: number; // %
}

export interface Segment {
  id: SegmentId;
  label: string;
  count: number;
  avgSpend: number;
  avgVisits: number;
  engagement: "High" | "Medium" | "Low";
  accent: string; // tailwind color token
  crmAction: string;
  description: string;
}

export interface JourneyStage {
  id: string;
  label: string;
  description: string;
  detail: string;
}

export interface CrmLoopStep {
  id: string;
  label: string;
  sub: string;
  icon: string;
}

// ---------------------------------------------------------------------------
// Demo customers — Aarav Sharma is the headline demo customer.
// ---------------------------------------------------------------------------

export const customers: Customer[] = [
  {
    id: "C-1001",
    name: "Aarav Sharma",
    age: 21,
    location: "Gurugram",
    loyaltyTier: "Gold",
    stars: 185,
    favoriteCategory: "Frappuccino",
    favoriteProduct: "Java Chip Frappuccino",
    visitFrequency: 5,
    averageOrderValue: 420,
    preferredTime: "Evening",
    lastVisit: "2 days ago",
    lastVisitDays: 2,
    engagementScore: 86,
    customerLifetimeValue: 25200,
    segment: "loyal",
    channel: "Mobile App",
    paymentPreference: "Starbucks App",
    avatarColor: "#00704A",
    joinedDate: "Jan 2023",
  },
  {
    id: "C-1002",
    name: "Diya Mehta",
    age: 28,
    location: "Mumbai",
    loyaltyTier: "Platinum",
    stars: 410,
    favoriteCategory: "Coffee",
    favoriteProduct: "Caffè Americano",
    visitFrequency: 12,
    averageOrderValue: 520,
    preferredTime: "Morning",
    lastVisit: "Today",
    lastVisitDays: 0,
    engagementScore: 94,
    customerLifetimeValue: 74880,
    segment: "vip",
    channel: "Both",
    paymentPreference: "Starbucks Card",
    avatarColor: "#1E3932",
    joinedDate: "Mar 2021",
  },
  {
    id: "C-1003",
    name: "Kabir Nair",
    age: 24,
    location: "Bengaluru",
    loyaltyTier: "Gold",
    stars: 240,
    favoriteCategory: "Tea",
    favoriteProduct: "Matcha Latte",
    visitFrequency: 8,
    averageOrderValue: 380,
    preferredTime: "Afternoon",
    lastVisit: "1 day ago",
    lastVisitDays: 1,
    engagementScore: 81,
    customerLifetimeValue: 36480,
    segment: "loyal",
    channel: "Mobile App",
    paymentPreference: "UPI",
    avatarColor: "#6F4E37",
    joinedDate: "Aug 2022",
  },
  {
    id: "C-1004",
    name: "Ananya Iyer",
    age: 31,
    location: "Pune",
    loyaltyTier: "Green",
    stars: 60,
    favoriteCategory: "Food",
    favoriteProduct: "Ham & Cheese Croissant",
    visitFrequency: 3,
    averageOrderValue: 310,
    preferredTime: "Morning",
    lastVisit: "5 days ago",
    lastVisitDays: 5,
    engagementScore: 58,
    customerLifetimeValue: 11160,
    segment: "occasional",
    channel: "In-store",
    paymentPreference: "Credit Card",
    avatarColor: "#CBA258",
    joinedDate: "Sep 2023",
  },
  {
    id: "C-1005",
    name: "Rohan Gupta",
    age: 27,
    location: "Delhi",
    loyaltyTier: "Green",
    stars: 35,
    favoriteCategory: "Coffee",
    favoriteProduct: "Cappuccino",
    visitFrequency: 2,
    averageOrderValue: 280,
    preferredTime: "Evening",
    lastVisit: "9 days ago",
    lastVisitDays: 9,
    engagementScore: 41,
    customerLifetimeValue: 6720,
    segment: "at-risk",
    channel: "Mobile App",
    paymentPreference: "UPI",
    avatarColor: "#8B5A3C",
    joinedDate: "Feb 2023",
  },
  {
    id: "C-1006",
    name: "Ishaan Verma",
    age: 19,
    location: "Hyderabad",
    loyaltyTier: "Green",
    stars: 15,
    favoriteCategory: "Frappuccino",
    favoriteProduct: "Caramel Frappuccino",
    visitFrequency: 1,
    averageOrderValue: 350,
    preferredTime: "Night",
    lastVisit: "12 days ago",
    lastVisitDays: 12,
    engagementScore: 34,
    customerLifetimeValue: 4200,
    segment: "new",
    channel: "Mobile App",
    paymentPreference: "UPI",
    avatarColor: "#5B7C6E",
    joinedDate: "Nov 2024",
  },
  {
    id: "C-1007",
    name: "Sara Khan",
    age: 33,
    location: "Gurugram",
    loyaltyTier: "Gold",
    stars: 275,
    favoriteCategory: "Tea",
    favoriteProduct: "Chai Tea Latte",
    visitFrequency: 7,
    averageOrderValue: 410,
    preferredTime: "Morning",
    lastVisit: "3 days ago",
    lastVisitDays: 3,
    engagementScore: 79,
    customerLifetimeValue: 34440,
    segment: "loyal",
    channel: "Both",
    paymentPreference: "Starbucks App",
    avatarColor: "#00704A",
    joinedDate: "May 2022",
  },
  {
    id: "C-1008",
    name: "Vikram Reddy",
    age: 35,
    location: "Chennai",
    loyaltyTier: "Platinum",
    stars: 520,
    favoriteCategory: "Coffee",
    favoriteProduct: "Flat White",
    visitFrequency: 14,
    averageOrderValue: 540,
    preferredTime: "Morning",
    lastVisit: "Today",
    lastVisitDays: 0,
    engagementScore: 96,
    customerLifetimeValue: 90720,
    segment: "vip",
    channel: "Both",
    paymentPreference: "Starbucks Card",
    avatarColor: "#1E3932",
    joinedDate: "Jan 2020",
  },
  {
    id: "C-1009",
    name: "Meera Joshi",
    age: 22,
    location: "Jaipur",
    loyaltyTier: "Green",
    stars: 25,
    favoriteCategory: "Frappuccino",
    favoriteProduct: "Mocha Frappuccino",
    visitFrequency: 2,
    averageOrderValue: 330,
    preferredTime: "Afternoon",
    lastVisit: "8 days ago",
    lastVisitDays: 8,
    engagementScore: 38,
    customerLifetimeValue: 7920,
    segment: "at-risk",
    channel: "Mobile App",
    paymentPreference: "UPI",
    avatarColor: "#8B5A3C",
    joinedDate: "Jul 2024",
  },
  {
    id: "C-1010",
    name: "Arjun Pillai",
    age: 26,
    location: "Kochi",
    loyaltyTier: "Green",
    stars: 10,
    favoriteCategory: "Coffee",
    favoriteProduct: "Cold Brew",
    visitFrequency: 1,
    averageOrderValue: 300,
    preferredTime: "Afternoon",
    lastVisit: "4 days ago",
    lastVisitDays: 4,
    engagementScore: 47,
    customerLifetimeValue: 3600,
    segment: "new",
    channel: "In-store",
    paymentPreference: "Credit Card",
    avatarColor: "#5B7C6E",
    joinedDate: "Dec 2024",
  },
  {
    id: "C-1011",
    name: "Priya Menon",
    age: 29,
    location: "Mumbai",
    loyaltyTier: "Gold",
    stars: 198,
    favoriteCategory: "Food",
    favoriteProduct: "Paneer Tikka Sandwich",
    visitFrequency: 6,
    averageOrderValue: 390,
    preferredTime: "Evening",
    lastVisit: "1 day ago",
    lastVisitDays: 1,
    engagementScore: 74,
    customerLifetimeValue: 28080,
    segment: "loyal",
    channel: "Mobile App",
    paymentPreference: "Starbucks App",
    avatarColor: "#6F4E37",
    joinedDate: "Oct 2022",
  },
  {
    id: "C-1012",
    name: "Neha Singh",
    age: 23,
    location: "Gurugram",
    loyaltyTier: "Gold",
    stars: 160,
    favoriteCategory: "Merchandise",
    favoriteProduct: "Steel Tumbler + Latte",
    visitFrequency: 4,
    averageOrderValue: 620,
    preferredTime: "Evening",
    lastVisit: "6 days ago",
    lastVisitDays: 6,
    engagementScore: 68,
    customerLifetimeValue: 29760,
    segment: "occasional",
    channel: "Both",
    paymentPreference: "Starbucks App",
    avatarColor: "#CBA258",
    joinedDate: "Apr 2023",
  },
];

// Headline demo customer
export const AARAV = customers[0];

// Star threshold at which the next reward unlocks (demo model).
export const NEXT_REWARD = 200;

// ---------------------------------------------------------------------------
// Orders — focus on Aarav plus a few others so the activity table feels live.
// ---------------------------------------------------------------------------

export const orders: Order[] = [
  { id: "O-9001", customerId: "C-1001", product: "Java Chip Frappuccino", category: "Frappuccino", amount: 395, date: "2 days ago", time: "18:42" },
  { id: "O-9002", customerId: "C-1001", product: "Cappuccino", category: "Coffee", amount: 280, date: "5 days ago", time: "19:10" },
  { id: "O-9003", customerId: "C-1001", product: "Java Chip Frappuccino", category: "Frappuccino", amount: 420, date: "8 days ago", time: "18:25" },
  { id: "O-9004", customerId: "C-1001", product: "Chocolate Croissant", category: "Food", amount: 220, date: "11 days ago", time: "18:50" },
  { id: "O-9005", customerId: "C-1001", product: "Java Chip Frappuccino", category: "Frappuccino", amount: 450, date: "14 days ago", time: "19:05" },
  { id: "O-9006", customerId: "C-1002", product: "Caffè Americano", category: "Coffee", amount: 480, date: "Today", time: "08:15" },
  { id: "O-9007", customerId: "C-1003", product: "Matcha Latte", category: "Tea", amount: 360, date: "1 day ago", time: "14:20" },
  { id: "O-9008", customerId: "C-1005", product: "Cappuccino", category: "Coffee", amount: 280, date: "9 days ago", time: "19:30" },
  { id: "O-9009", customerId: "C-1008", product: "Flat White", category: "Coffee", amount: 540, date: "Today", time: "07:50" },
  { id: "O-9010", customerId: "C-1011", product: "Paneer Tikka Sandwich", category: "Food", amount: 390, date: "1 day ago", time: "20:10" },
];

// ---------------------------------------------------------------------------
// Segments — counts intentionally sum to the Total Customers KPI (12,480).
// ---------------------------------------------------------------------------

export const segments: Segment[] = [
  {
    id: "vip",
    label: "VIP / High Value",
    count: 860,
    avgSpend: 612,
    avgVisits: 11.4,
    engagement: "High",
    accent: "oklch(0.46 0.11 158)",
    crmAction: "Provide exclusive rewards and early access to new launches.",
    description: "Top spenders and most frequent visitors.",
  },
  {
    id: "loyal",
    label: "Loyal Regulars",
    count: 3780,
    avgSpend: 410,
    avgVisits: 6.2,
    engagement: "High",
    accent: "oklch(0.62 0.1 180)",
    crmAction: "Reward consistency with double-star weekends and milestone perks.",
    description: "Repeat customers with steady visit cadence.",
  },
  {
    id: "occasional",
    label: "Occasional Customers",
    count: 4200,
    avgSpend: 318,
    avgVisits: 2.6,
    engagement: "Medium",
    accent: "oklch(0.78 0.12 80)",
    crmAction: "Increase visit frequency with category-based nudges.",
    description: "Visit infrequently but spend reasonably per trip.",
  },
  {
    id: "new",
    label: "New Customers",
    count: 2400,
    avgSpend: 296,
    avgVisits: 1.2,
    engagement: "Medium",
    accent: "oklch(0.5 0.07 50)",
    crmAction: "Encourage a second purchase through a welcome reward.",
    description: "Recently joined, habit not yet formed.",
  },
  {
    id: "at-risk",
    label: "At-Risk Customers",
    count: 1240,
    avgSpend: 264,
    avgVisits: 1.4,
    engagement: "Low",
    accent: "oklch(0.62 0.18 25)",
    crmAction: "Send personalized re-engagement offers tied to their favorite product.",
    description: "Purchase frequency has declined sharply.",
  },
];

// ---------------------------------------------------------------------------
// KPIs — all SIMULATED.
// ---------------------------------------------------------------------------

export const kpis = {
  totalCustomers: 12480,
  activeCustomers: 8920,
  loyaltyMembers: 7340,
  averageOrderValue: 386,
  repeatPurchaseRate: 68, // %
  atRiskCustomers: 1240,
  monthlyRevenue: 4820000, // INR demo
  avgEngagement: 72, // %
};

// 6-month engagement + revenue trend (demo)
export const monthlyTrend = [
  { month: "Jul", customers: 10240, revenue: 4100000, engagement: 64 },
  { month: "Aug", customers: 10780, revenue: 4280000, engagement: 66 },
  { month: "Sep", customers: 11120, revenue: 4460000, engagement: 68 },
  { month: "Oct", customers: 11560, revenue: 4590000, engagement: 69 },
  { month: "Nov", customers: 11980, revenue: 4710000, engagement: 71 },
  { month: "Dec", customers: 12480, revenue: 4820000, engagement: 72 },
];

// Category share (demo)
export const categoryShare = [
  { name: "Coffee", value: 38, color: "oklch(0.46 0.11 158)" },
  { name: "Frappuccino", value: 27, color: "oklch(0.78 0.12 80)" },
  { name: "Tea", value: 14, color: "oklch(0.62 0.1 180)" },
  { name: "Food", value: 16, color: "oklch(0.5 0.07 50)" },
  { name: "Merchandise", value: 5, color: "oklch(0.62 0.18 25)" },
];

// Preferred visit time distribution (demo)
export const visitTimeShare = [
  { time: "Morning", visits: 4200 },
  { time: "Afternoon", visits: 2100 },
  { time: "Evening", visits: 4600 },
  { time: "Night", visits: 1580 },
];

// ---------------------------------------------------------------------------
// Existing demo offers.
// ---------------------------------------------------------------------------

export const offers: Offer[] = [
  {
    id: "OFF-01",
    customerId: "C-1001",
    title: "We saved your evening.",
    description: "Get 20% off your favorite Java Chip Frappuccino today.",
    reason:
      "Aarav frequently orders Frappuccinos in the evening and has not visited in 2+ days.",
    rules: ["favoriteCategory=Frappuccino", "preferredTime=Evening", "lastVisitDays>=2"],
    segment: "loyal",
    preference: "Frappuccino",
    objective: "Re-engage",
    status: "Sent",
    discount: "20% OFF",
  },
  {
    id: "OFF-02",
    customerId: "C-1005",
    title: "Come back to your favorite.",
    description: "Enjoy 20% off your next Cappuccino — we miss you.",
    reason:
      "Rohan's visit frequency dropped and his last visit was 9 days ago. Favorite category: Coffee.",
    rules: ["lastVisitDays>=7", "favoriteCategory=Coffee"],
    segment: "at-risk",
    preference: "Coffee",
    objective: "Re-engage",
    status: "Sent",
    discount: "20% OFF",
  },
  {
    id: "OFF-03",
    customerId: "C-1002",
    title: "A Platinum thank-you.",
    description: "Double Stars on your next two morning Americanos.",
    reason:
      "Diya is a Platinum VIP who visits almost daily. Rewarding loyalty reinforces the habit.",
    rules: ["segment=vip", "preferredTime=Morning"],
    segment: "vip",
    preference: "Coffee",
    objective: "Reward loyalty",
    status: "Redeemed",
    discount: "2X STARS",
  },
];

// ---------------------------------------------------------------------------
// Campaigns.
// ---------------------------------------------------------------------------

export const campaigns: Campaign[] = [
  {
    id: "CMP-01",
    name: "Welcome Back",
    tagline: "Re-engage lapsing customers with their favorite product.",
    targetSegment: "at-risk",
    objective: "Re-engage",
    sent: 1240,
    opened: 968,
    redeemed: 312,
    repeatPurchaseRate: 24,
  },
  {
    id: "CMP-02",
    name: "Double Stars Weekend",
    tagline: "Reward loyal regulars and protect visit frequency.",
    targetSegment: "loyal",
    objective: "Reward loyalty",
    sent: 3780,
    opened: 3024,
    redeemed: 1512,
    repeatPurchaseRate: 58,
  },
  {
    id: "CMP-03",
    name: "Your First Reward",
    tagline: "Convert first-time customers into a second visit.",
    targetSegment: "new",
    objective: "Increase frequency",
    sent: 2400,
    opened: 1680,
    redeemed: 720,
    repeatPurchaseRate: 31,
  },
  {
    id: "CMP-04",
    name: "Your Favorite Is Back",
    tagline: "Personalized push to high-value Frappuccino fans.",
    targetSegment: "vip",
    objective: "Increase order value",
    sent: 860,
    opened: 731,
    redeemed: 301,
    repeatPurchaseRate: 64,
  },
];

// ---------------------------------------------------------------------------
// CRM journey stages.
// ---------------------------------------------------------------------------

export const journeyStages: JourneyStage[] = [
  {
    id: "awareness",
    label: "Awareness",
    description: "Customer discovers Starbucks through app store, store visit or referral.",
    detail:
      "CRM captures acquisition source. First behavioral signals are recorded (channel, location, time).",
  },
  {
    id: "first-purchase",
    label: "First Purchase",
    description: "First transaction is logged with product, value and time.",
    detail:
      "The system records the category and time-of-day preference — the seed of future personalization.",
  },
  {
    id: "app-registration",
    label: "App Registration",
    description: "Customer joins Starbucks Rewards.",
    detail:
      "An identity is created. Stars begin to accrue. The customer is now addressable for personalized offers.",
  },
  {
    id: "rewards",
    label: "Rewards",
    description: "Stars are redeemed for the first time.",
    detail:
      "Redemption behavior signals habit formation. Loyalty tier progression begins.",
  },
  {
    id: "personalization",
    label: "Personalization",
    description: "CRM detects a favorite product and preferred time.",
    detail:
      "Preference detected: Frappuccino, Evening. Personalized recommendation generated. Offer delivered through app. Customer returns.",
  },
  {
    id: "repeat-purchase",
    label: "Repeat Purchase",
    description: "Visit frequency crosses the habit threshold.",
    detail:
      "The customer now visits 4–5 times per month. Repeat-purchase rate and AOV stabilize.",
  },
  {
    id: "loyal",
    label: "Loyal Customer",
    description: "Customer reaches Gold tier with consistent engagement.",
    detail:
      "Customer Lifetime Value is projected. CRM action shifts from acquisition to retention and advocacy.",
  },
];

// ---------------------------------------------------------------------------
// The CRM loop — circular.
// ---------------------------------------------------------------------------

export const crmLoop: CrmLoopStep[] = [
  { id: "collect", label: "COLLECT", sub: "Customer Data", icon: "Database" },
  { id: "understand", label: "UNDERSTAND", sub: "Customer Behavior", icon: "Brain" },
  { id: "segment", label: "SEGMENT", sub: "Customer Groups", icon: "Users" },
  { id: "personalize", label: "PERSONALIZE", sub: "Offers & Experience", icon: "Sparkles" },
  { id: "engage", label: "ENGAGE", sub: "Rewards & Communication", icon: "Bell" },
  { id: "retain", label: "RETAIN", sub: "Repeat Customers", icon: "Heart" },
  { id: "learn", label: "LEARN", sub: "New Customer Data", icon: "RefreshCw" },
];

// ---------------------------------------------------------------------------
// Rewards catalog (demo).
// ---------------------------------------------------------------------------

export const rewardsCatalog = [
  { id: "RW-1", stars: 25, title: "Free Customization", desc: "Add an extra shot or syrup at no cost.", tier: "Green" },
  { id: "RW-2", stars: 50, title: "Free Brewed Coffee", desc: "A tall hot or iced brewed coffee on us.", tier: "Green" },
  { id: "RW-3", stars: 100, title: "Free Handcrafted Drink", desc: "Any tall handcrafted beverage, your choice.", tier: "Gold" },
  { id: "RW-4", stars: 200, title: "Free Food Item", desc: "Pick any bakery or sandwich up to ₹350.", tier: "Gold" },
  { id: "RW-5", stars: 400, title: "Birthday Reward", desc: "A complimentary drink on your birthday month.", tier: "Platinum" },
  { id: "RW-6", stars: 0, title: "Personalized Offers", desc: "Surprise offers tailored to your taste.", tier: "All" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getCustomer(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export function getCustomerOrders(id: string): Order[] {
  return orders.filter((o) => o.customerId === id);
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export const segmentLabels: Record<SegmentId, string> = {
  vip: "VIP / High Value",
  loyal: "Loyal Regulars",
  occasional: "Occasional",
  new: "New",
  "at-risk": "At Risk",
};

export const segmentDotColor: Record<SegmentId, string> = {
  vip: "bg-[oklch(0.46_0.11_158)]",
  loyal: "bg-[oklch(0.62_0.1_180)]",
  occasional: "bg-[oklch(0.78_0.12_80)]",
  new: "bg-[oklch(0.5_0.07_50)]",
  "at-risk": "bg-[oklch(0.62_0.18_25)]",
};
