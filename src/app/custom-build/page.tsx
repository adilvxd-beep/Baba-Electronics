"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wrench, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  FileCode, 
  Cpu, 
  Layers, 
  AlertCircle,
  HelpCircle,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { submitCustomQuoteRequest, CustomQuoteRecord } from "@/lib/quotes/service";
import { formatINR } from "@/lib/utils";

export default function CustomBuildPage() {
  const [boardType, setBoardType] = useState<"Logo Sync Board" | "Commercial Billboard" | "Custom IoT Controller">("Logo Sync Board");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [dimensions, setDimensions] = useState("120 x 40 cm");
  const [ledPitch, setLedPitch] = useState("P5 Full Color RGB");
  const [controllerChip, setControllerChip] = useState("ESP32 Dual-Core + RS485");
  const [powerSupply, setPowerSupply] = useState("12V / 24V Industrial SMPS");
  const [targetQuantity, setTargetQuantity] = useState(2);
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const [submittedQuote, setSubmittedQuote] = useState<CustomQuoteRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 10) {
      alert("Please provide a valid 10-digit mobile number for WhatsApp quote notifications.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const quote = submitCustomQuoteRequest({
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        businessName: businessName || undefined,
        boardType,
        specs: {
          dimensions,
          ledPitch,
          controllerChip,
          powerSupply,
          targetQuantity,
          notes,
        },
        gerberFileName: fileName || "Client_Schematic_Draft.zip",
      });

      setSubmittedQuote(quote);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-4xl">
      {/* Hero Header */}
      <div className="text-center space-y-3 pb-6 border-b">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" /> Bespoke Engineering Desk
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Custom Hardware & Billboard Builder
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          Upload your Gerber files or design parameters. Our hardware engineers review BOM costs and issue a formal 15-day price-guaranteed quote with 50% milestone payment terms.
        </p>
      </div>

      {submittedQuote ? (
        <Card className="border shadow-lg p-6 sm:p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <Badge variant="success" className="text-xs">
              Quote Request Submitted Successfully
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900">Reference: {submittedQuote.quoteNumber}</h2>
            <p className="text-xs text-slate-500">
              Our engineering team has received your technical specs and Gerber archive.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-500">Project Type:</span>
              <strong className="text-slate-900">{submittedQuote.boardType}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Quantity:</span>
              <strong className="text-slate-900">{submittedQuote.specs.targetQuantity} units</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Notification Channel:</span>
              <strong className="text-amber-600">WhatsApp (+91 {submittedQuote.customerPhone})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Guaranteed Review:</span>
              <strong className="text-slate-900">Within 24 Business Hours</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href={`/api/quotes/${submittedQuote.quoteNumber}/document`} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> View Quotation Draft
              </Button>
            </a>
            <Link href="/catalog">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
                Browse Ready Stock Catalog &rarr;
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Engineering Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border bg-white space-y-1.5 shadow-sm">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 15-Day Price Protection
              </span>
              <p className="text-slate-500">Formal quote stays frozen for 15 days while you finalize design approvals.</p>
            </div>
            <div className="p-4 rounded-xl border bg-white space-y-1.5 shadow-sm">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" /> 50% Milestone Advance
              </span>
              <p className="text-slate-500">Pay 50% to trigger PCB fabrication and component BOM procurement.</p>
            </div>
            <div className="p-4 rounded-xl border bg-white space-y-1.5 shadow-sm">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-purple-600" /> WhatsApp Engineering Desk
              </span>
              <p className="text-slate-500">Receive assembly photos, testing videos, and live progress updates.</p>
            </div>
          </div>

          {/* Step 1: Project Type */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 p-5 pb-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-900">1. Select Project Category</CardTitle>
            </CardHeader>
            <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Logo Sync Board", desc: "Multi-panel synchronous signage animation" },
                { title: "Commercial Billboard", desc: "High-lumen outdoor LED advertising matrix" },
                { title: "Custom IoT Controller", desc: "Industrial sensor & telemetry board" },
              ].map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setBoardType(item.title as any)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    boardType === item.title
                      ? "border-amber-600 bg-amber-50/50 ring-1 ring-amber-500 font-semibold text-slate-900"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{item.title}</p>
                  <p className="text-[11px] text-slate-500 pt-1 leading-snug">{item.desc}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Step 2: Technical Parameters */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 p-5 pb-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-900">2. Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Dimensions (Width x Height)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 180 x 60 cm or 10 x 8 cm"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Fabrication Target Quantity</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={targetQuantity}
                  onChange={(e) => setTargetQuantity(parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-bold focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Microcontroller / Architecture</label>
                <input
                  type="text"
                  placeholder="e.g. ESP32 Wi-Fi + RS485 Master-Slave"
                  value={controllerChip}
                  onChange={(e) => setControllerChip(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Operating Power Supply</label>
                <input
                  type="text"
                  placeholder="e.g. 12V 10A Industrial / 24V Solar"
                  value={powerSupply}
                  onChange={(e) => setPowerSupply(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700">Application Notes & Firmware Features</label>
                <textarea
                  rows={3}
                  placeholder="Describe your control requirements, phone app sync, display modes, weatherproofing, or relay switches..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 3: CAD / Gerber Upload */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 p-5 pb-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-600" /> 3. Schematic & Gerber File Upload (.zip)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <FileCode className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="font-bold text-slate-800 text-xs">
                  {fileName ? `Attached: ${fileName}` : "Upload Gerber Archives or CAD Drawings (.zip, .rar, .pdf)"}
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  RS-274X Gerber, Eagle, Altium, or hand-sketched dimensional schematics (Max 50MB)
                </p>
                <input
                  type="file"
                  id="gerber-file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setFileName(f.name);
                  }}
                />
                <label htmlFor="gerber-file" className="inline-block mt-3">
                  <Button type="button" size="sm" variant="outline" className="text-xs">
                    Choose CAD Archive
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Contact & WhatsApp */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 p-5 pb-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-900">4. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Deshmukh"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">WhatsApp Mobile Number *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-lg border border-slate-300 pl-11 pr-3 py-2.5 text-xs font-mono font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Company / Signage Firm (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Signage LLP"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="anand@company.in"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Dispatching Spec Archive..." : "Submit Technical Specs for Quotation"} <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}
    </div>
  );
}
