import { NextResponse } from "next/server";
import { MASTER_ORDERS } from "@/lib/orders/service";

export async function GET() {
  const headers = [
    "Voucher Date",
    "Voucher Type",
    "Invoice Number",
    "Party Ledger Name",
    "Party GSTIN",
    "Place of Supply",
    "Sales Account (18% GST)",
    "Output CGST (9%)",
    "Output SGST (9%)",
    "Output IGST (18%)",
    "Freight Charges",
    "Total Voucher Amount",
    "Payment Mode",
  ];

  const rows = MASTER_ORDERS.map((ord) => {
    const isIntraState = ord.shippingAddress.state.toLowerCase() === "maharashtra";
    const cgst = isIntraState ? (ord.taxAmount / 2).toFixed(2) : "0.00";
    const sgst = isIntraState ? (ord.taxAmount / 2).toFixed(2) : "0.00";
    const igst = !isIntraState ? ord.taxAmount.toFixed(2) : "0.00";

    return [
      ord.orderDate.split(",")[0],
      "Sales",
      `INV-${ord.orderNumber.replace("BE-", "")}`,
      `"${ord.businessName || ord.customerName}"`,
      ord.gstin || "URP (Unregistered)",
      ord.shippingAddress.state,
      ord.subtotal.toFixed(2),
      cgst,
      sgst,
      igst,
      ord.shippingAmount.toFixed(2),
      ord.grandTotal.toFixed(2),
      ord.paymentMethod,
    ];
  });

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="baba_electronics_tally_sales_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
