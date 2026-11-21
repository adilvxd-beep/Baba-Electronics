"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Clock, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";

export function DealsOfTheDay() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 48 });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: "ALL", label: "All Hot Products" },
    { id: "IoT & Dev Boards", label: "IoT & Dev Boards" },
    { id: "Sensors", label: "Digital Sensors" },
    { id: "Custom Engineering", label: "Custom Builds" },
  ];

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    if (activeTab === "ALL") return true;
    return p.category.toLowerCase().includes(activeTab.toLowerCase());
  }).slice(0, 4);

  return (
    <section className="rounded-2xl bg-slate-900/5 p-4 sm:p-6 border border-slate-200/80 space-y-5">
      {/* Section Header with Countdown Timer (Robosap / Martfury signature) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
              <Flame className="w-5 h-5 fill-slate-950" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hot Deals & Fast Movers
            </h2>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px] text-amber-800">Ending in:</span>
            <span className="font-mono font-bold text-amber-900">
              {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <Link 
            href="/catalog" 
            className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline px-2 flex items-center gap-0.5 whitespace-nowrap"
          >
            View More &rarr;
          </Link>
        </div>
      </div>

      {/* Product Grid with borderless cards that reveal border on hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
