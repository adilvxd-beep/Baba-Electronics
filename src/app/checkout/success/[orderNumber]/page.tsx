"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, 
  Download, 
  MessageSquare, 
  PackageCheck, 
  Receipt, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = (params?.orderNumber as string) || "BE-2026-27-000001";

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-2xl space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <Badge variant="success" className="text-xs px-3 py-1 font-semibold">
          Order Successfully Placed & Stock Decremented
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-900">Thank You For Your Order!</h1>
        <p className="text-xs text-slate-500">
          We have initiated fulfillment at our central Baba Electronics facility.
        </p>
      </div>

      <Card className="border shadow-lg overflow-hidden">
        <CardHeader className="bg-slate-50 border-b p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Order Reference</span>
            <span className="font-mono text-base font-extrabold text-blue-700">{orderNumber}</span>
          </div>
          <a
            href={`/api/invoices/${orderNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button size="sm" variant="outline" className="text-xs flex items-center gap-1.5 bg-white border-blue-300 text-blue-700 hover:bg-blue-50">
              <Download className="w-3.5 h-3.5" /> Download GST Invoice
            </Button>
          </a>
        </CardHeader>

        <CardContent className="p-6 space-y-6 text-xs">
          {/* Notification Alert Box */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs">
              <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp & SMS Notifications Dispatched
            </div>
            <p className="text-slate-600 leading-relaxed">
              An order confirmation with your invoice download link has been sent to your registered mobile number. You will receive live Shiprocket AWB tracking updates once packed.
            </p>
          </div>

          {/* Fulfillment Milestones */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Fulfillment Timeline</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border bg-slate-50 space-y-1">
                <span className="font-bold text-blue-700 block">1. Confirmed</span>
                <p className="text-[11px] text-slate-500">Stock locked & invoice generated</p>
              </div>
              <div className="p-3 rounded-lg border bg-white space-y-1">
                <span className="font-bold text-slate-700 block">2. Packaging</span>
                <p className="text-[11px] text-slate-500">Fragile protection for dev boards</p>
              </div>
              <div className="p-3 rounded-lg border bg-white space-y-1">
                <span className="font-bold text-slate-700 block">3. Dispatch</span>
                <p className="text-[11px] text-slate-500">Handed to Shiprocket courier</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Link href="/catalog" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full text-xs">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center justify-center gap-1.5">
                Go to Storefront <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
