"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Layers, 
  ShoppingCart, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  TrendingDown, 
  ArrowLeft,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";
import { useCart } from "@/lib/cart/store";
import { formatINR } from "@/lib/utils";

interface MatrixItem {
  product: ProductData;
  variantId?: string;
  name: string;
  sku: string;
  basePrice: number;
  quantity: number;
}

export default function WholesaleMatrixPage() {
  const { addItem } = useCart();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Flatten catalog products and their variants into a high-speed matrix
  const initialItems: MatrixItem[] = [];
  SAMPLE_PRODUCTS.forEach((prod) => {
    if (prod.variants && prod.variants.length > 0) {
      prod.variants.forEach((v) => {
        initialItems.push({
          product: prod,
          variantId: v.id,
          name: `${prod.name} (${v.name})`,
          sku: v.sku,
          basePrice: v.price,
          quantity: 0,
        });
      });
    } else {
      initialItems.push({
        product: prod,
        name: prod.name,
        sku: prod.sku,
        basePrice: prod.sellingPrice,
        quantity: 0,
      });
    }
  });

  const [matrixItems, setMatrixItems] = useState<MatrixItem[]>(initialItems);

  const handleQtyChange = (sku: string, qty: number) => {
    setMatrixItems(
      matrixItems.map((item) =>
        item.sku === sku ? { ...item, quantity: Math.max(0, qty) } : item
      )
    );
  };

  const totalSelectedUnits = matrixItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalEstimatedCost = matrixItems.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );

  const handleAddAllToCart = () => {
    const selected = matrixItems.filter((i) => i.quantity > 0);
    if (selected.length === 0) {
      alert("Please enter quantities for at least one component.");
      return;
    }

    selected.forEach((item) => {
      addItem(item.product, item.variantId, item.quantity);
    });

    setSuccessMessage(`Added ${totalSelectedUnits} components across ${selected.length} SKUs to cart!`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/catalog" className="text-slate-500 hover:text-amber-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">B2B Wholesale Variant Matrix</h1>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Order across multiple variants, memory chips, and header types simultaneously on a single unified grid.
          </p>
        </div>

        <Link href="/cart">
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5 border-slate-300">
            <ShoppingCart className="w-3.5 h-3.5" /> View Cart
          </Button>
        </Link>
      </div>

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Floating Procurement Bar */}
      <div className="sticky top-20 z-30 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-slate-800">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Total Selected:</span>
            <strong className="text-base text-white">{totalSelectedUnits} units</strong>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-slate-400 block">Estimated Taxable Subtotal:</span>
            <strong className="text-base text-emerald-400">{formatINR(totalEstimatedCost)}</strong>
          </div>
        </div>

        <Button
          size="sm"
          disabled={totalSelectedUnits === 0}
          onClick={handleAddAllToCart}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" /> Add All to Cart ({totalSelectedUnits} items) &rarr;
        </Button>
      </div>

      {/* Matrix Table */}
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-3">SKU</th>
                <th className="p-3">Model / Variant Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Base Unit Price</th>
                <th className="p-3">Volume Slab (10+)</th>
                <th className="p-3">Volume Slab (50+)</th>
                <th className="p-3 text-center">Batch Quantity</th>
                <th className="p-3 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {matrixItems.map((item) => {
                const discounts = item.product.quantityDiscounts || [];
                const slab10 = discounts.find((d) => d.minQuantity === 10);
                const slab50 = discounts.find((d) => d.minQuantity === 50);

                return (
                  <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-700">{item.sku}</td>
                    <td className="p-3 font-medium text-slate-800 max-w-xs truncate">{item.name}</td>
                    <td className="p-3 text-slate-500">{item.product.category}</td>
                    <td className="p-3 font-bold text-slate-900">{formatINR(item.basePrice)}</td>
                    <td className="p-3 text-emerald-700 font-semibold">
                      {slab10 ? formatINR(slab10.discountedPrice) : "—"}
                    </td>
                    <td className="p-3 text-emerald-700 font-bold">
                      {slab50 ? formatINR(slab50.discountedPrice) : "—"}
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        min={0}
                        value={item.quantity === 0 ? "" : item.quantity}
                        onChange={(e) => handleQtyChange(item.sku, parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="w-20 rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                    </td>
                    <td className="p-3 text-right font-extrabold text-slate-900">
                      {item.quantity > 0 ? formatINR(item.basePrice * item.quantity) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
