import { NextResponse } from "next/server";
import { generateGSTInvoiceHtml, InvoiceData } from "@/lib/invoice/generator";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;

  // Invoice data generator
  const invoiceData: InvoiceData = {
    invoiceNumber: `INV-${orderNumber.replace("BE-", "")}`,
    orderNumber,
    orderDate: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    customerName: "Valued Customer",
    customerPhone: "9876543210",
    customerEmail: "customer@example.com",
    shippingAddress: "Plot 42, Electronics Zone, Industrial Area, Pune 411001",
    customerGstin: "27AABCB1234F1Z8",
    customerBusinessName: "Maker Lab Technologies",
    isIntraState: true,
    subtotal: 1240,
    cgst: 111.6,
    sgst: 111.6,
    igst: 0,
    shippingAmount: 0,
    grandTotal: 1463.2,
    paymentMethod: "Razorpay / Prepaid",
    items: [
      {
        sku: "BE-SIGN-EXT-01",
        name: "LED Fire Exit Sign Board (Right Arrow + ISO Evacuation Symbol)",
        hsnCode: "94056000",
        quantity: 2,
        unitPrice: 989,
        gstRate: 18,
        totalAmount: 2334.04,
      },
      {
        sku: "BE-SIGN-ML-01",
        name: "Bilingual LED Fire Exit Board (अग्नि निकास / FIRE EXIT)",
        hsnCode: "94056000",
        quantity: 1,
        unitPrice: 1099,
        gstRate: 18,
        totalAmount: 1296.82,
      },
    ],
  };

  const html = generateGSTInvoiceHtml(invoiceData);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
