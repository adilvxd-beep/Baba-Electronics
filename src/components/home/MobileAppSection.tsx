"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Smartphone, 
  MessageSquare, 
  Bell, 
  Download, 
  Receipt, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function MobileAppSection() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Baba Electronics App",
        text: "Order IoT Boards, Sensors & Dev Kits with Instant GST Invoices",
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/70 text-white p-6 md:p-12 border border-slate-800 shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.12),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App & WhatsApp Quick Commerce</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Order IoT Hardware & Custom Boards <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">On The Go</span>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
            Install the Baba Electronics mobile app directly to your home screen with zero app store friction. Get automated WhatsApp shipping updates, download GST invoices instantly, and track orders in real-time.
          </p>

          {/* Core Feature Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-semibold">WhatsApp Order Desk</strong>
                <span>One-tap reorders & live dispatch tracking</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Receipt className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-semibold">Instant GST Invoices</strong>
                <span>Download ITC PDF invoices directly on phone</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <strong className="text-white block font-semibold">Offline Access (PWA)</strong>
                <span>Browse cached datasheets without network</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-semibold">Verified Mobile OTP</strong>
                <span>Passwordless login via SMS & WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="https://wa.me/919990333434?text=Hi%20Baba%20Electronics%2C%20I%20would%20like%20to%20place%20an%20order%20for%20LED%20signage"
              target="_blank"
              rel="noreferrer"
            >
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm h-11 px-5 flex items-center gap-2 shadow-lg shadow-emerald-900/40">
                <MessageSquare className="w-4 h-4" /> Order via WhatsApp
              </Button>
            </a>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-xs md:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <Share2 className="w-4 h-4" /> {copied ? "Link Copied!" : "Share / Install App"}
            </button>
          </div>
        </div>

        {/* Right Phone Mockup Card (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-xs rounded-3xl bg-slate-900 border-4 border-slate-700/80 p-4 shadow-2xl relative">
            {/* Top Phone Speaker / Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

            {/* Inner Phone Screen Content */}
            <div className="rounded-2xl bg-white p-3 space-y-3 text-slate-900">
              {/* App Header Inside Phone */}
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-1.5">
                  <Image
                    src="/logo.png"
                    alt="Baba Electronics"
                    width={28}
                    height={28}
                    className="h-7 w-auto object-contain"
                  />
                  <span className="font-bold text-xs text-slate-900">Baba Electronics</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Sample Notification */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-left space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-900">
                  <span>Shiprocket Dispatch Alert</span>
                  <span className="text-slate-400">Just now</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-tight">
                  AWB #9823101: Your ESP32-WROOM order is out for delivery!
                </p>
              </div>

              {/* Quick Actions List */}
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between font-medium">
                  <span className="text-slate-700">GST Invoice PDF</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Ready</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between font-medium">
                  <span className="text-slate-700">Custom Billboard Quote #401</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Approved</span>
                </div>
              </div>

              <div className="pt-1">
                <div className="w-full py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-center text-xs shadow-sm">
                  1-Tap WhatsApp Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
