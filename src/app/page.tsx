import React from "react";
import Link from "next/link";
import { 
  Cpu, 
  Wrench, 
  Layers, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  CheckCircle2,
  PackageCheck,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

// Mock Sample High-Impact Products for Initial Visual Verification
const FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    name: "ESP32-WROOM-32D Development Board (Dual-Core Wi-Fi + BLE)",
    sku: "BE-ESP32-001",
    category: "IoT Dev Boards",
    mrp: 499,
    sellingPrice: 389,
    discountSlab: "₹349 for 10+ pcs",
    stockStatus: "IN_STOCK",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    specs: ["3.3V Logic", "Type-C USB", "CP2102", "38 Pins"],
    isTraded: false,
  },
  {
    id: "prod-2",
    name: "DHT22 Digital Temperature & Humidity Sensor Module",
    sku: "BE-SEN-DHT22",
    category: "Sensors",
    mrp: 350,
    sellingPrice: 249,
    discountSlab: "₹219 for 10+ pcs",
    stockStatus: "IN_STOCK",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80",
    specs: ["-40 to 80°C", "0-100% RH", "High Precision"],
    isTraded: true,
  },
  {
    id: "prod-3",
    name: "Custom RGB Matrix Logo Sync Controller Board v2.1",
    sku: "BE-CUST-LSB01",
    category: "Custom Engineering",
    mrp: 3200,
    sellingPrice: 2650,
    discountSlab: "Bespoke Firmware",
    stockStatus: "MADE_TO_ORDER",
    image: "https://images.unsplash.com/photo-1608555895051-bf552f6ea60e?w=600&auto=format&fit=crop&q=80",
    specs: ["RS485 + Wi-Fi", "Dual Power 5V/12V", "Gerber Ready"],
    isTraded: false,
  },
  {
    id: "prod-4",
    name: "Arduino Nano V3 Compatible Board (ATmega328P CH340)",
    sku: "BE-ARD-NANO3",
    category: "IoT Dev Boards",
    mrp: 299,
    sellingPrice: 219,
    discountSlab: "₹189 for 50+ pcs",
    stockStatus: "LOW_STOCK",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80",
    specs: ["5V Logic", "Mini USB", "Unsoldered Headers"],
    isTraded: true,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" /> India-Wide Express Delivery & Verified GST Compliance
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              IoT Hardware, Dev Kits & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Custom Boards</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Serving makers, colleges, and enterprise engineers for 25+ years. Instant buy for ready stock dev kits, volume tiered pricing, or custom engineered logo sync boards and billboards.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/catalog">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/30">
                  <Cpu className="w-4 h-4" /> Browse Catalog
                </Button>
              </Link>
              <Link href="/custom-build">
                <Button size="lg" variant="outline" className="border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" /> Request Custom Build Quote
                </Button>
              </Link>
            </div>
            
            {/* Quick Micro-Stats */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800 text-left text-xs text-slate-400">
              <div>
                <p className="font-bold text-white text-base">500+ SKUs</p>
                <p>Boards & Sensors</p>
              </div>
              <div>
                <p className="font-bold text-white text-base">Tiered Slabs</p>
                <p>10+ & 50+ Wholesale</p>
              </div>
              <div>
                <p className="font-bold text-white text-base">15-Min Lock</p>
                <p>Zero Double Allocation</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="w-full md:w-96 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Custom Engineering Desk</span>
              <Badge variant="success" className="text-[10px]">Now Accepting Specs</Badge>
            </div>
            <div className="py-4 space-y-3">
              <h3 className="font-bold text-lg text-white">Need Bespoke Hardware?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upload your CAD / Gerber `.zip` files for custom logo sync boards, LED matrix displays, or industrial billboards. 
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 15-Day Price Protection Guarantee
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 50% Advance / 50% Pre-Dispatch
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Engineering Updates
                </li>
              </ul>
            </div>
            <Link href="/custom-build" className="block w-full">
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700">
                Upload Gerber & Spec Sheet &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories Quick Tiles */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Explore Catalog by Category</h2>
            <p className="text-sm text-slate-500">Industry-standard microcontroller dev kits, IoT modules, and components</p>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/categories/esp32" className="group">
            <Card className="h-full border hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">ESP32 & IoT Boards</h3>
                  <p className="text-xs text-slate-500">Wi-Fi, BLE, Dual Core</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/categories/sensors" className="group">
            <Card className="h-full border hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Digital Sensors</h3>
                  <p className="text-xs text-slate-500">Temp, Motion, Gas, Optical</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/categories/custom-billboards" className="group">
            <Card className="h-full border hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Logo & Billboards</h3>
                  <p className="text-xs text-slate-500">Custom LED signage & sync</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/categories/starter-kits" className="group">
            <Card className="h-full border hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Starter Component Kits</h3>
                  <p className="text-xs text-slate-500">Educational & Maker sets</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Popular In-Stock Components</h2>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">Ready to Ship</Badge>
            </div>
            <p className="text-sm text-slate-500">Standard retail pricing with automatic quantity discounts in cart</p>
          </div>
          <Link href="/quick-order" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
            Wholesale Matrix &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((prod) => (
            <Card key={prod.id} className="flex flex-col justify-between overflow-hidden border hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {prod.stockStatus === "IN_STOCK" && (
                    <Badge variant="success" className="text-[10px]">In Stock</Badge>
                  )}
                  {prod.stockStatus === "LOW_STOCK" && (
                    <Badge variant="warning" className="text-[10px]">Low Stock</Badge>
                  )}
                  {prod.stockStatus === "MADE_TO_ORDER" && (
                    <Badge variant="secondary" className="text-[10px] bg-slate-900 text-white">Made to Order</Badge>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-mono bg-white/90 backdrop-blur px-1.5 py-0.5 rounded border text-slate-600">
                    {prod.sku}
                  </span>
                </div>
              </div>

              <CardHeader className="p-4 pb-2 space-y-1">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{prod.category}</p>
                <CardTitle className="text-sm font-bold line-clamp-2 leading-snug">
                  {prod.name}
                </CardTitle>
                <div className="flex flex-wrap gap-1 pt-1">
                  {prod.specs.map((spec, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                      {spec}
                    </span>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-3">
                <div className="pt-2 border-t flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900">{formatINR(prod.sellingPrice)}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">{formatINR(prod.mrp)}</span>
                    <p className="text-[10px] text-slate-500">+18% GST at checkout</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-blue-700 bg-blue-50/80 px-2 py-1 rounded font-medium">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{prod.discountSlab}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="w-3 h-3 mr-1" /> Datasheet
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* B2B & Wholesale Quick-Order Banner */}
      <section className="container mx-auto px-4">
        <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
              B2B & Bulk Wholesale Procurement
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Rapid Matrix Ordering for Production Runs
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Order hundreds of microcontrollers and sensors with variant matrices on a single high-speed screen. Enter GSTIN during checkout for instant input tax credit (ITC) invoices.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/quick-order">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">
                Open Bulk Order Matrix
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="w-full border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white">
                Register Business Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
