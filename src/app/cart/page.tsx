"use client";

import React from "react";
import Link from "next/link";
import { 
  Trash2, 
  ArrowRight, 
  ShoppingCart, 
  ShieldCheck, 
  TrendingDown, 
  Truck, 
  AlertTriangle,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/cart/store";
import { formatINR } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalQuantity, hasFreightItems } = useCart();

  // Estimated tax (18%) preview
  const estimatedTax = Math.round(subtotal * 0.18 * 100) / 100;
  // Free shipping above ₹1,000 standard order
  const estimatedShipping = subtotal > 1000 || subtotal === 0 ? 0 : 80;
  const estimatedTotal = Math.round((subtotal + estimatedTax + estimatedShipping) * 100) / 100;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Your Cart is Currently Empty</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore our wide range of IoT development boards, digital sensors, and custom electronic signage modules.
        </p>
        <Link href="/catalog">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
            Browse IoT Catalog &rarr;
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Shopping Cart</h1>
          <p className="text-xs text-slate-500">
            {totalQuantity} {totalQuantity > 1 ? "components" : "component"} ready for checkout
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>

      {hasFreightItems && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Oversized Product Notice (Commercial Billboards):</p>
            <p className="leading-relaxed">
              Your cart contains commercial billboard or LED matrix panels. Due to bulk freight dimensions, standard courier pricing is disabled and our logistics desk will arrange custom surface cargo at cost.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y border rounded-xl bg-white overflow-hidden shadow-sm">
            {items.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden border flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 block">{item.sku}</span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-900">{formatINR(item.unitPrice)}</span>
                      {item.unitPrice < item.basePrice && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatINR(item.basePrice)}
                        </span>
                      )}
                      {item.quantity >= 10 && (
                        <Badge variant="success" className="text-[10px] py-0 px-1.5">
                          Bulk Slab Applied
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0">
                  <div className="flex items-center border rounded-lg overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-bold font-mono">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 block">
                      {formatINR(item.unitPrice * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[11px] text-red-500 hover:underline flex items-center gap-1 justify-end pt-0.5"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link href="/catalog" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
            <span className="text-xs text-slate-400">Stock locks for 15 mins during checkout</span>
          </div>
        </div>

        {/* Order Summary Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="border shadow-md">
            <CardHeader className="p-5 pb-3 border-b">
              <CardTitle className="text-base font-bold text-slate-900">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-4 text-xs">
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Taxable Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span className="font-semibold text-slate-900">{formatINR(estimatedTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shiprocket Express Courier</span>
                  <span className="font-semibold text-slate-900">
                    {estimatedShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE (Above ₹1,000)</span>
                    ) : (
                      formatINR(estimatedShipping)
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-slate-900">Grand Total</span>
                  <p className="text-[10px] text-slate-400">INR inclusive of all taxes</p>
                </div>
                <span className="text-xl font-black text-slate-950">{formatINR(estimatedTotal)}</span>
              </div>

              <Link href="/checkout" className="block w-full pt-2">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-md">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <div className="pt-3 border-t space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Razorpay Secure (UPI, Netbanking, Cards)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Trackable via WhatsApp & SMS notifications</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
