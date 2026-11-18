import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { releaseStockReservation } from "@/lib/cart/reservation";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "rzp_webhook_secret_default";

    // HMAC verification in production
    if (process.env.NODE_ENV === "production" && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (signature !== expectedSignature) {
        return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const orderNumber = payment.notes?.orderNumber;

      if (orderNumber) {
        releaseStockReservation(orderNumber);
        // Update order status in DB to CONFIRMED and paymentStatus to PAID
      }

      console.log(`[RAZORPAY WEBHOOK] Payment captured for order: ${orderNumber}, Amount: ₹${payment.amount / 100}`);
    }

    if (event === "payment.failed") {
      const payment = payload.payload.payment.entity;
      const orderNumber = payment.notes?.orderNumber;

      console.log(`[RAZORPAY WEBHOOK] Payment failed for order: ${orderNumber}. Holding 30-min recovery grace period.`);
      // In production, trigger automated WhatsApp recovery template with retry link
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
