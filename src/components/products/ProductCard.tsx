"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Check, Star, Layers } from "lucide-react";
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

  // Single star compact rating
  const averageRating = product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : "4.9";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, undefined, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl p-3.5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        {/* Spacious, Neutral Product Thumbnail */}
        <div className="relative aspect-square w-full rounded-xl bg-slate-50/80 p-4 overflow-hidden flex items-center justify-center mb-3">
          {/* Minimalist Micro Discount Pill */}
          {discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-amber-500/95 backdrop-blur-sm text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm tracking-tight">
              {discountPercent}% OFF
            </span>
          )}

          {/* Product Image */}
          <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading={priority ? "eager" : "lazy"}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Layers className="w-10 h-10 text-slate-300" />
            )}
          </Link>

          {/* Sleek Floating Quick-Add Button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-2.5 right-2.5 z-10 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all duration-200 active:scale-90 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-white/95 hover:bg-slate-950 hover:text-white text-slate-800 backdrop-blur-sm opacity-90 group-hover:opacity-100 group-hover:scale-105"
            }`}
            title={isAdded ? "Added to Cart" : "Quick Add to Cart"}
            aria-label="Add to Cart"
          >
            {isAdded ? <Check className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>

        {/* Clean, Lean Product Details */}
        <div className="space-y-1.5 px-0.5">
          {/* Micro Category & Compact Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-medium tracking-wide truncate max-w-[70%]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold text-slate-700 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{averageRating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Clean Price */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-base font-extrabold text-slate-950">
              {formatINR(product.sellingPrice)}
            </span>
            {product.mrp > product.sellingPrice && (
              <del className="text-xs text-slate-400 font-normal">
                {formatINR(product.mrp)}
              </del>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
