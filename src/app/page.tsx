"use client";

import React from "react";
import Link from "next/link";
import { 
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { PopularCategories } from "@/components/home/PopularCategories";
import { DealsOfTheDay } from "@/components/home/DealsOfTheDay";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { MobileAppSection } from "@/components/home/MobileAppSection";
import { ClientTestimonials } from "@/components/home/ClientTestimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 pb-16 pt-4">
      <div className="container mx-auto px-4 space-y-10">
        {/* 1. Main Hero Carousel & Side Promos */}
        <HeroCarousel />

        {/* 2. Trust & Guarantees Strip */}
        <TrustBadges />

        {/* 3. Popular Categories (Rounded/Circular Icon Grid) */}
        <PopularCategories />

        {/* 4. Deals of the Day / Hot Products with Countdown */}
        <DealsOfTheDay />

        {/* 5. Featured Category 1: Emergency & Fire Exit Signs */}
        <CategoryShowcase
          categoryTitle="LED Fire & Emergency Exit Sign Boards"
          categorySubtitle="ISO 7010 running man, directional arrows, and NBC 2016 compliant escape indicators"
          categoryFilter="Fire & Emergency Exit"
          categorySlug="fire-emergency-exit"
          subcategories={["Right Arrow", "Left Arrow", "Door Header", "Master Banner"]}
        />

        {/* 6. Featured Category 2: Multilingual & Facility Wayfinding Signs */}
        <CategoryShowcase
          categoryTitle="Multilingual & Wayfinding LED Light Boards"
          categorySubtitle="Hindi-English bilingual escape signs, restroom indicators, and elevator markers"
          categoryFilter="Signs"
          categorySlug="multilingual-safety-signs"
          subcategories={["Bilingual NBC", "Restroom & Toilet", "Elevator & Stairs", "Utility Shaft"]}
        />

        {/* 7. Mobile App & WhatsApp Quick Ordering Section */}
        <MobileAppSection />

        {/* 8. B2B & Wholesale Quick-Order Banner */}
        <section className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>B2B & Bulk Wholesale Procurement</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Rapid Matrix Ordering for Commercial Projects
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Order hundreds of emergency exit signs, directional glow boards, and custom architectural signage on a single high-speed screen. Enter GSTIN during checkout for instant input tax credit (ITC) invoices.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/quick-order">
              <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md">
                Open Bulk Order Matrix
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="w-full border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white">
                Register Business Account
              </Button>
            </Link>
          </div>
        </section>

        {/* 9. Client Testimonials & Institutional Trust */}
        <ClientTestimonials />
      </div>
    </div>
  );
}
