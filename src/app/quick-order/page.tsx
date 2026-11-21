"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";
import { useCart } from "@/lib/cart/store";
import { formatINR } from "@/lib/utils";

interface QuickOrderRow {
  sku: string;
  quantity: number;
}

export default function QuickOrderPage() {
  const { addItem } = useCart();
  const [rows, setRows] = useState<QuickOrderRow[]>([
    { sku: "BE-SIGN-EXT-01", quantity: 10 },
    { sku: "BE-SIGN-ML-01", quantity: 15 },
    { sku: "BE-SIGN-WAY-01", quantity: 8 },
  ]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const addRow = () => {
    setRows([...rows, { sku: "", quantity: 1 }]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof QuickOrderRow, value: any) => {
    setRows(
      rows.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const handleAddBatchToCart = () => {
    let addedCount = 0;
    rows.forEach((row) => {
      const prod = SAMPLE_PRODUCTS.find(
        (p) => p.sku.toLowerCase() === row.sku.trim().toLowerCase()
      );
      if (prod && row.quantity > 0) {
        addItem(prod, undefined, row.quantity);
        addedCount += row.quantity;
      }
    });

    if (addedCount > 0) {
      setSuccessMessage(`Added ${addedCount} units to cart with automatic volume discount slabs!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      alert("No valid SKUs found. Please verify the SKU numbers against the catalog.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/catalog" className="text-slate-500 hover:text-amber-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">B2B Quick Order by SKU</h1>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Rapid procurement interface. Enter multiple part numbers and batch quantities on a single high-speed grid.
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
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <Card className="border shadow-md">
        <CardHeader className="bg-slate-50 border-b p-5">
          <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-600" /> Batch SKU Order Table
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Available SKUs: BE-SIGN-EXT-01, BE-SIGN-EXT-02, BE-SIGN-ML-01, BE-SIGN-WAY-01, BE-SIGN-IND-01
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          <div className="space-y-3">
            {rows.map((row, idx) => {
              const matchedProd = SAMPLE_PRODUCTS.find(
                (p) => p.sku.toLowerCase() === row.sku.trim().toLowerCase()
              );

              return (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border bg-slate-50/50">
                  <div className="flex-1 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Enter SKU (e.g. BE-SIGN-EXT-01)"
                      value={row.sku}
                      onChange={(e) => updateRow(idx, "sku", e.target.value.toUpperCase())}
                      className="w-full rounded-lg border border-slate-300 p-2 text-xs font-mono font-semibold uppercase focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="w-28">
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={row.quantity}
                      onChange={(e) => updateRow(idx, "quantity", parseInt(e.target.value) || 1)}
                      className="w-full rounded-lg border border-slate-300 p-2 text-xs font-bold text-center focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="w-48 text-xs text-slate-600 truncate">
                    {matchedProd ? (
                      <div>
                        <span className="font-semibold text-slate-900 block truncate">{matchedProd.name}</span>
                        <span className="text-[11px] text-emerald-600 font-bold">
                          {formatINR(matchedProd.sellingPrice)} each
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Enter valid SKU</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeRow(idx)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRow}
              className="text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another SKU Row
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleAddBatchToCart}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Add Entire Batch to Cart &rarr;
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
