"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/crm/sidebar";
import { TopBar } from "@/components/crm/topbar";
import { Footer } from "@/components/crm/footer";
import { useCrmStore } from "@/lib/store";
import { DashboardView } from "@/components/crm/views/dashboard";
import { CustomersView } from "@/components/crm/views/customers";
import { Customer360View } from "@/components/crm/views/customer-360";
import { SegmentsView } from "@/components/crm/views/segments";
import { OffersView } from "@/components/crm/views/offers";
import { LoyaltyView } from "@/components/crm/views/loyalty";
import { CampaignsView } from "@/components/crm/views/campaigns";
import { AnalyticsView } from "@/components/crm/views/analytics";
import { CrmActionsView } from "@/components/crm/views/crm-actions";
import { CustomerExperienceView } from "@/components/crm/views/customer-view";
import { PresentationView } from "@/components/crm/views/presentation";

export default function Home() {
  const view = useCrmStore((s) => s.view);
  const setView = useCrmStore((s) => s.setView);
  const setStep = useCrmStore((s) => s.setPresentationStep);

  // Keyboard support for presentation mode (← / →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (view !== "presentation") return;
      if (e.key === "ArrowRight") {
        setStep(Math.min(7, useCrmStore.getState().presentationStep + 1));
      } else if (e.key === "ArrowLeft") {
        setStep(Math.max(0, useCrmStore.getState().presentationStep - 1));
      } else if (e.key === "Escape") {
        setView("dashboard");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, setStep, setView]);

  if (view === "presentation") {
    return <PresentationView />;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden w-64 shrink-0 border-r border-sidebar-border md:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 py-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            {view === "dashboard" && <DashboardView />}
            {view === "customers" && <CustomersView />}
            {view === "customer-360" && <Customer360View />}
            {view === "segments" && <SegmentsView />}
            {view === "offers" && <OffersView />}
            {view === "loyalty" && <LoyaltyView />}
            {view === "campaigns" && <CampaignsView />}
            {view === "analytics" && <AnalyticsView />}
            {view === "crm-actions" && <CrmActionsView />}
            {view === "customer-view" && <CustomerExperienceView />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
