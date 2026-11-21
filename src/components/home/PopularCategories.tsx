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
    icon: Cpu,
    color: "text-amber-600 bg-amber-500/10",
  },
  {
    name: "Arduino Boards",
    slug: "arduino",
    icon: Radio,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    name: "Digital Sensors",
    slug: "sensors",
    icon: Zap,
    color: "text-amber-700 bg-amber-600/10",
  },
  {
    name: "Logo & Billboards",
    slug: "custom-billboards",
    icon: Wrench,
    color: "text-slate-800 bg-slate-100",
  },
  {
    name: "Robotics & Motors",
    slug: "robotics",
    icon: Bot,
    color: "text-purple-600 bg-purple-500/10",
  },
  {
    name: "Starter Kits",
    slug: "starter-kits",
    icon: Layers,
    color: "text-rose-600 bg-rose-500/10",
  },
  {
    name: "Industrial Switches",
    slug: "switches",
    icon: ToggleLeft,
    color: "text-sky-600 bg-sky-500/10",
  },
];

export function PopularCategories() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Explore by Category
        </h2>
        <Link 
          href="/catalog" 
          className="text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
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
