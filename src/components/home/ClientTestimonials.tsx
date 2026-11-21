"use client";

import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Manoj Chawla",
    role: "Chief Fire Safety Officer",
    org: "Commercial IT Tower, Pune",
    rating: 5,
    comment:
      "We procured 85 bilingual LED fire exit boards and hydrant indicators for our commercial tower. The 3-hour battery backup held up flawlessly during fire NOC inspection. Full GST invoice with valid ITC was generated immediately.",
  },
  {
    name: "Ar. Sneha Kulkarni",
    role: "Senior Architect",
    org: "Urban Spaces Design Studio, Mumbai",
    rating: 5,
    comment:
      "Specified Baba Electronics' edge-lit acrylic signage for a 4-floor retail commercial center. The laser engraving clarity and anodized aluminum profile look very upscale. Fast delivery and zero defects.",
  },
  {
    name: "Vikas Aggarwal",
    role: "Facility & Infrastructure Lead",
    org: "Metro Logistics Park, Bhiwandi",
    rating: 5,
    comment:
      "The high-luminance master exit banners gave us 35m+ visibility across our 40,000 sq ft warehouse. Direct manufacturer pricing and tiered volume discounts made procurement seamless.",
  },
];

export function ClientTestimonials() {
  return (
    <section className="space-y-6">
      {/* Linear Border Section Header (Robosap / Martfury Style) */}
      <div className="border-b-2 border-slate-200 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight pb-3 -mb-[14px] border-b-2 border-amber-500 inline-block">
            Trusted by Engineers, Colleges & Makers
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 pb-1">
          25+ years of verified industrial supply & precision hardware
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
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
