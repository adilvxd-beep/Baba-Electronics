"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Trash2, 
  Cpu, 
  Check, 
  Download, 
  Layers,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";
import { formatINR } from "@/lib/utils";

export default function ComparePage() {
  // Initial compare set (first 3 products)
  const [comparedProducts, setComparedProducts] = useState<ProductData[]>(
    SAMPLE_PRODUCTS.slice(0, 3)
  );

  const removeProduct = (id: string) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== id));
  };

  const addProduct = (prod: ProductData) => {
    if (comparedProducts.length >= 4) {
      alert("You can compare a maximum of 4 products.");
      return;
    }
    if (!comparedProducts.find((p) => p.id === prod.id)) {
      setComparedProducts([...comparedProducts, prod]);
    }
  };

  const availableToAdd = SAMPLE_PRODUCTS.filter(
    (p) => !comparedProducts.find((c) => c.id === p.id)
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/catalog" className="text-slate-500 hover:text-amber-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">Side-by-Side Product Comparison</h1>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Compare technical specifications, operating voltage, interfaces, and volume discount slabs.
          </p>
        </div>

        {comparedProducts.length < 4 && availableToAdd.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Add to matrix:</span>
            <select
              className="text-xs rounded-lg border border-slate-300 p-2 font-medium bg-white"
              onChange={(e) => {
                const prod = availableToAdd.find((p) => p.id === e.target.value);
                if (prod) addProduct(prod);
              }}
              defaultValue=""
            >
              <option value="" disabled>Choose product...</option>
              {availableToAdd.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-dashed bg-white space-y-3">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800">Comparison Tray is Empty</h3>
          <p className="text-xs text-slate-500">Select products from the catalog to compare up to 4 items.</p>
          <Link href="/catalog">
            <Button size="sm">Browse Catalog</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-xl overflow-hidden bg-white text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-4 w-48 text-slate-500 uppercase tracking-wider font-semibold border-r">
                  Feature / Spec
                </th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="p-4 min-w-[220px] max-w-[260px] align-top border-r last:border-r-0">
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-lg overflow-hidden border bg-slate-100">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-white/80 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-slate-400 block">{p.sku}</span>
                        <Link href={`/products/${p.slug}`} className="font-bold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2">
                          {p.name}
                        </Link>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-slate-900">{formatINR(p.sellingPrice)}</span>
                        <span className="text-[11px] text-slate-400 line-through">{formatINR(p.mrp)}</span>
                      </div>
                      <Link href={`/products/${p.slug}`} className="block">
                        <Button size="sm" className="w-full text-xs h-7 bg-amber-600 hover:bg-amber-700 text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Category</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-800 border-r last:border-r-0">{p.category}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Sourcing Type</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 border-r last:border-r-0">
                    {p.sourceType === "MANUFACTURED" ? (
                      <Badge className="bg-amber-600 text-white text-[10px]">Own-Made</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">Traded</Badge>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Microcontroller / Chip</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-mono font-bold text-amber-700 border-r last:border-r-0">
                    {p.specs.chip || "N/A"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Operating Voltage</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-800 border-r last:border-r-0">
                    {p.specs.voltage || "Standard"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Interfaces & Comms</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-slate-700 border-r last:border-r-0">
                    {Array.isArray(p.specs.interface) ? p.specs.interface.join(", ") : p.specs.interface || "N/A"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Onboard Memory</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-800 border-r last:border-r-0">
                    {p.specs.memory || "N/A"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Pin Count / Headers</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-800 border-r last:border-r-0">
                    {p.specs.pins || "N/A"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Warranty</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-slate-800 border-r last:border-r-0">
                    {p.warrantyMonths} Months Replacement
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Bulk Tier 1 (10+ pcs)</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-emerald-700 border-r last:border-r-0">
                    {p.quantityDiscounts[0] ? formatINR(p.quantityDiscounts[0].discountedPrice) : "Standard Price"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500 bg-slate-50/50 border-r">Datasheet</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 border-r last:border-r-0">
                    {p.datasheetUrl ? (
                      <a href={p.datasheetUrl} target="_blank" rel="noreferrer" className="text-amber-600 font-semibold hover:underline flex items-center gap-1">
                        <Download className="w-3 h-3" /> PDF
                      </a>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
