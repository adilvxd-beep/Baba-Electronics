"use client";

import React from "react";
import Link from "next/link";
import { 
  LogOut, 
  Languages, 
  Users, 
  Footprints, 
  AlertTriangle, 
  Compass, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Fire & Exit Signs",
    slug: "fire-emergency-exit",
    icon: LogOut,
    color: "text-rose-600 bg-rose-500/10",
  },
  {
    name: "Bilingual NBC Signs",
    slug: "multilingual-safety-signs",
    icon: Languages,
    color: "text-amber-600 bg-amber-500/10",
  },
  {
    name: "Restroom & Facility",
    slug: "restroom-facility-signs",
    icon: Users,
    color: "text-sky-600 bg-sky-500/10",
  },
  {
    name: "Lift & Stairways",
    slug: "lift-stairs-wayfinding",
    icon: Footprints,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    name: "Shaft & Zone Safety",
    slug: "industrial-zone-safety",
    icon: AlertTriangle,
    color: "text-amber-700 bg-amber-600/10",
  },
  {
    name: "Reception & Lobby",
    slug: "commercial-reception-signs",
    icon: Compass,
    color: "text-purple-600 bg-purple-500/10",
  },
  {
    name: "Custom Glow Signs",
    slug: "custom-build",
    icon: Sparkles,
    color: "text-slate-800 bg-slate-100",
  },
];

export function PopularCategories() {
  return (
    <section className="space-y-6">
      {/* Linear Border Section Header (Robosap / Martfury Style) */}
      <div className="border-b-2 border-slate-200 pb-3 flex items-end justify-between">
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pb-3 -mb-[14px] border-b-2 border-amber-500 inline-block">
            Explore by Category
          </h2>
        </div>
        <Link 
          href="/catalog" 
          className="text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link
              key={idx}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 duration-200 ${cat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-xs text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1">
                {cat.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
