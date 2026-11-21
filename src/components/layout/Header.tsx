"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Cpu, 
  Menu, 
  X, 
  FileSpreadsheet, 
  Wrench,
  ShieldCheck,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart/store";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Banner for GST / Pan-India Delivery */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 25+ Years in Business
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">Pan-India Express Shipping & Verified GST Invoices</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <PhoneCall className="w-3 h-3" /> Technical Support: +91 99903 33434
            </span>
            <Link 
              href="/custom-build" 
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Request Custom Quote &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/header-logo.png"
            alt="Baba Electronics - आपका अपना Electronics Store"
            width={180}
            height={60}
            priority
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search exit signs, emergency glow boards, wayfinding, toilet signs..."
              className="w-full rounded-full border border-input bg-slate-50 px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Quick Actions (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/catalog" className="hover:text-amber-600 transition-colors">
            All Signage
          </Link>
          <Link href="/categories/fire-emergency-exit" className="hover:text-amber-600 transition-colors">
            Exit Signs
          </Link>
          <Link href="/custom-build" className="flex items-center gap-1 text-slate-900 hover:text-amber-600 transition-colors">
            <Wrench className="w-4 h-4 text-amber-600" /> Custom Signs
          </Link>
          <Link href="/quick-order" className="flex items-center gap-1 text-slate-600 hover:text-amber-600 transition-colors">
            <FileSpreadsheet className="w-4 h-4 text-amber-600" /> Quick Order
          </Link>
        </nav>

        {/* User Account & Cart */}
        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-slate-700 hover:text-amber-600 hover:bg-amber-50">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="outline" size="sm" className="relative flex items-center gap-2 border-slate-300 hover:border-amber-400 hover:bg-amber-50/50">
              <ShoppingCart className="w-4 h-4 text-slate-800" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              <Badge variant="default" className="h-5 min-w-[20px] px-1 bg-amber-500 text-slate-950 font-bold text-xs">
                {totalQuantity}
              </Badge>
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b">
            <Image
              src="/header-logo.png"
              alt="Baba Electronics"
              width={140}
              height={45}
              className="h-8 w-auto object-contain"
            />
            <span className="text-[11px] text-emerald-600 font-medium">Pan-India Express</span>
          </div>
          <div className="relative w-full mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search exit signs, emergency glow boards, wayfinding..."
              className="w-full rounded-md border border-input bg-slate-50 px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link 
              href="/catalog" 
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Cpu className="w-4 h-4 text-amber-600" /> All Products
            </Link>
            <Link 
              href="/custom-build" 
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Wrench className="w-4 h-4 text-amber-600" /> Custom Builds
            </Link>
            <Link 
              href="/quick-order" 
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Quick Order
            </Link>
            <Link 
              href="/auth/login" 
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-4 h-4 text-amber-600" /> OTP Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
