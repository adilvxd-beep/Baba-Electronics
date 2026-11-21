"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SAMPLE_PRODUCTS } from "@/lib/catalog/data";

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
    { id: "ALL", label: "All Items" },
    { id: "IoT & Dev Boards", label: "IoT & Dev Boards" },
    { id: "Sensors", label: "Sensors" },
    { id: "Custom Engineering", label: "Custom Builds" },
  ];

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    if (activeTab === "ALL") return true;
    return p.category.toLowerCase().includes(activeTab.toLowerCase());
  }).slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Linear Border Section Header (Robosap / Martfury Style) */}
      <div className="border-b-2 border-slate-200 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pb-3 -mb-[14px] border-b-2 border-amber-500 inline-block">
              Hot Deals & Fast Movers
            </h2>
          </div>

          {/* Minimalist Countdown Badge (Robosap style) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="text-[11px] text-amber-700 font-medium uppercase tracking-wider">Ends In:</span>
            <span className="font-mono font-bold text-slate-900">
              {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Inline Category Tabs & View All along the divider */}
        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-5 overflow-x-auto">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="/catalog"
            className="text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 shrink-0 group ml-2"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Modern, Spacious 4-Column Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
