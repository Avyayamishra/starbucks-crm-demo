---
Task ID: 1
Agent: main (Z.ai Code)
Task: Build a complete Starbucks-inspired CRM MVP as a Next.js single-page application for an academic "IT for Managers" presentation ("Brewing Loyalty: The Starbucks Secret").

Work Log:
- Read existing project scaffolding (Next.js 16 + TS + Tailwind 4 + shadcn/ui + Recharts + Zustand + sonner). Dev server already running on port 3000.
- Re-themed globals.css with a Starbucks-inspired palette: cream background, Starbucks green primary, espresso/gold/brown accents, plus a dark mode variant. Added utility classes (dot-grid, scroll-area-thin, animate-fade-up, slow-spin) and a custom thin scrollbar.
- Updated src/app/layout.tsx with project metadata (title "Starbucks CRM MVP — Brewing Loyalty"), Geist font, and both toaster (radix) + sonner toast providers.
- Created src/lib/data.ts — all TypeScript types (Customer, Order, Offer, Campaign, Segment, JourneyStage, CrmLoopStep) and SIMULATED demo data: 12 demo customers (Aarav Sharma as the headline Gold/Evening/Frappuccino customer), orders, 3 seeded offers, 4 campaigns, 5 segments (counts sum to 12,480), KPIs, 6-month trend, category & visit-time share, journey stages, CRM loop steps, rewards catalog, NEXT_REWARD constant, and helpers.
- Created src/lib/personalization.ts — a transparent, RULE-BASED personalization engine: buildOffer() maps (segment, preference, objective) → an offer headline + description + explainable reason + matched rules; autoPersonalize() generates the auto recommendation shown to a customer; toOffer() persists to the store. Engine is intentionally non-black-box (rules are shown as code chips).
- Created src/lib/store.ts — Zustand store managing: active view, search query, segment filter, selected customer (defaults to Aarav), session-created offers, mutable Aarav stars (live demo), presentation step.
- Built shared chrome: src/components/crm/sidebar.tsx (grouped nav: Manager Workspace / Customer Experience / Present + DATA→INSIGHT→ACTION footer), topbar.tsx (brand, customer search that auto-selects Aarav, Customer View + Presentation Mode shortcuts, notifications, avatar), footer.tsx (sticky footer with Demo Data badge), section-heading.tsx, kpi-card.tsx (5 tonal variants), customer-avatar.tsx (initials avatar + loyalty badge), demo-badge.tsx.
- Built charts: segment-donut, engagement-area, category-donut, visit-time-bar, revenue-line (Recharts, themed).
- Built all 10 views: Dashboard (hero greeting, 6 KPIs, engagement + segment charts, CRM action cards, recent activity table), Customers (search + segment filter + card grid + Aarav callout), Customer 360° (profile hero with star progress, 6 facet cards: Behavioral/Transactional/Loyalty/Engagement/Preferences/CRM Recommendation, purchase history table, timeline, engagement signals), Segments (donut + insight panel + segment cards), Offers (rule-based generator with segment/preference/objective selects + generated CRM action panel with reason & rules + active offers list), Loyalty (Aarav reward card + live add-stars demo + rewards catalog + tier ladder), Campaigns (summary KPIs + per-campaign open/redeem/repeat bars), Analytics (revenue line + category donut + visit-time bar + segment donut + KPIs), CRM Actions (DATA→INSIGHT→ACTION banner + per-segment action cards), Customer Experience (phone mockup with personalized recommendation/reward/recent orders + Before/After CRM + interactive Customer Journey + CRM Loop), Presentation Mode (8-slide guided walkthrough with Next/Prev + arrow-key support + final CRM loop slide).
- Wired everything in src/app/page.tsx: desktop sidebar + mobile Sheet sidebar + topbar + view router + sticky footer; Presentation Mode renders as a full-screen overlay with keyboard navigation (←/→/Esc).
- Ran `bun run lint` — clean, no errors.
- Fixed one build error discovered during agent-browser verification: NEXT_REWARD was imported from @/lib/data in several view files but only existed in @/lib/store. Consolidated by defining NEXT_REWARD in data.ts and re-exporting from store.ts.

Self-Verification (agent-browser):
- Loaded / at 1440x900: dashboard renders with KPIs, segment donut, engagement area chart, CRM action cards, recent activity table (Aarav rows visible).
- Clicked Aarav row → Customer 360° opens with profile, star progress, 6 facet cards, purchase history, timeline.
- Clicked "Create personalized offer" → Offers view; clicked "Generate Offer" → produced a generated CRM action with reason + rules + "Deliver to Aarav Sharma" button.
- Delivered offer, navigated to Customer View → phone mockup with "Good evening Aarav", personalized recommendation + redeem button, Before/After CRM comparison, interactive Customer Journey (stage 5 = Personalization), and CRM Loop all render.
- Entered Presentation Mode → stepped through all 8 slides (Customer Data → Customer 360° → Segmentation → Personalization → Loyalty → Campaign → Customer Experience → CRM Loop). All render.
- Mobile check at 390x844: no horizontal overflow, hamburger menu opens sidebar, all nav items present.
- Sticky footer verified: on a tall page footer is pushed down naturally (bottom ≈ scrollHeight, no overlap); layout uses min-h-screen flex flex-col pattern.
- Loyalty "+15 Stars" live demo: toast "+15 Stars added · Live demo: stars update instantly across the CRM" appears, stars mutate in store.
- Search "Aarav" filters the customer list to Aarav Sharma.
- After clearing console/errors and reloading: no runtime errors, no console errors, page returns 200.
- All 14 demo steps from the spec's "FINAL TEST" verified working.

Stage Summary:
- Complete, runnable Starbucks-inspired CRM MVP delivered as a single-route (/) Next.js app.
- All required modules implemented: Dashboard, Customers, Customer 360°, Segments, Offers (+ rule-based personalization engine), Loyalty, Campaigns, Analytics, CRM Actions, Customer Experience (phone + Before/After + Journey + Loop), Presentation Mode.
- Visual identity: Starbucks green + cream + gold/espresso accents, rounded cards, minimal shadows, sticky footer, responsive (desktop sidebar + mobile sheet), dark mode variables defined.
- Every simulated metric carries a "Demo Data" badge; academic disclaimer present on footer and final presentation slide.
- Dev server running clean on port 3000; lint clean; no runtime errors.
