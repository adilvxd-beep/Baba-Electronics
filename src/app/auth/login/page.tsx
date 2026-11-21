"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<"WHATSAPP" | "SMS">("WHATSAPP");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [debugOtp, setDebugOtp] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, channel }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Failed to send OTP.");
      } else {
        setStep("OTP");
        setSuccessMessage(data.message);
        if (data.debugOtp) setDebugOtp(data.debugOtp);
        setTimerSeconds(60); // 60s cooldown before resend
      }
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otpCode }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Invalid OTP code.");
      } else {
        setSuccessMessage("Authentication successful! Redirecting...");
        setTimeout(() => {
          if (data.user?.role === "ADMIN") {
            router.push("/admin/orders");
          } else {
            router.push("/");
          }
          router.refresh();
        }, 800);
      }
    } catch {
      setErrorMessage("Network error occurred while verifying.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 flex justify-center items-center">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="text-center space-y-2 pb-6 border-b border-slate-100">
          <div className="mx-auto mb-2 flex justify-center">
            <Image
              src="/logo.png"
              alt="Baba Electronics"
              width={72}
              height={72}
              className="h-16 w-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            {step === "PHONE" ? "Sign In to Baba Electronics" : "Verify Mobile OTP"}
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            {step === "PHONE" 
              ? "Passwordless authentication via WhatsApp or SMS. No passwords required." 
              : `Enter the 6-digit code sent to +91 ${phone}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {debugOtp && step === "OTP" && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-center justify-between">
              <span>Developer Test Code: <strong className="font-mono text-sm">{debugOtp}</strong></span>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs px-2 text-amber-900 underline"
                onClick={() => setOtpCode(debugOtp)}
              >
                Autofill
              </Button>
            </div>
          )}

          {step === "PHONE" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Mobile Number (India)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-semibold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="99903 33434"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 py-2 text-sm font-medium tracking-wide focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Channel Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Delivery Channel</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setChannel("WHATSAPP")}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      channel === "WHATSAPP"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-emerald-600" /> WhatsApp (Fast)
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel("SMS")}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      channel === "SMS"
                        ? "border-amber-600 bg-amber-50 text-amber-900 font-semibold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Phone className="w-4 h-4 text-amber-600" /> Standard SMS
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || phone.length < 10}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? "Sending OTP..." : "Continue with OTP"} <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="relative py-2 text-center text-xs text-slate-400">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-card px-2 text-slate-500">OR</span>
              </div>

              {/* Google OAuth Simulation Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50"
                onClick={() => {
                  alert("Google OAuth will prompt for phone number verification as per requirements.");
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Continue with Google
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700">Enter 6-Digit Code</label>
                  <button
                    type="button"
                    onClick={() => setStep("PHONE")}
                    className="text-xs text-amber-600 hover:underline font-medium"
                  >
                    Change Number
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="••••••"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-lg border border-slate-300 bg-white py-3 text-center text-2xl font-mono tracking-widest font-bold focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || otpCode.length < 6}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 shadow-sm"
              >
                {isLoading ? "Verifying..." : "Verify & Sign In"}
              </Button>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-500">Didn't receive the code?</span>
                {timerSeconds > 0 ? (
                  <span className="text-slate-400 font-mono">Resend in {timerSeconds}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    className="text-amber-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Compliance & Trust Notice */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Encrypted sessions. Mobile verified for order tracking & GST compliance.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
