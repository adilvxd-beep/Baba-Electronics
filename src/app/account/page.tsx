"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Package, 
  Download, 
  RefreshCw, 
  Truck, 
  MapPin, 
  Building2, 
  LogOut, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MASTER_ORDERS, OrderRecord, cancelOrder, submitReturnRequest } from "@/lib/orders/service";
import { formatINR } from "@/lib/utils";

export default function AccountPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(MASTER_ORDERS);
  const [activeTab, setActiveTab] = useState<"ORDERS" | "ADDRESSES" | "SETTINGS">("ORDERS");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleCancel = (orderNumber: string) => {
    if (!confirm(`Are you sure you want to cancel order ${orderNumber}?`)) return;
    const res = cancelOrder(orderNumber);
    if (res.success) {
      setOrders([...MASTER_ORDERS]);
      setFeedbackMessage(res.message);
    } else {
      alert(res.message);
    }
  };

  const handleReturn = (orderNumber: string) => {
    const reason = prompt("Please provide reason for return (e.g. Defective board, wrong component):");
    if (!reason) return;
    const res = submitReturnRequest(orderNumber, reason);
    if (res.success) {
      setOrders([...MASTER_ORDERS]);
      setFeedbackMessage(res.message);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Account Profile Bar */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Rohan Kulkarni</h1>
              <Badge variant="outline" className="border-amber-400 text-blue-300 text-[10px]">
                Verified Mobile
              </Badge>
            </div>
            <p className="text-xs text-slate-400 pt-0.5">+91 98230 12345 · Maker Lab Account</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            onClick={() => {
              if (confirm("Sign out of all devices?")) {
                window.location.href = "/auth/login";
              }
            }}
          >
            <LogOut className="w-3.5 h-3.5 mr-1" /> Sign Out Everywhere
          </Button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b text-xs font-semibold">
        <button
          onClick={() => setActiveTab("ORDERS")}
          className={`pb-3 px-4 border-b-2 transition-all ${
            activeTab === "ORDERS" ? "border-amber-600 text-amber-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Order History & Tracking ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("ADDRESSES")}
          className={`pb-3 px-4 border-b-2 transition-all ${
            activeTab === "ADDRESSES" ? "border-amber-600 text-amber-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Saved GSTIN & Addresses
        </button>
      </div>

      {activeTab === "ORDERS" && (
        <div className="space-y-6">
          {orders.map((ord) => (
            <Card key={ord.id} className="border shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/70 p-4 sm:p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-slate-900 text-sm">{ord.orderNumber}</span>
                    {ord.status === "CONFIRMED" && <Badge variant="warning" className="text-[10px]">Confirmed</Badge>}
                    {ord.status === "PARTIALLY_SHIPPED" && <Badge className="text-[10px] bg-purple-600">Partially Shipped</Badge>}
                    {ord.status === "SHIPPED" && <Badge className="text-[10px] bg-amber-600">Shipped</Badge>}
                    {ord.status === "DELIVERED" && <Badge variant="success" className="text-[10px]">Delivered</Badge>}
                    {ord.status === "CANCELLED" && <Badge variant="destructive" className="text-[10px]">Cancelled</Badge>}
                  </div>
                  <p className="text-slate-400">Placed on {ord.orderDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a href={`/api/invoices/${ord.orderNumber}`} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="h-8 text-xs bg-white text-slate-700">
                      <Download className="w-3.5 h-3.5 mr-1" /> GST Invoice (PDF)
                    </Button>
                  </a>
                  {ord.status === "CONFIRMED" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleCancel(ord.orderNumber)}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {ord.status === "DELIVERED" && !ord.returnRequested && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs text-slate-700"
                      onClick={() => handleReturn(ord.orderNumber)}
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> Return (7-Day)
                    </Button>
                  )}
                  {ord.returnRequested && (
                    <Badge variant="outline" className="text-[10px] text-amber-700 bg-amber-50 border-amber-300">
                      Return Requested
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 space-y-4 text-xs">
                {/* Items in Order */}
                <div className="divide-y border rounded-lg bg-white overflow-hidden">
                  {ord.items.map((item) => (
                    <div key={item.id} className="p-3 flex justify-between items-center">
                      <div>
                        <span className="font-mono text-[10px] text-slate-400">{item.sku}</span>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-slate-500">Qty: {item.quantity} · Rate: {formatINR(item.unitPrice)}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900">{formatINR(item.totalAmount)}</span>
                        <span className="text-[10px] text-slate-400 block">+18% GST</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipments & Tracking Links */}
                {ord.shipments.length > 0 && (
                  <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-100 space-y-2">
                    <span className="font-bold text-amber-900 block">Courier Shipments & Consignments:</span>
                    {ord.shipments.map((s) => (
                      <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-white p-2.5 rounded border">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-amber-600" />
                          <div>
                            <span className="font-semibold text-slate-900">{s.courierName}</span>
                            <span className="text-slate-400 font-mono ml-2">AWB: {s.awbCode}</span>
                          </div>
                        </div>
                        <a
                          href={s.trackingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-600 font-semibold hover:underline flex items-center gap-1"
                        >
                          Live Tracking <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 text-xs font-semibold text-slate-700">
                  <span>Grand Total: <strong className="text-slate-950 font-extrabold text-sm">{formatINR(ord.grandTotal)}</strong></span>
                  <Link href="/catalog">
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-amber-600 hover:text-amber-800">
                      <RefreshCw className="w-3 h-3 mr-1" /> Reorder Items
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "ADDRESSES" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-5 space-y-3 border">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Building2 className="w-4 h-4 text-amber-600" /> Default Business & GSTIN Profile
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p><strong>Firm:</strong> Kulkarni Robotics Pvt Ltd</p>
              <p><strong>GSTIN:</strong> 27AAECK1234H1Z1 (Maharashtra Intra-State)</p>
              <p><strong>Input Tax Credit:</strong> Enabled</p>
            </div>
          </Card>

          <Card className="p-5 space-y-3 border">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-amber-600" /> Primary Shipping Address
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Flat 402, Shivajinagar</p>
              <p>Pune, Maharashtra - <strong>PIN: 411005</strong></p>
              <p>Contact: +91 98230 12345</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
