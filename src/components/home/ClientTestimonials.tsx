"use client";

import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dr. Ramesh Sharma",
    role: "HOD, Electronics & Communication",
    org: "Engineering Institute, Pune",
    rating: 5,
    comment:
      "We procured 60 ESP32 dev boards and sensor kits for our IoT lab. Delivery was within 48 hours, packaging was top-notch, and the GST invoice with valid ITC was generated immediately.",
  },
  {
    name: "Aditya Patil",
    role: "Hardware Architect",
    org: "AgriTech Solutions, Bengaluru",
    rating: 5,
    comment:
      "Ordered custom logo sync boards and DHT22 modules. The technical team at Baba Electronics verified our Gerber files and ensured 100% pin compatibility before dispatch. Outstanding service!",
  },
  {
    name: "Vikram Singhania",
    role: "Maker & Embedded Developer",
    org: "Mumbai",
    rating: 5,
    comment:
      "The no-nonsense transparent pricing and bulk discounts make Baba Electronics my go-to store. Getting actual base price plus GST breakdown helps calculate BOM costs accurately.",
  },
];

export function ClientTestimonials() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Engineers, Colleges & Makers
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Real feedback from 25+ years of electronics distribution & custom hardware manufacturing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> Verified Buyer
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{t.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
              <p className="text-[11px] text-slate-500 font-medium">{t.role} • {t.org}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
