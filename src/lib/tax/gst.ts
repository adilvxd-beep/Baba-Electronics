// Indian GST State Codes Reference
export const INDIAN_STATES: Record<string, string> = {
  "01": "Jammu and Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "11": "Sikkim",
  "12": "Arunachal Pradesh",
  "13": "Nagaland",
  "14": "Manipur",
  "15": "Mizoram",
  "16": "Tripura",
  "17": "Meghalaya",
  "18": "Assam",
  "19": "West Bengal",
  "20": "Jharkhand",
  "21": "Odisha",
  "22": "Chhattisgarh",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "27": "Maharashtra",
  "29": "Karnataka",
  "30": "Goa",
  "32": "Kerala",
  "33": "Tamil Nadu",
  "36": "Telangana",
  "37": "Andhra Pradesh",
};

// Default Baba Electronics Origin State (e.g., Maharashtra - Code 27)
export const BABA_ORIGIN_STATE_CODE = process.env.BABA_ORIGIN_STATE_CODE || "27";
export const BABA_ORIGIN_STATE_NAME = "Maharashtra";
export const BABA_COMPANY_GSTIN = process.env.BABA_GSTIN || "27AAAAA0000A1Z5";

export interface GSTLineItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number; // base price exclusive of GST
  gstRate: number; // e.g. 18.0
}

export interface GSTCalculationResult {
  isIntraState: boolean;
  originState: string;
  destinationState: string;
  subtotal: number;
  totalCGST: number;
  totalSGST: number;
  totalIGST: number;
  totalTax: number;
  grandTotal: number;
  lineItems: {
    sku: string;
    name: string;
    quantity: number;
    unitPrice: number;
    taxableAmount: number;
    gstRate: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    totalAmount: number;
  }[];
}

/**
 * Calculates Indian GST based on origin state vs customer delivery state.
 * Intra-state: CGST (rate/2) + SGST (rate/2)
 * Inter-state: IGST (full rate)
 */
export function calculateIndianGST(
  items: GSTLineItem[],
  destinationStateCode: string,
  shippingAmount: number = 0,
  discountAmount: number = 0
): GSTCalculationResult {
  const isIntraState = destinationStateCode.trim() === BABA_ORIGIN_STATE_CODE.trim();

  let subtotal = 0;
  let totalCGST = 0;
  let totalSGST = 0;
  let totalIGST = 0;

  const processedItems = items.map((item) => {
    const itemSubtotal = Math.round(item.unitPrice * item.quantity * 100) / 100;
    subtotal += itemSubtotal;

    const rate = item.gstRate;
    const taxAmount = Math.round(itemSubtotal * (rate / 100) * 100) / 100;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (isIntraState) {
      cgst = Math.round((taxAmount / 2) * 100) / 100;
      sgst = Math.round((taxAmount / 2) * 100) / 100;
      totalCGST += cgst;
      totalSGST += sgst;
    } else {
      igst = taxAmount;
      totalIGST += igst;
    }

    return {
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      taxableAmount: itemSubtotal,
      gstRate: rate,
      cgstAmount: cgst,
      sgstAmount: sgst,
      igstAmount: igst,
      totalAmount: Math.round((itemSubtotal + taxAmount) * 100) / 100,
    };
  });

  // Shipping GST (standard 18% courier tax)
  if (shippingAmount > 0) {
    const shippingTax = Math.round(shippingAmount * 0.18 * 100) / 100;
    if (isIntraState) {
      totalCGST += Math.round((shippingTax / 2) * 100) / 100;
      totalSGST += Math.round((shippingTax / 2) * 100) / 100;
    } else {
      totalIGST += shippingTax;
    }
  }

  const totalTax = Math.round((totalCGST + totalSGST + totalIGST) * 100) / 100;
  const grandTotal = Math.max(0, Math.round((subtotal + totalTax + shippingAmount - discountAmount) * 100) / 100);

  return {
    isIntraState,
    originState: BABA_ORIGIN_STATE_NAME,
    destinationState: INDIAN_STATES[destinationStateCode] || "Other State",
    subtotal: Math.round(subtotal * 100) / 100,
    totalCGST: Math.round(totalCGST * 100) / 100,
    totalSGST: Math.round(totalSGST * 100) / 100,
    totalIGST: Math.round(totalIGST * 100) / 100,
    totalTax,
    grandTotal,
    lineItems: processedItems,
  };
}
