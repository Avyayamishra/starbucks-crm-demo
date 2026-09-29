import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starbucks CRM MVP — Brewing Loyalty",
  description:
    "Academic CRM MVP demonstrating how Starbucks-inspired customer data, segmentation, personalization, loyalty and engagement work together.",
  keywords: [
    "Starbucks",
    "CRM",
    "Customer Relationship Management",
    "Loyalty",
    "Personalization",
    "Segmentation",
    "BBA",
    "MBA",
    "IT for Managers",
  ],
  authors: [{ name: "BBA-MBA Integrated Project" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster richColors position="top-right" />
      </body>
    </html>
  );
}
