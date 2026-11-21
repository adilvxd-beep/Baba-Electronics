"use client";

import React, { useState, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { 
  Cpu, 
  Download, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CheckCircle2, 
  Star, 
  MapPin, 
  FileText, 
  ArrowLeft,
  Share2,
  TrendingDown,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_PRODUCTS, ProductData } from "@/lib/catalog/data";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/lib/cart/store";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = useMemo(() => {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product?.variants && product.variants.length > 0 ? product.variants[0].id : null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <Cpu className="w-12 h-12 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-800">Product Not Found</h1>
        <p className="text-sm text-slate-500">The requested SKU or product URL does not exist.</p>
        <Link href="/catalog">
          <Button variant="outline">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  // Active pricing based on variant selection
  const activeVariantObj = product.variants?.find((v) => v.id === selectedVariant);
  const currentPrice = activeVariantObj ? activeVariantObj.price : product.sellingPrice;

  // Active bulk discount calculation
  const calculatedUnitPrice = useMemo(() => {
    if (!product.quantityDiscounts || product.quantityDiscounts.length === 0) {
      return currentPrice;
    }
    const matchedSlab = [...product.quantityDiscounts]
      .reverse()
      .find((slab) => quantity >= slab.minQuantity);
    return matchedSlab ? matchedSlab.discountedPrice : currentPrice;
  }, [quantity, currentPrice, product.quantityDiscounts]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    // Simulation of Shiprocket EDD check
    setPincodeStatus(`Verified: Express Delivery in 2–4 Business Days to PIN ${pincode} via Shiprocket courier.`);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-amber-600 transition-colors">Catalog</Link>
        <span>/</span>
        <span className="hover:text-amber-600 transition-colors">{product.category}</span>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border shadow-sm">
            <img 
              src={product.images[selectedImageIndex] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.sourceType === "MANUFACTURED" ? (
                <Badge className="bg-amber-600 text-white text-[11px]">Manufactured by Baba Electronics</Badge>
              ) : (
                <Badge variant="secondary" className="bg-slate-900 text-white text-[11px]">Traded / Certified</Badge>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === i ? "border-amber-600 shadow" : "border-slate-200 opacity-70"
                  }`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Datasheet & Documentation Card */}
          {product.datasheetUrl && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-semibold text-slate-900">Technical Datasheet (PDF)</p>
                  <p className="text-slate-500">Pinout diagrams, schematics & specs</p>
                </div>
              </div>
              <a href={product.datasheetUrl} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline" className="h-8 text-xs bg-white text-amber-800 border-amber-300 hover:bg-amber-100">
                  <Download className="w-3.5 h-3.5 mr-1" /> Download
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Right Product Details & Buy Box (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                SKU: {activeVariantObj ? activeVariantObj.sku : product.sku}
              </span>
              <span className="text-xs text-slate-400">HSN: {product.hsnCode}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-slate-700">
              {product.reviews.length > 0 ? `${product.reviews.length} Verified Buyer Reviews` : "New Product"}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Immediate Dispatch
            </span>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-white border shadow-sm space-y-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-black text-slate-950">{formatINR(calculatedUnitPrice)}</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 uppercase tracking-wide">
                + GST (18%)
              </span>
              <span className="text-base text-slate-400 line-through">{formatINR(product.mrp)}</span>
              <span className="text-xs font-semibold text-emerald-600">
                Save {Math.round(((product.mrp - calculatedUnitPrice) / product.mrp) * 100)}%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ex-factory price per {product.unit.toLowerCase()} (₹{calculatedUnitPrice} + 18% GST). Express Shiprocket courier calculated at checkout.
            </p>

            {/* Quantity Slabs (From Requirements Spec) */}
            {product.quantityDiscounts.length > 0 && (
              <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                  <TrendingDown className="w-4 h-4 text-amber-600" /> Bulk Quantity Discounts (Applied in Cart):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {product.quantityDiscounts.map((slab, i) => (
                    <div 
                      key={i} 
                      className={`p-2 rounded bg-white border text-center ${
                        quantity >= slab.minQuantity ? "border-amber-600 ring-1 ring-amber-600 font-bold text-amber-950" : "text-slate-600"
                      }`}
                    >
                      <span className="block text-[11px] font-medium text-slate-500">{slab.minQuantity}+ Units</span>
                      <span className="text-sm font-extrabold text-amber-700">{formatINR(slab.discountedPrice)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Switcher */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2 border-t">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Select Model / Variant:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedVariant === v.id
                          ? "border-amber-600 bg-amber-50/50 ring-1 ring-amber-600 text-slate-900 font-semibold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span>{v.name}</span>
                        <span className="font-bold text-amber-700">{formatINR(v.price)}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block pt-1 font-mono">{v.sku}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 border-t flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex items-center border rounded-lg overflow-hidden bg-slate-50">
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center bg-transparent text-sm font-bold focus:outline-none"
                />
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <Button 
                size="lg" 
                onClick={() => {
                  addItem(product, selectedVariant || undefined, quantity);
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2000);
                }}
                className={`flex-1 font-semibold shadow-md transition-all ${
                  addedToCart ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                {addedToCart ? "Added to Cart!" : `Add to Cart (${quantity} ${quantity > 1 ? "units" : "unit"})`}
              </Button>

              <a
                href={`https://wa.me/919990333434?text=${encodeURIComponent(
                  `Hello Baba Electronics, I want to order "${product.name}" (SKU: ${activeVariantObj ? activeVariantObj.sku : product.sku}) at ₹${calculatedUnitPrice} + GST. Qty: ${quantity}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all active:scale-95 shrink-0"
                title="Order directly on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Pincode Serviceability Check Widget */}
          <div className="p-4 rounded-xl border bg-white space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <MapPin className="w-4 h-4 text-amber-600" /> Check Pan-India Delivery & Estimated Delivery Date:
            </div>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                className="w-48 rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <Button type="submit" variant="outline" size="sm" className="text-xs">
                Check
              </Button>
            </form>
            {pincodeStatus && (
              <p className="text-xs font-medium text-emerald-700 pt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> {pincodeStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <section className="space-y-4 pt-6 border-t">
        <h2 className="text-xl font-bold text-slate-900">Technical Specifications</h2>
        <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
          <div className="divide-y text-xs">
            {Object.entries(product.specs).map(([key, val], idx) => (
              <div key={idx} className="grid grid-cols-3 sm:grid-cols-4 p-3 hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-slate-500 uppercase tracking-wider">{key}</span>
                <span className="col-span-2 sm:col-span-3 text-slate-900 font-mono font-medium">
                  {Array.isArray(val) ? val.join(", ") : val}
                </span>
              </div>
            ))}
            <div className="grid grid-cols-3 sm:grid-cols-4 p-3 hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-500 uppercase tracking-wider">Warranty</span>
              <span className="col-span-2 sm:col-span-3 text-slate-900 font-medium">
                {product.warrantyMonths} Months standard replacement against manufacturing defects
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 p-3 hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-500 uppercase tracking-wider">Country of Origin</span>
              <span className="col-span-2 sm:col-span-3 text-slate-900 font-medium">
                {product.countryOfOrigin}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Buyer Reviews & Moderation Section */}
      <section className="space-y-4 pt-6 border-t">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Verified Buyer Reviews</h2>
            <p className="text-xs text-slate-500">Only verified buyers who received the item can submit feedback</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Write a Review
          </Button>
        </div>

        {product.reviews.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed text-center space-y-2 bg-white">
            <p className="text-xs text-slate-500">No customer reviews yet for this SKU.</p>
            <p className="text-[11px] text-slate-400">Order today to be the first verified reviewer.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((rev) => (
              <Card key={rev.id} className="p-4 space-y-2 border">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{rev.userName}</span>
                  <span className="text-slate-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  {rev.verifiedBuyer && (
                    <Badge variant="outline" className="ml-2 text-[10px] text-emerald-700 bg-emerald-50 border-emerald-300">
                      Verified Buyer
                    </Badge>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-800">{rev.headline}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
