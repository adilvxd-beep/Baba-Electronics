"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  FileText, 
  Users, 
  ExternalLink,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Orders & Shipping", href: "/admin/orders", icon: ShoppingBag },
    { label: "Signage Inventory", href: "/admin/products", icon: Package },
    { label: "Custom Quotes", href: "/admin/quotes", icon: FileText },
    { label: "Sales Rep Terminal", href: "/admin/sales-rep", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo & Super Admin Identifier */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/header-logo.png"
                alt="Baba Electronics Admin"
                width={140}
                height={40}
                className="h-8 w-auto object-contain brightness-110"
              />
            </Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Admin (+91 99903 33434)</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-850"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Exit to Store */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs font-medium text-slate-400 hover:text-amber-400 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Store</span>
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Subnav */}
        <div className="md:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-slate-800 bg-slate-900">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
