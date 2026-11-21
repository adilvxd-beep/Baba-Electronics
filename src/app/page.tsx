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

        {/* 5. Featured Category 1: Sensors & Modules */}
        <CategoryShowcase
          categoryTitle="Wide Range of Sensors & Modules"
          categorySubtitle="Precision temperature, gas, motion, ultrasonic and soil testing modules for embedded systems"
          categoryFilter="Sensors"
          categorySlug="sensors"
          bannerImage="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
          badgeText="High Precision"
          themeColor="amber"
        />

        {/* 6. Featured Category 2: IoT & Dev Kits */}
        <CategoryShowcase
          categoryTitle="IoT & Microcontroller Dev Boards"
          categorySubtitle="ESP32 dual-core Wi-Fi + BLE, Arduino compatibles, and low-power microcontrollers"
          categoryFilter="IoT"
          categorySlug="esp32"
          bannerImage="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
          badgeText="Ready Stock"
          themeColor="slate"
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
              Rapid Matrix Ordering for Production Runs
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Order hundreds of microcontrollers and sensors with variant matrices on a single high-speed screen. Enter GSTIN during checkout for instant input tax credit (ITC) invoices.
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
