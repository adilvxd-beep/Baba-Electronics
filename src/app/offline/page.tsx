"use client";

import React from "react";
import Link from "next/link";
import { WifiOff, RefreshCw, PhoneCall, Cpu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center space-y-6 max-w-md">
      <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center mx-auto shadow-sm">
        <WifiOff className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">You Are Currently Offline</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          It looks like your internet connection dropped. Any items in your shopping cart remain safely saved on your device.
        </p>
      </div>

      <div className="p-4 rounded-xl border bg-white text-xs text-slate-600 space-y-2 text-left">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <PhoneCall className="w-4 h-4 text-amber-600" /> Need Immediate Assistance?
        </div>
        <p>Call Baba Electronics dispatch desk directly at <strong>+91 99903 33434</strong> for urgent workshop component orders.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={() => window.location.reload()}
          size="sm"
          className="bg-amber-600 hover:bg-amber-700 text-white text-xs flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry Connection
        </Button>
        <Link href="/">
          <Button variant="outline" size="sm" className="w-full text-xs">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
