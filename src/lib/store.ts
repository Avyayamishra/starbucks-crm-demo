"use client";

import { create } from "zustand";
import {
  AARAV,
  customers as seedCustomers,
  offers as seedOffers,
  NEXT_REWARD,
  type Customer,
  type Offer,
  type OfferObjective,
  type PreferenceCategory,
  type SegmentId,
} from "@/lib/data";

export type CrmView =
  | "dashboard"
  | "customers"
  | "customer-360"
  | "segments"
  | "offers"
  | "loyalty"
  | "campaigns"
  | "analytics"
  | "crm-actions"
  | "customer-view"
  | "presentation";

interface AppState {
  // navigation
  view: CrmView;
  setView: (v: CrmView) => void;

  // customer search/filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  segmentFilter: SegmentId | "all";
  setSegmentFilter: (s: SegmentId | "all") => void;

  // selected customer (defaults to Aarav so the demo always has a hero)
  selectedCustomerId: string;
  selectCustomer: (id: string) => void;

  // offers created in-session
  offers: Offer[];
  addOffer: (o: Offer) => void;
  redeemOffer: (id: string) => void;

  // loyalty stars for Aarav (mutable so a live demo can add stars)
  aaravStars: number;
  addStars: (n: number) => void;

  // presentation mode step
  presentationStep: number;
  setPresentationStep: (n: number) => void;

  // helper selectors
  customers: Customer[];
}

export const useCrmStore = create<AppState>((set) => ({
  view: "dashboard",
  setView: (v) => set({ view: v }),

  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  segmentFilter: "all",
  setSegmentFilter: (s) => set({ segmentFilter: s }),

  selectedCustomerId: AARAV.id,
  selectCustomer: (id) => set({ selectedCustomerId: id }),

  offers: seedOffers,
  addOffer: (o) => set((s) => ({ offers: [o, ...s.offers] })),
  redeemOffer: (id) =>
    set((s) => ({
      offers: s.offers.map((o) =>
        o.id === id ? { ...o, status: "Redeemed" } : o
      ),
    })),

  aaravStars: AARAV.stars,
  addStars: (n) => set((s) => ({ aaravStars: s.aaravStars + n })),

  presentationStep: 0,
  setPresentationStep: (n) => set({ presentationStep: n }),

  customers: seedCustomers,
}));

export { NEXT_REWARD };
