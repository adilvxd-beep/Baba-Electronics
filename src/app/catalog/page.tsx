"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Cpu, 
  Download, 
  Check, 
  Plus, 
  Layers, 
  ArrowUpDown, 
  TrendingDown,
  X,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";
import { formatINR } from "@/lib/utils";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedVoltage, setSelectedVoltage] = useState<string>("ALL");
  const [selectedSource, setSelectedSource] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"PRICE_ASC" | "PRICE_DESC" | "NAME">("PRICE_ASC");
  const [compareList, setCompareList] = useState<ProductData[]>([]);

  // Unique filter options
  const categories = useMemo(() => {
    return ["ALL", ...Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.category)))];
  }, []);

  const voltages = ["ALL", "3.3V", "5V", "12V"];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === "ALL" || prod.category === selectedCategory;
      const matchesSource = selectedSource === "ALL" || prod.sourceType === selectedSource;
      const matchesVoltage =
        selectedVoltage === "ALL" ||
        (prod.specs.voltage && prod.specs.voltage.includes(selectedVoltage));

      return matchesSearch && matchesCat && matchesSource && matchesVoltage;
    }).sort((a, b) => {
      if (sortBy === "PRICE_ASC") return a.sellingPrice - b.sellingPrice;
      if (sortBy === "PRICE_DESC") return b.sellingPrice - a.sellingPrice;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory, selectedSource, selectedVoltage, sortBy]);

  const toggleCompare = (prod: ProductData) => {
    if (compareList.find((p) => p.id === prod.id)) {
      setCompareList(compareList.filter((p) => p.id !== prod.id));
    } else {
      if (compareList.length >= 4) {
        alert("You can compare up to 4 products at once.");
        return;
      }
      setCompareList([...compareList, prod]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            IoT Microcontrollers & Component Catalog
          </h1>
          <p className="text-sm text-slate-500">
            Pan-India ready stock dev boards, sensors, and custom engineered electronics
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Filter by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="NAME">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filters */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-5 space-y-5 shadow-sm">
            <div className="flex items-center justify-between font-bold text-sm text-slate-900">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Technical Filters
              </span>
              {(selectedCategory !== "ALL" || selectedVoltage !== "ALL" || selectedSource !== "ALL") && (
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSelectedVoltage("ALL");
                    setSelectedSource("ALL");
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2 pt-2 border-t">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Category
              </label>
              <div className="flex flex-col gap-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-2.5 py-1.5 rounded-md transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat === "ALL" ? "All Categories" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Operating Voltage Filter */}
            <div className="space-y-2 pt-2 border-t">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Operating Voltage
              </label>
              <div className="flex flex-wrap gap-1.5">
                {voltages.map((v) => (
                  <Button
                    key={v}
                    variant={selectedVoltage === v ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-xs px-2.5"
                    onClick={() => setSelectedVoltage(v)}
                  >
                    {v === "ALL" ? "Any" : v}
                  </Button>
                ))}
              </div>
            </div>

            {/* Source Type Filter */}
            <div className="space-y-2 pt-2 border-t">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Product Source
              </label>
              <div className="flex flex-col gap-1 text-xs">
                <button
                  onClick={() => setSelectedSource("ALL")}
                  className={`text-left px-2.5 py-1.5 rounded-md ${
                    selectedSource === "ALL" ? "bg-slate-900 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  All Sources
                </button>
                <button
                  onClick={() => setSelectedSource("MANUFACTURED")}
                  className={`text-left px-2.5 py-1.5 rounded-md ${
                    selectedSource === "MANUFACTURED" ? "bg-blue-600 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Own-Made (Baba Electronics)
                </button>
                <button
                  onClick={() => setSelectedSource("TRADED")}
                  className={`text-left px-2.5 py-1.5 rounded-md ${
                    selectedSource === "TRADED" ? "bg-blue-600 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Traded / Certified Imports
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="text-xs text-slate-500 flex justify-between items-center">
            <span>Showing <strong>{filteredProducts.length}</strong> items</span>
            <span className="text-[11px] text-slate-400">Prices in INR · GST added at checkout</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed p-12 text-center space-y-3 bg-white">
              <Cpu className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800">No components matched your criteria</h3>
              <p className="text-xs text-slate-500">Try adjusting your filters or search terms.</p>
              <Button size="sm" variant="outline" onClick={() => {
                setSelectedCategory("ALL");
                setSelectedVoltage("ALL");
                setSelectedSource("ALL");
                setSearchQuery("");
              }}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => {
                const isCompared = Boolean(compareList.find((p) => p.id === prod.id));

                return (
                  <Card key={prod.id} className="flex flex-col justify-between overflow-hidden border hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      <img 
                        src={prod.images[0]} 
                        alt={prod.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {prod.sourceType === "MANUFACTURED" ? (
                          <Badge variant="default" className="text-[10px] bg-blue-600">Own-Made</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] bg-slate-800 text-white">Traded</Badge>
                        )}
                        {prod.requiresCustomFreight && (
                          <Badge variant="warning" className="text-[10px]">Freight Delivery</Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-[10px] font-mono bg-white/90 backdrop-blur px-1.5 py-0.5 rounded border text-slate-700">
                          {prod.sku}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="p-4 pb-2 space-y-1">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{prod.category}</p>
                      <Link href={`/products/${prod.slug}`}>
                        <CardTitle className="text-sm font-bold line-clamp-2 hover:text-blue-600 transition-colors">
                          {prod.name}
                        </CardTitle>
                      </Link>
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {prod.specs.chip && (
                          <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">
                            {prod.specs.chip}
                          </span>
                        )}
                        {prod.specs.voltage && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {prod.specs.voltage}
                          </span>
                        )}
                        {prod.specs.pins && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {prod.specs.pins}
                          </span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0 space-y-3">
                      <div className="pt-2 border-t flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-extrabold text-slate-900">{formatINR(prod.sellingPrice)}</span>
                          <span className="text-xs text-slate-400 line-through ml-1.5">{formatINR(prod.mrp)}</span>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-600">
                          {prod.stockQuantity > 0 ? `${prod.stockQuantity} in stock` : "Ships in 5 days"}
                        </span>
                      </div>

                      {/* Tiered Discount Hint */}
                      {prod.quantityDiscounts.length > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-blue-700 bg-blue-50 px-2 py-1 rounded font-medium">
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>Bulk: {formatINR(prod.quantityDiscounts[0].discountedPrice)} for {prod.quantityDiscounts[0].minQuantity}+ pcs</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Button 
                          variant={isCompared ? "secondary" : "outline"}
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => toggleCompare(prod)}
                        >
                          {isCompared ? <Check className="w-3 h-3 mr-1 text-emerald-600" /> : <Plus className="w-3 h-3 mr-1" />}
                          {isCompared ? "Compared" : "Compare"}
                        </Button>
                        <Link href={`/products/${prod.slug}`}>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                            View PDP
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Compare Tray (when items are selected) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 border border-slate-700">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Comparing ({compareList.length}/4 items)</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/compare">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-3">
                Open Matrix &rarr;
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white"
              onClick={() => setCompareList([])}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
