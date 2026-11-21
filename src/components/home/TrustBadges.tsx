"use client";

import React from "react";
import { ShieldCheck, Truck, Receipt, RefreshCw, Headphones } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "25+ Years Legacy",
    description: "Trusted supplier since 2001",
  },
  {
    icon: Truck,
    title: "Pan-India Express",
    description: "Shiprocket automated dispatch",
  },
  {
    icon: Receipt,
    title: "100% Verified GST",
    description: "Instant ITC-ready PDF invoice",
  },
  {
    icon: RefreshCw,
    title: "7-Day Replacement",
    description: "Hassle-free defect warranty",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Hardware & pinout assistance",
  },
];

export function TrustBadges() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {TRUST_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3.5 px-3 py-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
