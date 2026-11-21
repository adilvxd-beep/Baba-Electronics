"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SAMPLE_PRODUCTS } from "@/lib/catalog/data";

interface CategoryShowcaseProps {
  categoryTitle: string;
  categorySubtitle: string;
  categoryFilter: string;
  categorySlug: string;
}

export function CategoryShowcase({
  categoryTitle,
  categorySubtitle,
  categoryFilter,
  categorySlug,
}: CategoryShowcaseProps) {
  const products = SAMPLE_PRODUCTS.filter((p) =>
    p.category.toLowerCase().includes(categoryFilter.toLowerCase())
  ).slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Sleek, Modern Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {categoryTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {categorySubtitle}
          </p>
        </div>
        <Link 
          href={`/categories/${categorySlug}`}
          className="text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 shrink-0"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Balanced 4-Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
