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
      { sku: "BE-ESP32-001", name: "ESP32-WROOM-32D Dual-Core Dev Board", quantity: 3, weightGrams: 150 },
      { sku: "BE-SEN-DHT22", name: "DHT22 Digital Temperature Sensor", quantity: 2, weightGrams: 40 },
    ]
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
