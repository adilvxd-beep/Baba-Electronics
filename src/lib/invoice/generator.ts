import { BABA_COMPANY_GSTIN, BABA_ORIGIN_STATE_NAME } from "@/lib/tax/gst";
import { formatINR } from "@/lib/utils";

export interface InvoiceData {
  invoiceNumber: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  customerGstin?: string;
  customerBusinessName?: string;
  isIntraState: boolean;
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  shippingAmount: number;
  grandTotal: number;
  paymentMethod: string;
  items: {
    sku: string;
    name: string;
    hsnCode?: string;
    quantity: number;
    unitPrice: number;
    gstRate: number;
    totalAmount: number;
  }[];
}

export function generateGSTInvoiceHtml(inv: InvoiceData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GST Tax Invoice - ${inv.invoiceNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 12px; color: #1e293b; padding: 40px; margin: 0; line-height: 1.4; }
    .invoice-card { max-width: 800px; margin: 0 auto; border: 1px solid #cbd5e1; padding: 32px; border-radius: 8px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 20px; }
    .brand-title { font-size: 24px; font-weight: 800; color: #1d4ed8; letter-spacing: -0.5px; }
    .company-details { font-size: 11px; color: #475569; margin-top: 4px; }
    .invoice-title { font-size: 18px; font-weight: 700; text-align: right; color: #0f172a; }
    .meta-table { width: 100%; margin: 20px 0; border-collapse: collapse; }
    .meta-table td { padding: 8px 12px; vertical-align: top; width: 50%; font-size: 11px; }
    .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 11px; }
    .item-table th { background: #f1f5f9; padding: 8px 10px; border: 1px solid #cbd5e1; text-align: left; }
    .item-table td { padding: 8px 10px; border: 1px solid #cbd5e1; }
    .totals-box { width: 320px; margin-left: auto; border-collapse: collapse; font-size: 11px; }
    .totals-box td { padding: 6px 10px; }
    .grand-total { font-size: 14px; font-weight: 800; border-top: 2px solid #0f172a; color: #0f172a; }
    .bank-box { margin-top: 24px; padding: 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; font-size: 11px; }
    .footer { margin-top: 32px; text-align: center; font-size: 10px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; }
    @media print { body { padding: 0; } .invoice-card { border: none; } }
  </style>
</head>
<body>
  <div class="invoice-card">
    <div class="header">
      <div>
        <div class="brand-title">BABA ELECTRONICS</div>
        <div class="company-details">
          25+ Years Legacy in IoT Hardware & Custom Electronics<br>
          Registered Office: Pune / Mumbai Industrial Hub, Maharashtra, India<br>
          <strong>GSTIN:</strong> 27AAAAA0000A1Z5 | <strong>State:</strong> Maharashtra (Code: 27)<br>
          Support: contact@babaelectronics.in | +91 98XXX XXXXX
        </div>
      </div>
      <div>
        <div class="invoice-title">TAX INVOICE</div>
        <div style="font-size: 11px; margin-top: 4px; text-align: right;">
          <strong>Invoice No:</strong> ${inv.invoiceNumber}<br>
          <strong>Order Ref:</strong> ${inv.orderNumber}<br>
          <strong>Date:</strong> ${inv.orderDate}<br>
          <strong>Place of Supply:</strong> ${inv.isIntraState ? "Maharashtra (Intra-State)" : "Outside State (Inter-State)"}
        </div>
      </div>
    </div>

    <table class="meta-table">
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc;">
          <strong>Billed & Shipped To:</strong><br>
          ${inv.customerBusinessName ? `<strong>${inv.customerBusinessName}</strong><br>` : ""}
          ${inv.customerName}<br>
          Phone: +91 ${inv.customerPhone}<br>
          ${inv.customerEmail ? `Email: ${inv.customerEmail}<br>` : ""}
          Address: ${inv.shippingAddress}<br>
          ${inv.customerGstin ? `<strong>Buyer GSTIN:</strong> ${inv.customerGstin}` : "Consumer (B2C)"}
        </td>
        <td style="border: 1px solid #e2e8f0; border-left: none;">
          <strong>Payment & Dispatch Terms:</strong><br>
          Payment Mode: ${inv.paymentMethod}<br>
          Logistics Carrier: Shiprocket Express Pan-India<br>
          Reverse Charge Mechanism (RCM): No<br>
          B2B ITC Eligible: ${inv.customerGstin ? "Yes (Valid Tax Invoice)" : "No"}
        </td>
      </tr>
    </table>

    <table class="item-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item Description</th>
          <th>SKU / HSN</th>
          <th>Qty</th>
          <th>Rate (₹)</th>
          <th>Taxable (₹)</th>
          <th>GST %</th>
          <th>Total (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${inv.items.map((item, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td>${item.sku} / ${item.hsnCode || "8542"}</td>
            <td>${item.quantity}</td>
            <td>₹${item.unitPrice.toFixed(2)}</td>
            <td>₹${(item.unitPrice * item.quantity).toFixed(2)}</td>
            <td>${item.gstRate}%</td>
            <td>₹${item.totalAmount.toFixed(2)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <table class="totals-box">
      <tr>
        <td>Subtotal (Taxable Value):</td>
        <td style="text-align: right; font-weight: 600;">₹${inv.subtotal.toFixed(2)}</td>
      </tr>
      ${inv.isIntraState ? `
        <tr>
          <td>CGST (Central Tax 9%):</td>
          <td style="text-align: right;">₹${inv.cgst.toFixed(2)}</td>
        </tr>
        <tr>
          <td>SGST (State Tax 9%):</td>
          <td style="text-align: right;">₹${inv.sgst.toFixed(2)}</td>
        </tr>
      ` : `
        <tr>
          <td>IGST (Integrated Tax 18%):</td>
          <td style="text-align: right;">₹${inv.igst.toFixed(2)}</td>
        </tr>
      `}
      <tr>
        <td>Logistics (Shiprocket):</td>
        <td style="text-align: right;">₹${inv.shippingAmount.toFixed(2)}</td>
      </tr>
      <tr class="grand-total">
        <td>Total Amount (INR):</td>
        <td style="text-align: right;">₹${inv.grandTotal.toFixed(2)}</td>
      </tr>
    </table>

    <div class="bank-box">
      <strong>Corporate Bank Details for NEFT / RTGS:</strong><br>
      Account Name: Baba Electronics | Account No: 502000XXXXXXXX | Bank: HDFC Bank | IFSC: HDFC0001234 | Branch: Industrial Estate
    </div>

    <div class="footer">
      This is a digitally generated Tax Invoice compliant with Section 31 of the CGST Act, 2017. Sequential FY Numbering.<br>
      Goods once sold can be returned within 7 days in original packaging against manufacturing defects.
    </div>
  </div>
</body>
</html>`;
}
