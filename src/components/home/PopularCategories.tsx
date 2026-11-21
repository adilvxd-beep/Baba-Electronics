"use client";

import React from "react";
import Link from "next/link";
import { 
  Cpu, 
  Zap, 
  Wrench, 
  Layers, 
  ToggleLeft, 
  Bot, 
  Radio, 
  ArrowRight 
} from "lucide-react";

const CATEGORIES = [
  {
    name: "ESP32 & IoT Dev",
    slug: "esp32",
    count: "18+ Models",
    icon: Cpu,
    bgColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    name: "Arduino Boards",
    slug: "arduino",
    count: "24+ Models",
    icon: Radio,
    bgColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    name: "Digital Sensors",
    slug: "sensors",
    count: "45+ SKUs",
    icon: Zap,
    bgColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  {
    name: "Logo & Billboards",
    slug: "custom-billboards",
    count: "Bespoke Builds",
    icon: Wrench,
    bgColor: "bg-slate-900 text-amber-400 border-slate-700",
  },
  {
    name: "Robotics & Motors",
    slug: "robotics",
    count: "30+ Parts",
    icon: Bot,
    bgColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  {
    name: "Component Kits",
    slug: "starter-kits",
    count: "12+ Starter Sets",
    icon: Layers,
    bgColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  {
    name: "Industrial Switches",
    slug: "switches",
    count: "50+ Types",
    icon: ToggleLeft,
    bgColor: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  },
];

export function PopularCategories() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Popular Categories
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Browse our core catalog of microcontrollers, sensor modules and bespoke engineering
          </p>
        </div>
        <Link 
          href="/catalog" 
          className="text-xs md:text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link
              key={idx}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-2.5 transition-transform group-hover:scale-110 duration-200 ${cat.bgColor}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-xs text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {cat.count}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
