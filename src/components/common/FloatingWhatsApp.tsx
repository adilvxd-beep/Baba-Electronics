"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "919990333434";
  const message = encodeURIComponent(
    "Hello Baba Electronics, I would like to inquire about LED Exit & Wayfinding Signage."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside 
      aria-label="Contact via WhatsApp" 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5"
    >
      {/* Interactive Tooltip Callout */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-xl border border-slate-700 transition-all duration-300 ${
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <span>Chat with us on WhatsApp</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(false);
          }}
          className="text-slate-400 hover:text-white"
          aria-label="Close message"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        title="Chat with Baba Electronics on WhatsApp (+91 99903 33434)"
        aria-label="Chat on WhatsApp +91 99903 33434"
      >
        {/* Animated Green Pulse Radar */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:hidden" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-transparent group-hover:scale-105 transition-transform" />

        {/* Online Indicator Badge */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full" />
      </a>
    </aside>
  );
}
