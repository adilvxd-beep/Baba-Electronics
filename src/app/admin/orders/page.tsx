"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Truck, 
  FileSpreadsheet, 
  Printer, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PackageCheck, 
  ArrowLeft,
  Download,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MASTER_ORDERS, OrderRecord, dispatchOrderConsignment } from "@/lib/orders/service";
import { formatINR } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(MASTER_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [courierName, setCourierName] = useState("Delhivery Air");
  const [dispatchNotice, setDispatchNotice] = useState<string | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchStatus = statusFilter === "ALL" || ord.status === statusFilter;
    const matchSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerPhone.includes(searchTerm);
    return matchStatus && matchSearch;
  });

  const handleBookShipment = (orderNumber: string) => {
    const order = orders.find((o) => o.orderNumber === orderNumber);
    if (!order) return;

    // Pick unfulfilled items
    const unfulfilled = order.items
      .filter((i) => i.quantity - i.shippedQuantity > 0)
      .map((i) => ({ sku: i.sku, quantity: i.quantity - i.shippedQuantity }));

    if (unfulfilled.length === 0) {
      alert("All items in this order have already been dispatched.");
      return;
    }

    const res = dispatchOrderConsignment(orderNumber, unfulfilled, courierName);
    if (res.success && res.order) {
      setOrders([...MASTER_ORDERS]);
      setSelectedOrder(res.order);
      setDispatchNotice(res.message);
      setTimeout(() => setDispatchNotice(null), 4000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-500 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">Shiprocket Fulfillment & Dispatch Desk</h1>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Book couriers, print thermal labels, manage partial dispatches, and export Tally sales vouchers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a href="/api/admin/orders/export-tally" download>
            <Button size="sm" variant="outline" className="text-xs flex items-center gap-1.5 border-slate-300">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Export Tally Sales (CSV)
            </Button>
          </a>
          <Link href="/admin/products">
            <Button size="sm" variant="outline" className="text-xs">
              Inventory & SKUs
            </Button>
          </Link>
        </div>
      </div>

      {dispatchNotice && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{dispatchNotice}</span>
        </div>
      )}

      {/* Orders Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
          {["ALL", "CONFIRMED", "PARTIALLY_SHIPPED", "SHIPPED", "DELIVERED"].map((st) => (
            <Button
              key={st}
              size="sm"
              variant={statusFilter === st ? "default" : "outline"}
              className="text-xs h-8 capitalize"
              onClick={() => setStatusFilter(st)}
            >
              {st.toLowerCase().replace("_", " ")}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by order or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-3">Order Number</th>
                <th className="p-3">Date</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Shipments</th>
                <th className="p-3 text-right">Fulfillment Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-700">
                    {ord.orderNumber}
                  </td>
                  <td className="p-3 text-slate-500">{ord.orderDate}</td>
                  <td className="p-3">
                    <strong className="text-slate-900 block">{ord.customerName}</strong>
                    <span className="text-slate-500">+91 {ord.customerPhone}</span>
                  </td>
                  <td className="p-3">
                    <span>{ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">PIN: {ord.shippingAddress.pincode}</span>
                  </td>
                  <td className="p-3 font-extrabold text-slate-900">{formatINR(ord.grandTotal)}</td>
                  <td className="p-3">
                    {ord.status === "CONFIRMED" && <Badge variant="warning" className="text-[10px]">Confirmed</Badge>}
                    {ord.status === "PARTIALLY_SHIPPED" && <Badge className="text-[10px] bg-purple-600">Partially Shipped</Badge>}
                    {ord.status === "SHIPPED" && <Badge variant="default" className="text-[10px] bg-blue-600">Shipped</Badge>}
                    {ord.status === "DELIVERED" && <Badge variant="success" className="text-[10px]">Delivered</Badge>}
                  </td>
                  <td className="p-3">
                    {ord.shipments.length > 0 ? (
                      <div className="space-y-1">
                        {ord.shipments.map((s) => (
                          <div key={s.id} className="flex items-center gap-1.5 text-[11px] font-mono">
                            <Truck className="w-3 h-3 text-blue-600" />
                            <a
                              href={s.labelUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 font-bold hover:underline"
                            >
                              {s.awbCode}
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Unbooked</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {ord.status !== "DELIVERED" && (
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleBookShipment(ord.orderNumber)}
                        >
                          Book Courier
                        </Button>
                      )}
                      <a href={`/api/invoices/${ord.orderNumber}`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Invoice
                        </Button>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
