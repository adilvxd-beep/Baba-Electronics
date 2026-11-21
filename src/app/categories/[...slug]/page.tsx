"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_PRODUCTS } from "@/lib/catalog/data";
import { ProductCard } from "@/components/products/ProductCard";

export default function CategoryDynamicPage() {
  const params = useParams();
  const slugArray = (params?.slug as string[]) || [];
  const currentSlug = slugArray[slugArray.length - 1] || "";

  // Match category or sub-category
  const products = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => {
      const matchCat = p.category.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(currentSlug.toLowerCase());
      const matchSub = p.subCategory?.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(currentSlug.toLowerCase());
      return matchCat || matchSub;
    });
  }, [currentSlug]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Link href="/catalog" className="text-slate-500 hover:text-amber-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold capitalize text-slate-900">
            {currentSlug.replace(/-/g, " ")} Products
          </h1>
          <p className="text-xs text-slate-500">
            Filtered view for category: {slugArray.join(" / ")}
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-dashed bg-white space-y-3">
          <Cpu className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800">No products found in this category</h3>
          <p className="text-xs text-slate-500">Explore all items in our main catalog.</p>
          <Link href="/catalog">
            <Button size="sm">Go to Catalog</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
