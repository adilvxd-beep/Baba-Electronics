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
      {/* Sleek, Lean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Hot Deals & Fast Movers
          </h2>

          {/* Minimalist Countdown Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono font-bold text-slate-900">
              {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Modern Segmented Pill Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
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
