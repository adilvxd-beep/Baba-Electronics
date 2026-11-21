import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cpu, ShieldCheck, Truck, Receipt, RefreshCw, PhoneCall, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-400 text-sm">
      {/* Trust & Guarantees Section */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/40">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">25+ Years Legacy</p>
              <p className="text-xs text-slate-400">Trusted offline & online in India</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Pan-India Express</p>
              <p className="text-xs text-slate-400">Shiprocket automated dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Verified GST Invoicing</p>
              <p className="text-xs text-slate-400">Instant ITC-ready PDF invoice</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
          <Link href="/" className="inline-block mb-4">
            <div className="bg-white rounded-lg p-2 inline-block shadow-sm">
              <Image
                src="/header-logo.png"
                alt="Baba Electronics"
                width={160}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </div>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400 mb-4">
            Specialists in IoT development boards, custom electronic billboards, logo sync boards, sensors, and electronic components since 2001.
          </p>
          <div className="space-y-1.5 text-xs text-slate-400">
            <p className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 98XXX XXXXX (Mon-Sat 10am-7pm)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>support@babaelectronics.in</span>
            </p>
            <p className="text-xs text-slate-500 pt-1">
              GSTIN: Verified Registered Entity (Details on Invoices)
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Catalog & Dev Kits</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/catalog" className="hover:text-amber-400 transition-colors">All Products Catalog</Link></li>
            <li><Link href="/categories/esp32" className="hover:text-amber-400 transition-colors">ESP32 & IoT Dev Boards</Link></li>
            <li><Link href="/categories/arduino" className="hover:text-amber-400 transition-colors">Arduino Compatible Boards</Link></li>
            <li><Link href="/categories/sensors" className="hover:text-amber-400 transition-colors">Digital & Analog Sensors</Link></li>
            <li><Link href="/categories/switches" className="hover:text-amber-400 transition-colors">Tactile & Industrial Switches</Link></li>
            <li><Link href="/categories/starter-kits" className="hover:text-amber-400 transition-colors">Component Starter Kits</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">B2B & Custom Engineering</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/custom-build" className="hover:text-amber-400 transition-colors">Custom Billboard Quotations</Link></li>
            <li><Link href="/custom-build" className="hover:text-amber-400 transition-colors">Logo Sync Boards Spec Sheet</Link></li>
            <li><Link href="/quick-order" className="hover:text-amber-400 transition-colors">Wholesale Bulk Matrix</Link></li>
            <li><Link href="/auth/login" className="hover:text-amber-400 transition-colors">Business GST Registration</Link></li>
            <li><Link href="/wholesale-matrix" className="hover:text-amber-400 transition-colors">Bulk Volume Pricing Slabs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Customer Care & Support</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/account" className="hover:text-amber-400 transition-colors">Track Shiprocket Parcel</Link></li>
            <li><Link href="/terms/b2b" className="hover:text-amber-400 transition-colors">Returns & Warranty Claims</Link></li>
            <li><Link href="/terms/shipping" className="hover:text-amber-400 transition-colors">Shipping & Delivery Rates</Link></li>
            <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy & Terms</Link></li>
            <li><Link href="/custom-build" className="hover:text-amber-400 transition-colors">Contact Our Engineering Desk</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="border-t border-slate-900 py-6 text-xs text-slate-500">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Baba Electronics. All rights reserved. Prices in INR inclusive/exclusive of GST as stated.</p>
          <p className="text-slate-400">
            Designed & Developed by{" "}
            <span className="text-slate-200 font-medium tracking-wide">
              VisionX Digital
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
