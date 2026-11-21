"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, Cpu, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";

interface CategoryShowcaseProps {
  categoryTitle: string;
  categorySubtitle: string;
  categoryFilter: string;
  categorySlug: string;
  bannerImage: string;
  badgeText: string;
  themeColor: "amber" | "slate";
}

export function CategoryShowcase({
  categoryTitle,
  categorySubtitle,
  categoryFilter,
  categorySlug,
  bannerImage,
  badgeText,
  themeColor = "amber",
}: CategoryShowcaseProps) {
  const products = SAMPLE_PRODUCTS.filter((p) =>
    p.category.toLowerCase().includes(categoryFilter.toLowerCase())
  ).slice(0, 3);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            {categoryTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            {categorySubtitle}
          </p>
        </div>
        <Link 
          href={`/categories/${categorySlug}`}
          className="text-xs md:text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
        >
          Explore All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid: 1 Feature Banner (cols 1) + 3 Product Cards (cols 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* Feature Category Banner Card (Robosap style) */}
        <div className="relative rounded-xl overflow-hidden shadow-sm flex flex-col justify-between p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white min-h-[300px]">
          <div className="absolute inset-0 z-0">
            <img
              src={bannerImage}
              alt={categoryTitle}
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {badgeText}
            </span>
            <h3 className="text-xl font-extrabold text-white leading-tight">
              {categoryTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Industrial grade tested components with full wiring diagrams, datasheets, and pinouts.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <Link 
              href={`/categories/${categorySlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
            >
              Browse Category Shelf &rarr;
            </Link>
          </div>
        </div>

        {/* Product Cards */}
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
