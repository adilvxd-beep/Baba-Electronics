"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Wrench, 
  Zap, 
  ArrowRight,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    id: "slide-iot",
    tag: "IoT & Microcontrollers",
    title: "ESP32, NodeMCU & Arduino Ecosystems",
    subtitle: "Engineered for makers and industrial automation. High-speed dual-core Wi-Fi + BLE dev kits with instant dispatch.",
    ctaPrimary: { label: "Explore Dev Boards", href: "/categories/esp32" },
    ctaSecondary: { label: "Full Catalog", href: "/catalog" },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    icon: Cpu,
  },
  {
    id: "slide-billboard",
    tag: "Custom Engineering",
    title: "Bespoke Billboards & Logo Sync Controllers",
    subtitle: "Upload your CAD / Gerber files. We manufacture custom LED matrix signage and multi-panel synchronous controllers.",
    ctaPrimary: { label: "Request Custom Quote", href: "/custom-build" },
    ctaSecondary: { label: "Engineering Specs", href: "/custom-build" },
    image: "https://images.unsplash.com/photo-1608555895051-bf552f6ea60e?w=900&auto=format&fit=crop&q=80",
    icon: Wrench,
  },
  {
    id: "slide-sensors",
    tag: "Sensors & Modules",
    title: "Precision Digital Sensors & Robotics Shields",
    subtitle: "Temperature, gas, motion, and environmental sensor modules with verified pinouts and bulk quantity discounts.",
    ctaPrimary: { label: "Browse Sensors", href: "/categories/sensors" },
    ctaSecondary: { label: "Wholesale Matrix", href: "/quick-order" },
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
      {/* Main Banner Slider (8 cols) */}
      <div 
        className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-lg bg-slate-950 min-h-[400px] md:min-h-[440px] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-30 transition-all duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-12 max-w-xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-sm">
            {slide.tag}
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {slide.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <Link href={slide.ctaPrimary.href}>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md active:scale-95 transition-all text-sm h-11 px-6">
                <IconComponent className="w-4 h-4 mr-2" />
                {slide.ctaPrimary.label}
              </Button>
            </Link>
            <Link href={slide.ctaSecondary.href}>
              <Button size="lg" variant="outline" className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-white text-sm h-11 px-5">
                {slide.ctaSecondary.label} &rarr;
              </Button>
            </Link>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-70 hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-70 hover:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === i ? "w-6 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Side Promos (4 cols) */}
      <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-between">
        {/* Custom Build Desk */}
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-md flex flex-col justify-between text-white relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full inline-block">
              Custom Engineering
            </span>
            <h3 className="font-bold text-lg text-white">Need Bespoke Hardware?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload CAD / Gerber `.zip` files for custom logo sync boards and LED billboard manufacturing.
            </p>
          </div>
          <div className="pt-4 relative z-10">
            <Link href="/custom-build" className="block">
              <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-9">
                <Wrench className="w-3.5 h-3.5 mr-1.5" /> Request Custom Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* B2B Wholesale */}
        <div className="flex-1 rounded-2xl bg-slate-900 p-6 shadow-md flex flex-col justify-between text-white relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full inline-block">
              B2B Wholesale
            </span>
            <h3 className="font-bold text-lg text-white">Rapid Matrix Ordering</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Order hundreds of microcontrollers and sensors with tiered pricing and instant GST ITC invoices.
            </p>
          </div>
          <div className="pt-4 relative z-10">
            <Link href="/quick-order" className="block">
              <Button size="sm" variant="outline" className="w-full border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white text-xs h-9">
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Open Bulk Matrix
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
