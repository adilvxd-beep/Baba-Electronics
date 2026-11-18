import { NextResponse } from "next/server";
import { MASTER_QUOTES } from "@/lib/quotes/service";
import { generateFormalQuotationHtml } from "@/lib/quotes/quotation-pdf";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ quoteNumber: string }> }
) {
  const { quoteNumber } = await params;
  const quote = MASTER_QUOTES.find((q) => q.quoteNumber === quoteNumber);

  if (!quote) {
    return new Response("Quotation Not Found", { status: 404 });
  }

  const html = generateFormalQuotationHtml(quote);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
