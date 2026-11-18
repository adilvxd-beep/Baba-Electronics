"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Cpu, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_PRODUCTS } from "@/lib/catalog/data";
import { formatINR } from "@/lib/utils";

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
        <Link href="/catalog" className="text-slate-500 hover:text-blue-600 transition-colors">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <Card key={prod.id} className="flex flex-col justify-between overflow-hidden border hover:border-blue-500 transition-all">
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  {prod.sourceType === "MANUFACTURED" ? (
                    <Badge className="bg-blue-600 text-white text-[10px]">Own-Made</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">Traded</Badge>
                  )}
                </div>
              </div>

              <CardHeader className="p-4 pb-2 space-y-1">
                <p className="text-[10px] font-semibold text-slate-400 uppercase">{prod.category}</p>
                <Link href={`/products/${prod.slug}`}>
                  <CardTitle className="text-sm font-bold line-clamp-2 hover:text-blue-600">
                    {prod.name}
                  </CardTitle>
                </Link>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-3">
                <div className="pt-2 border-t flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900">{formatINR(prod.sellingPrice)}</span>
                    <span className="text-xs text-slate-400 line-through ml-1.5">{formatINR(prod.mrp)}</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600">
                    {prod.stockQuantity > 0 ? "In Stock" : "Made to order"}
                  </span>
                </div>

                <Link href={`/products/${prod.slug}`} className="block">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    View Product Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
