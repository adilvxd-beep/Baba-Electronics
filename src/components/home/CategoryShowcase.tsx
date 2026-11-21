"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SAMPLE_PRODUCTS } from "@/lib/catalog/data";

interface CategoryShowcaseProps {
  categoryTitle: string;
  categorySubtitle: string;
  categoryFilter: string;
  categorySlug: string;
  subcategories?: string[];
}

export function CategoryShowcase({
  categoryTitle,
  categorySubtitle,
  categoryFilter,
  categorySlug,
  subcategories = [],
}: CategoryShowcaseProps) {
  const [selectedSubcat, setSelectedSubcat] = useState<string>("All");

  const products = SAMPLE_PRODUCTS.filter((p) => {
    const matchesCategory = p.category.toLowerCase().includes(categoryFilter.toLowerCase());
    if (selectedSubcat === "All") return matchesCategory;
    return (
      matchesCategory &&
      (p.name.toLowerCase().includes(selectedSubcat.toLowerCase()) ||
        p.description.toLowerCase().includes(selectedSubcat.toLowerCase()))
    );
  }).slice(0, 4);

  // Fallback to general category products if filter yields 0
  const displayProducts = products.length > 0
    ? products
    : SAMPLE_PRODUCTS.filter((p) =>
        p.category.toLowerCase().includes(categoryFilter.toLowerCase())
      ).slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Linear Border Section Header (Robosap / Martfury Style) */}
      <div className="border-b-2 border-slate-200 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="flex items-end gap-4">
          <div className="relative">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pb-3 -mb-[14px] border-b-2 border-amber-500 inline-block">
              {categoryTitle}
            </h2>
          </div>
          {categorySubtitle && (
            <span className="hidden xl:inline text-xs text-slate-500 pb-0.5">
              • {categorySubtitle}
            </span>
          )}
        </div>

        {/* Inline Subcategory Tabs & View All */}
        <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 flex-wrap">
          {subcategories.length > 0 && (
            <ul className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-600">
              <li>
                <button
                  onClick={() => setSelectedSubcat("All")}
                  className={`transition-colors pb-0.5 ${
                    selectedSubcat === "All"
                      ? "text-amber-600 font-bold border-b border-amber-500"
                      : "hover:text-amber-600"
                  }`}
                >
                  All
                </button>
              </li>
              {subcategories.map((sub, i) => (
                <li key={i}>
                  <button
                    onClick={() => setSelectedSubcat(sub)}
                    className={`transition-colors pb-0.5 ${
                      selectedSubcat === sub
                        ? "text-amber-600 font-bold border-b border-amber-500"
                        : "hover:text-amber-600"
                    }`}
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/categories/${categorySlug}`}
            className="text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 shrink-0 group ml-auto md:ml-0"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Balanced 4-Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {displayProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
