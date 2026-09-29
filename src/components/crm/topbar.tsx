"use client";

import { Bell, Menu, Search, Smartphone, Presentation } from "lucide-react";
import { useCrmStore } from "@/lib/store";
import { customers } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/crm/sidebar";

export function TopBar() {
  const setSearchQuery = useCrmStore((s) => s.setSearchQuery);
  const setView = useCrmStore((s) => s.setView);
  const selectCustomer = useCrmStore((s) => s.selectCustomer);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    // auto-pick the first match for Aarav to make the demo flow frictionless
    if (q.trim().length >= 2) {
      const hit = customers.find((c) =>
        c.name.toLowerCase().includes(q.toLowerCase())
      );
      if (hit) selectCustomer(hit.id);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-6">
      {/* Mobile sidebar trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex items-center gap-2">
        <span className="text-sm font-semibold tracking-tight">Starbucks CRM</span>
        <span className="hidden lg:inline text-xs text-muted-foreground">
          · Customer Relationship Management
        </span>
      </div>

      {/* Search */}
      <div className="relative ml-auto w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          onChange={onSearch}
          onFocus={() => setView("customers")}
          placeholder="Search customer… e.g. Aarav Sharma"
          className="h-9 rounded-full pl-9 pr-4 bg-secondary/60 border-transparent focus-visible:border-ring focus-visible:bg-background"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 md:ml-3">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => setView("customer-view")}
        >
          <Smartphone className="size-4" />
          <span className="hidden md:inline">Customer View</span>
        </Button>
        <Button
          variant="default"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => setView("presentation")}
        >
          <Presentation className="size-4" />
          <span className="hidden md:inline">Presentation Mode</span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[oklch(0.62_0.18_25)]" />
        </Button>
        <Avatar className="size-9 border border-border">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            CRM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
