export interface CustomQuoteRecord {
  id: string;
  quoteNumber: string; // e.g. QT-2026-0001
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  businessName?: string;
  boardType: "Logo Sync Board" | "Commercial Billboard" | "Custom IoT Controller" | "Other";
  specs: {
    dimensions: string; // e.g. "120 x 40 cm"
    ledPitch?: string; // e.g. "P10 Red"
    controllerChip?: string; // e.g. "ESP32 + RS485"
    powerSupply?: string; // e.g. "12V 10A Industrial"
    targetQuantity: number;
    notes?: string;
  };
  gerberFileName?: string;
  status: "SUBMITTED" | "ESTIMATED" | "ACCEPTED" | "IN_PRODUCTION" | "COMPLETED" | "EXPIRED";
  adminQuotedPrice?: number; // total price in INR
  advanceRequired?: number; // 50% milestone
  advancePaid?: boolean;
  balancePaid?: boolean;
  leadTimeDays?: number;
  validUntil?: string; // 15 days validity
  adminNotes?: string;
}

export const MASTER_QUOTES: CustomQuoteRecord[] = [
  {
    id: "qt-101",
    quoteNumber: "QT-2026-0001",
    createdAt: "18 Nov 2026, 02:15 PM",
    customerName: "Apex Retail Brands",
    customerPhone: "9820098765",
    customerEmail: "signage@apexbrands.in",
    businessName: "Apex Retail Displays LLP",
    boardType: "Logo Sync Board",
    specs: {
      dimensions: "180 x 60 cm",
      ledPitch: "P5 Full Color RGB",
      controllerChip: "ESP32 Dual-Core + RS485 Master-Slave",
      powerSupply: "24V 15A Industrial SMPS",
      targetQuantity: 4,
      notes: "Need multi-panel logo animation with phone app sync. Outdoor waterproof IP65 rating.",
    },
    gerberFileName: "apex_logo_sync_rev3.zip",
    status: "ESTIMATED",
    adminQuotedPrice: 38500,
    advanceRequired: 19250, // 50% advance
    advancePaid: false,
    balancePaid: false,
    leadTimeDays: 10,
    validUntil: "03 Dec 2026 (15 Days Valid)",
    adminNotes: "Calculated with Meanwell 24V power supply and custom conformal coating for weather resistance.",
  },
  {
    id: "qt-102",
    quoteNumber: "QT-2026-0002",
    createdAt: "16 Nov 2026, 10:45 AM",
    customerName: "Smart Agrotech Labs",
    customerPhone: "9876543210",
    customerEmail: "hardware@smartagro.in",
    businessName: "Smart Agrotech Pvt Ltd",
    boardType: "Custom IoT Controller",
    specs: {
      dimensions: "10 x 8 cm PCB",
      controllerChip: "ESP32-WROOM-32D + 4 Relays + RS485",
      powerSupply: "12V Solar Compatible",
      targetQuantity: 50,
      notes: "Soil moisture sensing nodes with 4G LTE fallback header.",
    },
    gerberFileName: "agro_sensor_hub_v1.zip",
    status: "IN_PRODUCTION",
    adminQuotedPrice: 62000,
    advanceRequired: 31000,
    advancePaid: true,
    balancePaid: false,
    leadTimeDays: 14,
    validUntil: "01 Dec 2026",
    adminNotes: "50% advance received via Razorpay. Currently in SMD assembly.",
  },
];

/**
 * Creates a new custom quote request from the storefront spec builder.
 */
export function submitCustomQuoteRequest(
  data: Omit<CustomQuoteRecord, "id" | "quoteNumber" | "createdAt" | "status">
): CustomQuoteRecord {
  const quoteNumber = `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newQuote: CustomQuoteRecord = {
    ...data,
    id: `qt-${Date.now()}`,
    quoteNumber,
    createdAt: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "SUBMITTED",
  };

  MASTER_QUOTES.unshift(newQuote);
  console.log(`[BABA ELECTRONICS QUOTE] New spec submitted: ${quoteNumber} by ${data.customerName}`);
  return newQuote;
}

/**
 * Admin estimates the quote and sets 15-day price guarantee and 50% advance.
 */
export function estimateCustomQuote(
  quoteNumber: string,
  priceINR: number,
  leadTimeDays: number,
  notes?: string
): { success: boolean; quote?: CustomQuoteRecord; message: string } {
  const quote = MASTER_QUOTES.find((q) => q.quoteNumber === quoteNumber);
  if (!quote) {
    return { success: false, message: "Quote not found." };
  }

  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + 15);

  quote.adminQuotedPrice = priceINR;
  quote.advanceRequired = Math.round(priceINR * 0.5); // 50% advance
  quote.leadTimeDays = leadTimeDays;
  quote.validUntil = validUntilDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  quote.adminNotes = notes;
  quote.status = "ESTIMATED";

  return {
    success: true,
    quote,
    message: `Formal quote of ₹${priceINR.toLocaleString("en-IN")} issued with 15-day validity. WhatsApp notification sent to customer.`,
  };
}

/**
 * Customer accepts quote and pays 50% milestone advance.
 */
export function payMilestoneAdvance(quoteNumber: string): { success: boolean; message: string } {
  const quote = MASTER_QUOTES.find((q) => q.quoteNumber === quoteNumber);
  if (!quote) return { success: false, message: "Quote not found." };

  quote.advancePaid = true;
  quote.status = "IN_PRODUCTION";

  return {
    success: true,
    message: `50% milestone advance of ₹${quote.advanceRequired?.toLocaleString("en-IN")} captured. Status updated to 'In Production'. Internal workshop task created.`,
  };
}
