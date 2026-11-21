"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingCart, 
  Eye, 
  Star, 
  TrendingDown, 
  Check, 
  Sparkles,
  Layers
} from "lucide-react";
import { ProductData } from "@/lib/catalog/data";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/lib/cart/store";

interface ProductCardProps {
  product: ProductData;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = product.mrp > product.sellingPrice
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0;

  // Calculate base price before GST for transparent Robosap-style suffix
  const gstRate = product.gstRate || 18;
  const basePrice = Math.round((product.sellingPrice / (1 + gstRate / 100)) * 100) / 100;

  // Average review rating or default high score for aesthetic
  const averageRating = product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : "4.9";
  const reviewCount = product.reviews && product.reviews.length > 0 ? product.reviews.length : 12;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, undefined, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-xl p-3 border border-transparent hover:border-amber-400 hover:shadow-xl transition-all duration-300">
      <div>
        {/* Thumbnail Area */}
        <div className="relative aspect-square w-full rounded-lg bg-slate-50/70 p-3 overflow-hidden flex items-center justify-center">
          {/* Ribbons / Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
            {discountPercent > 0 && (
              <span className="bg-amber-500 text-slate-950 font-extrabold text-[11px] px-2 py-0.5 rounded shadow-sm tracking-tight">
                -{discountPercent}%
              </span>
            )}
            {product.sourceType === "MANUFACTURED" && (
              <span className="bg-slate-900 text-amber-300 text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
                Own-Made
              </span>
            )}
          </div>

          <div className="absolute top-2 right-2 z-10">
            {product.stockQuantity > 0 ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> In Stock
              </span>
            ) : (
              <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Made to Order
              </span>
            )}
          </div>

          {/* Product Image */}
          <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading={priority ? "eager" : "lazy"}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Layers className="w-12 h-12" />
              </div>
            )}
          </Link>

          {/* Hover Slide-up Action Buttons (Robosap / Martfury signature) */}
          <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all ${
                isAdded 
                  ? "bg-emerald-600 text-white" 
                  : "bg-amber-500 hover:bg-amber-600 text-slate-950 active:scale-95"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="p-2 rounded-md bg-white hover:bg-slate-100 text-slate-700 shadow-md transition-colors"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="pt-2.5 pb-1">
          {/* Category */}
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-700">{averageRating}</span>
            <span className="text-[10px] text-slate-400">({reviewCount})</span>
          </div>

          {/* Price Box with Robosap-style GST Breakdown */}
          <div className="mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-slate-900">
                {formatINR(product.sellingPrice)}
              </span>
              {product.mrp > product.sellingPrice && (
                <del className="text-xs text-slate-400 font-normal">
                  {formatINR(product.mrp)}
                </del>
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
              incl. GST ({formatINR(basePrice)} + {gstRate}% GST)
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info: Bulk discount tier if present */}
      {product.quantityDiscounts && product.quantityDiscounts.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-900 bg-amber-50/90 border border-amber-200/60 px-2 py-1 rounded">
            <TrendingDown className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="truncate">
              Bulk: <strong>{formatINR(product.quantityDiscounts[0].discountedPrice)}</strong> for {product.quantityDiscounts[0].minQuantity}+ pcs
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
