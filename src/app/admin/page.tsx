"use client";

import React from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Package, 
  FileText, 
  Users, 
  Truck, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  Download,
  Settings,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MASTER_ORDERS } from "@/lib/orders/service";
import { SAMPLE_PRODUCTS } from "@/lib/catalog/data";
import { MASTER_QUOTES } from "@/lib/quotes/service";
import { formatINR } from "@/lib/utils";

export default function AdminDashboardPage() {
  const pendingOrders = MASTER_ORDERS.filter((o) => o.status !== "DELIVERED" && o.status !== "CANCELLED");
  const lowStockCount = SAMPLE_PRODUCTS.filter((p) => p.stockQuantity <= p.lowStockThreshold).length;
  const pendingQuotes = MASTER_QUOTES.filter((q) => q.status === "SUBMITTED").length;
  const totalRevenue = MASTER_ORDERS.reduce((acc, o) => acc + o.grandTotal, 0);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Super Admin Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Super Admin Console
                </h1>
                <Badge className="bg-amber-500 text-slate-950 font-bold text-xs">
                  Super Admin
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized Mobile: <strong className="text-slate-800">+91 99903 33434</strong> · Central Dispatch & Manufacturing Control
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/">
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View Live Store
            </Button>
          </Link>
          <Link href="/api/admin/orders/export-tally">
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export Tally XML
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core Business KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Orders Card */}
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Orders & Dispatch
            </CardTitle>
            <ShoppingBag className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-extrabold text-slate-900">
              {MASTER_ORDERS.length} Orders
            </div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> {pendingOrders.length} Ready for Logistics
            </p>
            <div className="pt-2">
              <Link href="/admin/orders" className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1">
                Manage Dispatches <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Catalog & Inventory */}
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Live Signage Catalog
            </CardTitle>
            <Package className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-extrabold text-slate-900">
              {SAMPLE_PRODUCTS.length} SKUs
            </div>
            <p className="text-xs text-slate-500">
              {lowStockCount > 0 ? (
                <span className="text-rose-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {lowStockCount} Low-Stock Alerts
                </span>
              ) : (
                "All items within safety thresholds"
              )}
            </p>
            <div className="pt-2">
              <Link href="/admin/products" className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1">
                Manage Inventory <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Custom Quotes Desk */}
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Custom Engineering RFQs
            </CardTitle>
            <FileText className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-extrabold text-slate-900">
              {MASTER_QUOTES.length} RFQs
            </div>
            <p className="text-xs text-amber-600 font-semibold">
              {pendingQuotes} Awaiting Estimation
            </p>
            <div className="pt-2">
              <Link href="/admin/quotes" className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1">
                Review Quotes <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* B2B Sales Representative */}
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Order Volume
            </CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-extrabold text-slate-900">
              {formatINR(totalRevenue)}
            </div>
            <p className="text-xs text-slate-500">
              Contractor & Matrix Procurement
            </p>
            <div className="pt-2">
              <Link href="/admin/sales-rep" className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1">
                Sales Rep Terminal <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fast Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Order Processing & Shipping */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Order Dispatch & Logistics</h3>
                <p className="text-xs text-slate-500">Delhivery & Shiprocket Consignment Bookings</p>
              </div>
            </div>
            <Link href="/admin/orders">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                Open Orders &rarr;
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Process incoming orders, trigger partial or full shipments, print AWB shipping labels, and track real-time delivery status for emergency exit boards.
          </p>
        </div>

        {/* Module 2: Inventory & Price Control */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Signage Catalog & Inventory</h3>
                <p className="text-xs text-slate-500">Stock Levels, Wholesale Tiers & CSV Export</p>
              </div>
            </div>
            <Link href="/admin/products">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                Open Inventory &rarr;
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Update selling prices, MRP, minimum stock thresholds, wholesale discount brackets, and export the entire catalog to CSV.
          </p>
        </div>

        {/* Module 3: Custom Architectural Signage Quotes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Custom Engineering & RFQs</h3>
                <p className="text-xs text-slate-500">Bespoke Acrylic Glow Boards & Billboards</p>
              </div>
            </div>
            <Link href="/admin/quotes">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                Open RFQs &rarr;
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Review CAD drawings and dimension specs submitted by clients, issue formal price quotations, and track 50% milestone advance payments.
          </p>
        </div>

        {/* Module 4: Sales Representative Assisted Terminal */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">B2B Sales Representative Terminal</h3>
                <p className="text-xs text-slate-500">Assisted Ordering on Behalf of Contractors</p>
              </div>
            </div>
            <Link href="/admin/sales-rep">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                Open Terminal &rarr;
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Lookup verified contractor GSTIN profiles, construct high-speed matrix orders on phone calls, and dispatch with custom price overrides.
          </p>
        </div>
      </div>
    </div>
  );
}
