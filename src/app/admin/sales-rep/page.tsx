"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  UserCheck, 
  Search, 
  ShoppingCart, 
  Plus, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Building2,
  Lock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

interface ClientAccount {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  gstin: string;
  city: string;
  ordersCount: number;
}

const SAMPLE_CLIENTS: ClientAccount[] = [
  {
    id: "cli-1",
    name: "Vikas Sharma",
    phone: "9820011223",
    businessName: "Industrial Automation Labs",
    gstin: "27AABCI1234F1Z9",
    city: "Mumbai",
    ordersCount: 14,
  },
  {
    id: "cli-2",
    name: "Pradeep Joshi",
    phone: "9876543210",
    businessName: "Smart Signage Media LLP",
    gstin: "24AACCS9876K1ZA",
    city: "Ahmedabad",
    ordersCount: 8,
  },
  {
    id: "cli-3",
    name: "Dr. Ananya Roy",
    phone: "9845012345",
    businessName: "Robotics Research Institute",
    gstin: "29AABCR5555L1Z2",
    city: "Bengaluru",
    ordersCount: 22,
  },
];

export default function SalesRepPortalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<ClientAccount[]>(SAMPLE_CLIENTS);
  const [activeProxyClient, setActiveProxyClient] = useState<ClientAccount | null>(null);
  const [auditLogs, setAuditLogs] = useState<string[]>([
    "REP-102 (Adil) placed proxy order BE-2026-27-000098 on behalf of Vikas Sharma (₹14,200).",
    "REP-101 (Sunil) applied approved quote QT-2026-0001 for Apex Retail Displays.",
  ]);

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startProxySession = (client: ClientAccount) => {
    setActiveProxyClient(client);
    setAuditLogs([
      `REP session initiated: Operating on behalf of ${client.name} (${client.phone}) at ${new Date().toLocaleTimeString("en-IN")}.`,
      ...auditLogs,
    ]);
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
            <h1 className="text-2xl font-extrabold text-slate-900">Sales Representative Assisted Selling Desk</h1>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            "Login-as-Customer" proxy ordering for institutional, wholesale, and dealer accounts with strict audit logging.
          </p>
        </div>

        <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 text-xs px-3 py-1 font-semibold">
          Sales Rep: SR-102 (Adil Hussain - Active)
        </Badge>
      </div>

      {/* Active Proxy Session Banner */}
      {activeProxyClient && (
        <div className="p-4 rounded-xl bg-purple-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-white">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm">Proxy Mode Active:</span>
                <span className="font-bold text-amber-300">{activeProxyClient.name}</span>
                <span className="text-xs text-purple-200">({activeProxyClient.businessName})</span>
              </div>
              <p className="text-[11px] text-purple-300 font-mono">
                Phone: +91 {activeProxyClient.phone} | GSTIN: {activeProxyClient.gstin}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/catalog">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                Configure Client Cart &rarr;
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-purple-400 bg-purple-800 text-white hover:bg-purple-700"
              onClick={() => setActiveProxyClient(null)}
            >
              Exit Proxy
            </Button>
          </div>
        </div>
      )}

      {/* Client Search & Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Client Accounts Directory
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search name, phone, or GSTIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="divide-y border rounded-xl bg-white overflow-hidden shadow-sm">
            {filteredClients.map((client) => (
              <div key={client.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-slate-900">{client.name}</strong>
                    <span className="text-xs text-slate-500 font-medium">({client.businessName})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-blue-600" /> +91 {client.phone}
                    </span>
                    <span>·</span>
                    <span className="font-mono">{client.gstin}</span>
                    <span>·</span>
                    <span>{client.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">{client.ordersCount} lifetime orders</span>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5"
                    onClick={() => startProxySession(client)}
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Login-as-Customer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Trail Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 p-4 border-b">
              <CardTitle className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-[11px] text-slate-600">
              <p className="text-slate-400">
                All sales rep transactions are immutably logged with Rep ID, timestamp, and client phone.
              </p>
              <div className="space-y-2 font-mono">
                {auditLogs.map((log, i) => (
                  <div key={i} className="p-2 rounded bg-slate-50 border text-slate-700 leading-snug">
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
