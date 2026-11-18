"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CreditCard, 
  Truck, 
  Receipt, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Building2,
  Lock,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/lib/cart/store";
import { calculateIndianGST, INDIAN_STATES } from "@/lib/tax/gst";
import { formatINR } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, hasFreightItems } = useCart();

  // User & Contact Info
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Address
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("27"); // Default: Maharashtra (Intra-State)
  const [pincode, setPincode] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  // B2B GSTIN
  const [gstin, setGstin] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD" | "BANK_TRANSFER">("RAZORPAY");
  const [utrNumber, setUtrNumber] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reservationSeconds, setReservationSeconds] = useState(900); // 15 mins = 900s

  // 15-minute countdown reservation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setReservationSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Courier shipping amount (Free above ₹1,000, else ₹80)
  const shippingAmount = useMemo(() => {
    if (subtotal > 1000 || subtotal === 0) return 0;
    return 80;
  }, [subtotal]);

  // COD surcharge fee (₹50)
  const codFee = paymentMethod === "COD" ? 50 : 0;

  // Real-time GST calculation based on delivery state
  const gstResult = useMemo(() => {
    const lineItems = items.map((i) => ({
      sku: i.sku,
      name: i.name,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      gstRate: i.gstRate,
    }));
    return calculateIndianGST(lineItems, stateCode, shippingAmount + codFee);
  }, [items, stateCode, shippingAmount, codFee]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    if (!phone || phone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!street || !city || !pincode) {
      setErrorMessage("Please complete all shipping address fields.");
      return;
    }

    // COD limit check (max ₹2,500)
    if (paymentMethod === "COD" && gstResult.grandTotal > 2500) {
      setErrorMessage("Cash on Delivery (COD) is available only for orders up to ₹2,500. Please select Razorpay UPI / Cards.");
      return;
    }

    setIsLoading(true);

    try {
      const orderPayload = {
        phone,
        fullName,
        email,
        shippingAddress: {
          street,
          city,
          stateCode,
          stateName: INDIAN_STATES[stateCode],
          pincode,
          notes: deliveryNotes,
        },
        gstin: gstin.trim() || undefined,
        businessName: businessName.trim() || undefined,
        paymentMethod,
        utrNumber: paymentMethod === "BANK_TRANSFER" ? utrNumber : undefined,
        items: gstResult.lineItems,
        subtotal: gstResult.subtotal,
        totalTax: gstResult.totalTax,
        cgst: gstResult.totalCGST,
        sgst: gstResult.totalSGST,
        igst: gstResult.totalIGST,
        shippingAmount,
        codFee,
        grandTotal: gstResult.grandTotal,
      };

      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Failed to place order.");
        setIsLoading(false);
        return;
      }

      // Clear local cart
      clearCart();

      // Navigate to order confirmation
      router.push(`/checkout/success/${data.orderNumber}`);
    } catch {
      setErrorMessage("Network error occurred while creating order.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* 15-Minute Reservation Banner */}
      <div className="p-3.5 rounded-xl bg-blue-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2 font-medium">
          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>
            Stock Reserved: Component inventory locked for your order for{" "}
            <strong className="font-mono text-sm text-amber-300">{formatTimer(reservationSeconds)}</strong>
          </span>
        </div>
        <span className="text-[11px] text-blue-200">Zero overselling protection active</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Single-Page Checkout</h1>
          <p className="text-xs text-slate-500">Pan-India express delivery · Instant GST Tax Invoice</p>
        </div>
        <Link href="/cart" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Customer Contact */}
          <Card className="border shadow-sm">
            <CardHeader className="p-5 pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" /> 1. Contact & Mobile Verification
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Tracking links and PDF invoices will be sent to this WhatsApp / mobile number.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Mobile Number (India) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-lg border border-slate-300 pl-11 pr-3 py-2.5 text-xs font-mono font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700">Email Address (Optional, for Invoice PDF)</label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Shipping Address & GST State */}
          <Card className="border shadow-sm">
            <CardHeader className="p-5 pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" /> 2. Shipping Address & Tax Location
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Destination state determines CGST/SGST vs IGST tax bifurcation automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700">Street Address / Workshop / Office *</label>
                <input
                  type="text"
                  required
                  placeholder="Plot No., Industrial Area, Road Name"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune, Ahmedabad, Bengaluru"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">State (Tax Determination) *</label>
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-medium bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none"
                >
                  {Object.entries(INDIAN_STATES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name} {code === "27" ? "(Intra-State: CGST+SGST)" : "(Inter-State: IGST)"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">PIN Code (Shiprocket Courier Check) *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6-digit PIN code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="Gate pass instructions, receiver name..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 3: B2B Business Invoicing (GSTIN) */}
          <Card className="border shadow-sm">
            <CardHeader className="p-5 pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" /> 3. Business Details (Optional for B2B Input Tax Credit)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Enter your company GSTIN to receive a compliant B2B tax invoice to claim ITC.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Company / Firm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Embedded Systems Pvt Ltd"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">GSTIN Number (15 Characters)</label>
                <input
                  type="text"
                  maxLength={15}
                  placeholder="27AAAAA0000A1Z5"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none uppercase"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Payment Selection */}
          <Card className="border shadow-sm">
            <CardHeader className="p-5 pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" /> 4. Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs">
              {/* Option 1: Razorpay */}
              <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                paymentMethod === "RAZORPAY" ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" : "border-slate-200"
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={() => setPaymentMethod("RAZORPAY")}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Razorpay Online Payment (Recommended)</span>
                    <Badge variant="success" className="text-[10px]">Instant Confirmation</Badge>
                  </div>
                  <p className="text-slate-500">
                    UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Netbanking & Wallets.
                  </p>
                </div>
              </label>

              {/* Option 2: Cash on Delivery */}
              <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                paymentMethod === "COD" ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" : "border-slate-200"
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Cash on Delivery (COD)</span>
                    <span className="font-bold text-slate-700">+₹50 Convenience Fee</span>
                  </div>
                  <p className="text-slate-500">
                    Pay courier upon parcel delivery. Max order ceiling ₹2,500.
                  </p>
                </div>
              </label>

              {/* Option 3: Bank Transfer NEFT / RTGS */}
              <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                paymentMethod === "BANK_TRANSFER" ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" : "border-slate-200"
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "BANK_TRANSFER"}
                  onChange={() => setPaymentMethod("BANK_TRANSFER")}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Direct Bank Transfer (NEFT / RTGS)</span>
                    <Badge variant="outline" className="text-[10px]">For High-Value B2B</Badge>
                  </div>
                  <p className="text-slate-500">
                    Pay directly into Baba Electronics corporate bank account. Enter UTR reference below.
                  </p>
                  {paymentMethod === "BANK_TRANSFER" && (
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Enter 16-digit Bank UTR / Transaction Reference Number"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value.toUpperCase())}
                        className="w-full rounded-lg border border-slate-300 p-2 text-xs font-mono uppercase focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Right Summary Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="border shadow-md">
            <CardHeader className="p-5 pb-3 border-b">
              <CardTitle className="text-base font-bold text-slate-900">Order Tax Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Taxable Amount</span>
                  <span className="font-semibold text-slate-900">{formatINR(gstResult.subtotal)}</span>
                </div>

                {gstResult.isIntraState ? (
                  <>
                    <div className="flex justify-between text-blue-800">
                      <span>CGST (Intra-State Central Tax)</span>
                      <span className="font-mono font-semibold">{formatINR(gstResult.totalCGST)}</span>
                    </div>
                    <div className="flex justify-between text-blue-800">
                      <span>SGST (Intra-State Maharashtra Tax)</span>
                      <span className="font-mono font-semibold">{formatINR(gstResult.totalSGST)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-purple-800">
                    <span>IGST (Inter-State Integrated Tax)</span>
                    <span className="font-mono font-semibold">{formatINR(gstResult.totalIGST)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shiprocket Logistics</span>
                  <span className="font-semibold text-slate-900">
                    {shippingAmount === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatINR(shippingAmount)}
                  </span>
                </div>

                {paymentMethod === "COD" && (
                  <div className="flex justify-between text-amber-800">
                    <span>COD Convenience Charge</span>
                    <span className="font-semibold">{formatINR(codFee)}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-slate-900">Grand Total Payable</span>
                  <p className="text-[10px] text-slate-400">INR Final Invoice Amount</p>
                </div>
                <span className="text-2xl font-black text-slate-950">{formatINR(gstResult.grandTotal)}</span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  "Authorizing Order..."
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Place Order ({formatINR(gstResult.grandTotal)})
                  </>
                )}
              </Button>

              <div className="pt-3 border-t text-[11px] text-slate-500 space-y-1.5">
                <p className="flex items-center gap-1.5 font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  30-Minute Payment Failure Recovery Window
                </p>
                <p className="text-slate-400 leading-relaxed">
                  If payment disconnects, a secure retry link will be dispatched via WhatsApp to keep your stock locked for 30 minutes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
