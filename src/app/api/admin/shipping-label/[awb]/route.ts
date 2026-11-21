import { NextResponse } from "next/server";
import { generateThermalLabelHtml } from "@/lib/logistics/shiprocket";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ awb: string }> }
) {
  const { awb } = await params;

  const html = generateThermalLabelHtml(
    awb,
    "BE-2026-27-000101",
    {
      name: "Rohan Kulkarni (Maker Lab)",
      phone: "9823012345",
      street: "Flat 402, Shivajinagar",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411005",
    },
    "Delhivery Express Air",
    [
      { sku: "BE-SIGN-EXT-01", name: "LED Fire Exit Sign Board (Right Arrow)", quantity: 3, weightGrams: 850 },
      { sku: "BE-SIGN-ML-01", name: "Bilingual LED Fire Exit Board", quantity: 2, weightGrams: 900 },
    ]
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
