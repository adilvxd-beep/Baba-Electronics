import { CustomQuoteRecord } from "./service";
import { formatINR } from "@/lib/utils";

export function generateFormalQuotationHtml(quote: CustomQuoteRecord): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Formal Engineering Quotation - ${quote.quoteNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 12px; color: #0f172a; padding: 40px; margin: 0; line-height: 1.5; }
    .quote-box { max-width: 800px; margin: 0 auto; border: 1px solid #cbd5e1; padding: 36px; border-radius: 8px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
    .brand-title { font-size: 24px; font-weight: 800; color: #1d4ed8; }
    .subhead { font-size: 11px; color: #64748b; }
    .quote-title { font-size: 18px; font-weight: 800; text-align: right; color: #0f172a; }
    .meta-table { width: 100%; margin: 24px 0; border-collapse: collapse; }
    .meta-table td { padding: 8px 12px; vertical-align: top; width: 50%; border: 1px solid #e2e8f0; font-size: 11px; }
    .spec-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 11px; }
    .spec-table th { background: #f8fafc; padding: 10px; border: 1px solid #cbd5e1; text-align: left; }
    .spec-table td { padding: 10px; border: 1px solid #cbd5e1; }
    .milestone-box { background: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 6px; margin: 20px 0; font-size: 11px; }
    .footer { margin-top: 36px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 10px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="quote-box">
    <div class="header">
      <div>
        <div class="brand-title">BABA ELECTRONICS</div>
        <div class="subhead">
          Custom Hardware Engineering & Signage Division<br>
          Industrial Hub, Pune, Maharashtra | GSTIN: 27AAAAA0000A1Z5<br>
          Engineering Desk: contact@babaelectronics.in | +91 99903 33434
        </div>
      </div>
      <div>
        <div class="quote-title">FORMAL QUOTATION</div>
        <div style="font-size: 11px; margin-top: 4px; text-align: right;">
          <strong>Quote No:</strong> ${quote.quoteNumber}<br>
          <strong>Date:</strong> ${quote.createdAt}<br>
          <strong>Price Protection:</strong> ${quote.validUntil || "15 Days"}<br>
          <strong>Lead Time:</strong> ${quote.leadTimeDays || 10} Business Days
        </div>
      </div>
    </div>

    <table class="meta-table">
      <tr>
        <td style="background: #f8fafc;">
          <strong>CLIENT SPECIFICATIONS:</strong><br>
          ${quote.businessName ? `<strong>${quote.businessName}</strong><br>` : ""}
          Attn: ${quote.customerName}<br>
          Mobile: +91 ${quote.customerPhone}<br>
          ${quote.customerEmail ? `Email: ${quote.customerEmail}<br>` : ""}
          Project Category: <strong>${quote.boardType}</strong>
        </td>
        <td>
          <strong>ENGINEERING TERMS:</strong><br>
          Milestone Structure: <strong>50% Advance / 50% Pre-Dispatch</strong><br>
          CAD/Gerber Reference: ${quote.gerberFileName || "Client CAD Archive"}<br>
          Logistics: Dedicated Surface Cargo / Courier<br>
          Warranty: 12 Months Manufacturing Defect Warranty
        </td>
      </tr>
    </table>

    <table class="spec-table">
      <thead>
        <tr>
          <th>Scope & Technical Parameter</th>
          <th>Design Specification</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Physical Dimensions</strong></td>
          <td>${quote.specs.dimensions}</td>
        </tr>
        ${quote.specs.ledPitch ? `
          <tr>
            <td><strong>LED Pitch / Display Type</strong></td>
            <td>${quote.specs.ledPitch}</td>
          </tr>
        ` : ""}
        ${quote.specs.controllerChip ? `
          <tr>
            <td><strong>Microcontroller / Comms</strong></td>
            <td>${quote.specs.controllerChip}</td>
          </tr>
        ` : ""}
        ${quote.specs.powerSupply ? `
          <tr>
            <td><strong>Power Architecture</strong></td>
            <td>${quote.specs.powerSupply}</td>
          </tr>
        ` : ""}
        <tr>
          <td><strong>Fabrication Quantity</strong></td>
          <td>${quote.specs.targetQuantity} units</td>
        </tr>
        <tr>
          <td><strong>Client Application Notes</strong></td>
          <td>${quote.specs.notes || "Bespoke engineered per client specs"}</td>
        </tr>
      </tbody>
    </table>

    <div class="milestone-box">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <strong style="font-size: 13px; color: #1e40af;">Total Project Cost: ${formatINR(quote.adminQuotedPrice || 0)}</strong>
          <span style="color: #64748b; font-size: 10px;"> (+18% GST applicable on invoice)</span>
        </div>
        <div style="text-align: right;">
          <strong style="font-size: 13px; color: #047857;">50% Advance to Initiate: ${formatINR(quote.advanceRequired || 0)}</strong>
        </div>
      </div>
      <div style="margin-top: 8px; font-size: 10px; color: #475569;">
        • 50% advance locks manufacturing slot and component BOM acquisition.<br>
        • Remaining 50% balance payable upon quality check video verification prior to dispatch.
      </div>
    </div>

    ${quote.adminNotes ? `
      <div style="font-size: 11px; padding: 10px; border-left: 3px solid #2563eb; background: #f8fafc; margin-bottom: 20px;">
        <strong>Engineering Remarks:</strong> ${quote.adminNotes}
      </div>
    ` : ""}

    <div class="footer">
      Generated by Baba Electronics Automated Quoting Engine. 15-Day Price Validity Guaranteed.<br>
      Baba Electronics (Since 2001) · Authorized Signatory Desk
    </div>
  </div>
</body>
</html>`;
}
