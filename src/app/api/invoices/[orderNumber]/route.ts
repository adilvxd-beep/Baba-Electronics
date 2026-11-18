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
        sku: "BE-ESP32-001",
        name: "ESP32-WROOM-32D Development Board (Dual-Core Wi-Fi + BLE)",
        hsnCode: "85423100",
        quantity: 2,
        unitPrice: 389,
        gstRate: 18,
        totalAmount: 918.04,
      },
      {
        sku: "BE-SEN-DHT22",
        name: "DHT22 Digital Temperature & Humidity Sensor Module",
        hsnCode: "90251990",
        quantity: 2,
        unitPrice: 231,
        gstRate: 18,
        totalAmount: 545.16,
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
