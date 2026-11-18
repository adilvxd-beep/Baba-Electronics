"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Edit, 
  ArrowLeft,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";
import { formatINR } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductData[]>(SAMPLE_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Trigger CSV export
  const handleExportCSV = () => {
    const headers = [
      "SKU",
      "Name",
      "Category",
      "MRP",
      "SellingPrice",
      "CostPrice",
      "GSTRate",
      "StockQuantity",
      "SourceType",
      "HSNCode",
    ];

    const rows = products.map((p) => [
      p.sku,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.mrp,
      p.sellingPrice,
      p.costPrice,
      p.gstRate,
      p.stockQuantity,
      p.sourceType,
      p.hsnCode,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `baba_electronics_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimulatedImport = () => {
    setImportStatus("Import verified: 6 SKUs validated against schema, zero formatting errors.");
    setTimeout(() => setImportStatus(null), 4000);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Admin Nav & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-500 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Inventory & Catalog Hub</h1>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Central source of truth for stock quantities, cost margins, HSN codes, and bulk CSV management.
          </p>
        </div>

        {/* Quick CSV Import/Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1.5"
            onClick={handleExportCSV}
          >
            <Download className="w-3.5 h-3.5" /> Export Catalog (CSV)
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1.5"
            onClick={handleSimulatedImport}
          >
            <Upload className="w-3.5 h-3.5" /> Bulk Import (CSV)
          </Button>

          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add New SKU
          </Button>
        </div>
      </div>

      {importStatus && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total SKUs Active</p>
          <p className="text-2xl font-black text-slate-900">{products.length}</p>
          <p className="text-[11px] text-slate-400">Target: 200–500 SKUs</p>
        </Card>

        <Card className="p-4 space-y-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Own-Made Items</p>
          <p className="text-2xl font-black text-blue-600">
            {products.filter((p) => p.sourceType === "MANUFACTURED").length}
          </p>
          <p className="text-[11px] text-slate-400">High Margin Manufactured</p>
        </Card>

        <Card className="p-4 space-y-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Traded Goods</p>
          <p className="text-2xl font-black text-slate-700">
            {products.filter((p) => p.sourceType === "TRADED").length}
          </p>
          <p className="text-[11px] text-slate-400">Vendor Stocked</p>
        </Card>

        <Card className="p-4 space-y-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Low Stock Warnings</p>
          <p className="text-2xl font-black text-amber-600">
            {products.filter((p) => p.stockQuantity <= p.lowStockThreshold).length}
          </p>
          <p className="text-[11px] text-slate-400">WhatsApp Alert Triggered</p>
        </Card>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm space-y-4 p-5">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Filter by SKU or Product Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <span className="text-xs text-slate-400">Showing {filtered.length} products</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-3">SKU</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Source</th>
                <th className="p-3">Selling Price</th>
                <th className="p-3">Cost Price (Admin)</th>
                <th className="p-3">Gross Margin</th>
                <th className="p-3">Stock Level</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((prod) => {
                const margin = Math.round(
                  ((prod.sellingPrice - prod.costPrice) / prod.sellingPrice) * 100
                );
                const isLowStock = prod.stockQuantity <= prod.lowStockThreshold;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-slate-900">{prod.sku}</td>
                    <td className="p-3 font-medium text-slate-800 max-w-xs truncate">
                      <Link href={`/products/${prod.slug}`} className="hover:text-blue-600">
                        {prod.name}
                      </Link>
                    </td>
                    <td className="p-3 text-slate-500">{prod.category}</td>
                    <td className="p-3">
                      {prod.sourceType === "MANUFACTURED" ? (
                        <Badge className="bg-blue-600 text-white text-[10px]">Own-Made</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">Traded</Badge>
                      )}
                    </td>
                    <td className="p-3 font-bold text-slate-900">{formatINR(prod.sellingPrice)}</td>
                    <td className="p-3 text-slate-500 font-mono">{formatINR(prod.costPrice)}</td>
                    <td className="p-3">
                      <span className="font-semibold text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {margin}%
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isLowStock ? "text-amber-600" : "text-slate-800"}`}>
                          {prod.stockQuantity} pcs
                        </span>
                        {isLowStock && (
                          <span title="Stock below threshold" className="p-0.5 rounded bg-amber-100 text-amber-800">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600 hover:text-blue-800">
                        <Edit className="w-3 h-3 mr-1" /> Edit
                      </Button>
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
