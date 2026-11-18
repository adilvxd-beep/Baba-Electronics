import React from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, Truck, Receipt, RefreshCw, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-400 text-sm">
      {/* Trust & Guarantees Section */}
      <div className="border-b border-slate-800 py-8">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">25+ Years Legacy</p>
              <p className="text-xs text-slate-400">Trusted offline & online</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Pan-India Courier</p>
              <p className="text-xs text-slate-400">Shiprocket automated fulfillment</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Verified GST Invoicing</p>
              <p className="text-xs text-slate-400">Instant PDF + Tally format</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">7-Day Return Policy</p>
              <p className="text-xs text-slate-400">Defect replacement warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3 font-bold text-white text-lg">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white">
              <Cpu className="w-4 h-4" />
            </div>
            <span>BABA Electronics</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 mb-4">
            Specialists in IoT development boards, custom electronic billboards, logo sync boards, sensors, and electronic components since 2001.
          </p>
          <p className="text-xs text-slate-500">
            GSTIN: Registered Entity (Details on Invoices)
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Catalog & Dev Kits</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/categories/esp32" className="hover:text-white transition-colors">ESP32 & IoT Dev Boards</Link></li>
            <li><Link href="/categories/arduino" className="hover:text-white transition-colors">Arduino Compatible Boards</Link></li>
            <li><Link href="/categories/sensors" className="hover:text-white transition-colors">Digital & Analog Sensors</Link></li>
            <li><Link href="/categories/switches" className="hover:text-white transition-colors">Tactile & Industrial Switches</Link></li>
            <li><Link href="/categories/starter-kits" className="hover:text-white transition-colors">Component Starter Kits</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">B2B & Custom Engineering</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/custom-build" className="hover:text-white transition-colors">Custom Billboard Quotations</Link></li>
            <li><Link href="/custom-build" className="hover:text-white transition-colors">Logo Sync Boards Spec Sheet</Link></li>
            <li><Link href="/quick-order" className="hover:text-white transition-colors">Wholesale Bulk Matrix</Link></li>
            <li><Link href="/auth/login" className="hover:text-white transition-colors">Business GST Registration</Link></li>
            <li><Link href="/terms/b2b" className="hover:text-white transition-colors">Bulk Volume Pricing Slabs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Customer Care</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/track-order" className="hover:text-white transition-colors">Track Shiprocket Parcel</Link></li>
            <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Warranty Claims</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery Rates</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy & DLT Terms</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Our Engineering Desk</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Baba Electronics. All rights reserved. Prices in INR inclusive/exclusive of GST as stated.</p>
      </div>
    </footer>
  );
}
