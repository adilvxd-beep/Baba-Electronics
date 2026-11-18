"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wrench, 
  Download, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileCode, 
  ArrowLeft,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MASTER_QUOTES, CustomQuoteRecord, estimateCustomQuote, payMilestoneAdvance } from "@/lib/quotes/service";
import { formatINR } from "@/lib/utils";

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<CustomQuoteRecord[]>(MASTER_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState<CustomQuoteRecord | null>(null);
  const [estimatePrice, setEstimatePrice] = useState<number>(35000);
  const [leadTime, setLeadTime] = useState<number>(10);
  const [adminNotes, setAdminNotes] = useState<string>("Calculated with Meanwell SMPS and conformal coating.");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleIssueQuote = (quoteNumber: string) => {
    const res = estimateCustomQuote(quoteNumber, estimatePrice, leadTime, adminNotes);
    if (res.success) {
      setQuotes([...MASTER_QUOTES]);
      setSelectedQuote(null);
      setSuccessNotice(res.message);
      setTimeout(() => setSuccessNotice(null), 4000);
    }
  };

  const handleSimulateAdvancePayment = (quoteNumber: string) => {
    const res = payMilestoneAdvance(quoteNumber);
    if (res.success) {
      setQuotes([...MASTER_QUOTES]);
      setSuccessNotice(res.message);
      setTimeout(() => setSuccessNotice(null), 4000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-slate-500 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">Custom Engineering & Quotation Desk</h1>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Review client Gerber specs, calculate BOM & labor, issue formal 15-day price quotes, and monitor 50% milestone payments.
          </p>
        </div>

        <Link href="/custom-build">
          <Button size="sm" variant="outline" className="text-xs">
            Open Customer Spec Builder &rarr;
          </Button>
        </Link>
      </div>

      {successNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Quotes Table */}
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-3">Quote Ref</th>
                <th className="p-3">Date</th>
                <th className="p-3">Client / Business</th>
                <th className="p-3">Project Type</th>
                <th className="p-3">Dimensions & Qty</th>
                <th className="p-3">Gerber File</th>
                <th className="p-3">Total Quoted</th>
                <th className="p-3">50% Advance</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-700">{q.quoteNumber}</td>
                  <td className="p-3 text-slate-500">{q.createdAt}</td>
                  <td className="p-3">
                    <strong className="text-slate-900 block">{q.customerName}</strong>
                    <span className="text-slate-500">{q.businessName || `+91 ${q.customerPhone}`}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{q.boardType}</td>
                  <td className="p-3">
                    <span>{q.specs.dimensions}</span>
                    <span className="text-[10px] text-slate-400 block font-semibold">{q.specs.targetQuantity} units</span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-600">
                    <span className="flex items-center gap-1">
                      <FileCode className="w-3.5 h-3.5 text-purple-600" />
                      {q.gerberFileName || "cad_specs.zip"}
                    </span>
                  </td>
                  <td className="p-3 font-extrabold text-slate-900">
                    {q.adminQuotedPrice ? formatINR(q.adminQuotedPrice) : "Pending"}
                  </td>
                  <td className="p-3">
                    {q.advanceRequired ? (
                      <div>
                        <span className="font-bold text-slate-700 block">{formatINR(q.advanceRequired)}</span>
                        {q.advancePaid ? (
                          <Badge variant="success" className="text-[9px] py-0 px-1">Received</Badge>
                        ) : (
                          <Badge variant="warning" className="text-[9px] py-0 px-1">Unpaid</Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="p-3">
                    {q.status === "SUBMITTED" && <Badge variant="warning" className="text-[10px]">Submitted</Badge>}
                    {q.status === "ESTIMATED" && <Badge className="text-[10px] bg-blue-600">Estimated</Badge>}
                    {q.status === "IN_PRODUCTION" && <Badge variant="success" className="text-[10px]">In Production</Badge>}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {q.status === "SUBMITTED" && (
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => setSelectedQuote(q)}
                        >
                          Estimate
                        </Button>
                      )}
                      {q.status === "ESTIMATED" && !q.advancePaid && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                          onClick={() => handleSimulateAdvancePayment(q.quoteNumber)}
                        >
                          Mark 50% Paid
                        </Button>
                      )}
                      <a href={`/api/quotes/${q.quoteNumber}/document`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600">
                          PDF
                        </Button>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Estimating a Submitted Quote */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border shadow-2xl bg-white space-y-4 p-6">
            <CardHeader className="p-0 pb-3 border-b">
              <CardTitle className="text-base font-bold text-slate-900">
                Issue Formal Quote for {selectedQuote.quoteNumber}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Client: {selectedQuote.customerName} ({selectedQuote.boardType} - {selectedQuote.specs.dimensions})
              </CardDescription>
            </CardHeader>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Total Project Cost (INR)</label>
                <input
                  type="number"
                  value={estimatePrice}
                  onChange={(e) => setEstimatePrice(parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-bold font-mono focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">
                  50% Advance Required: <strong className="text-emerald-700">{formatINR(estimatePrice * 0.5)}</strong>
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Manufacturing Lead Time (Business Days)</label>
                <input
                  type="number"
                  value={leadTime}
                  onChange={(e) => setLeadTime(parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-bold focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Engineering Remarks / BOM Details</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                Formal quotation with 15-day price freeze will be dispatched to +91 {selectedQuote.customerPhone} via WhatsApp.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setSelectedQuote(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                onClick={() => handleIssueQuote(selectedQuote.quoteNumber)}
              >
                Issue Formal Quote
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
