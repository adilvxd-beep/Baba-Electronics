"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Wrench, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Layers,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SLIDES = [
  {
    id: "slide-iot",
    tag: "Next-Gen Microcontrollers",
    title: "IoT Hardware, Dev Kits & Microcontrollers",
    subtitle: "India's premier hub for ESP32-WROOM, NodeMCU, Arduino and high-speed BLE development boards with ready stock.",
    highlight: "Ready to Dispatch in 24 Hours",
    ctaPrimary: { label: "Explore IoT Boards", href: "/categories/esp32" },
    ctaSecondary: { label: "View All Catalog", href: "/catalog" },
    gradient: "from-slate-950 via-slate-900 to-amber-950/60",
    accentColor: "from-amber-400 to-amber-200",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    icon: Cpu,
  },
  {
    id: "slide-billboard",
    tag: "Custom Engineering Desk",
    title: "Bespoke Billboards & Logo Sync Controllers",
    subtitle: "Custom LED matrix signage, multi-panel synchronous logo controllers, and RS485 industrial drivers built to your exact specs.",
    highlight: "15-Day Price Protection Guarantee",
    ctaPrimary: { label: "Request Custom Quote", href: "/custom-build" },
    ctaSecondary: { label: "Upload Gerber CAD", href: "/custom-build" },
    gradient: "from-slate-950 via-slate-900 to-slate-900",
    accentColor: "from-amber-400 to-yellow-300",
    image: "https://images.unsplash.com/photo-1608555895051-bf552f6ea60e?w=900&auto=format&fit=crop&q=80",
    icon: Wrench,
  },
  {
    id: "slide-sensors",
    tag: "Industrial Grade Modules",
    title: "Wide Range of Sensors, Robotics & IoT Shields",
    subtitle: "Precision temperature, humidity, ultrasonic, gas, motion, and optical sensors with full pinout diagrams and datasheets.",
    highlight: "Tiered Volume Discounts for 10+ & 50+ Pcs",
    ctaPrimary: { label: "Browse Sensors", href: "/categories/sensors" },
    ctaSecondary: { label: "Wholesale Matrix", href: "/quick-order" },
    gradient: "from-slate-950 via-slate-900 to-amber-950/40",
    accentColor: "from-amber-400 to-orange-300",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=900&auto=format&fit=crop&q=80",
    icon: Zap,
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Main Slider (8 cols on lg) */}
      <div 
        className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-xl bg-slate-950 min-h-[420px] md:min-h-[460px] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-30 transition-all duration-700 scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(217,119,6,0.18),transparent_60%)]" />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 p-6 md:p-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{slide.tag}</span>
            <span className="text-amber-400/50">•</span>
            <span className="text-slate-300">{slide.highlight}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {slide.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <Link href={slide.ctaPrimary.href}>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm h-11 px-6">
                <IconComponent className="w-4 h-4 mr-2" />
                {slide.ctaPrimary.label}
              </Button>
            </Link>
            <Link href={slide.ctaSecondary.href}>
              <Button size="lg" variant="outline" className="border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white text-sm h-11 px-5">
                {slide.ctaSecondary.label} &rarr;
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all opacity-80 hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all opacity-80 hover:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === i ? "w-7 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Side Promotion Tiles (4 cols on lg - Robosap/Martfury style) */}
      <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-between">
        {/* Side Promo 1: Custom Build Desk */}
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-5 shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                Custom Engineering
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 15-Day Lock
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Need Bespoke Hardware?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload your CAD / Gerber `.zip` files for custom logo sync boards, LED matrix displays, or industrial billboards.
            </p>
          </div>
          <div className="pt-4 relative z-10">
            <Link href="/custom-build" className="block">
              <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-9">
                <Wrench className="w-3.5 h-3.5 mr-1.5" /> Request Engineering Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Side Promo 2: B2B Wholesale Matrix */}
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-5 shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                B2B Bulk Orders
              </span>
              <span className="text-[11px] text-slate-400">10+ & 50+ Slabs</span>
            </div>
            <h3 className="font-bold text-base text-white">Production Quantity Matrix</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-speed bulk ordering matrix with automated GST input tax credit (ITC) invoices.
            </p>
          </div>
          <div className="pt-4 relative z-10">
            <Link href="/quick-order" className="block">
              <Button size="sm" variant="outline" className="w-full border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs h-9">
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Open Quick Matrix
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
