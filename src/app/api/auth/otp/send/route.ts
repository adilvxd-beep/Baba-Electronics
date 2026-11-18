import { NextResponse } from "next/server";
import { generateAndSendOtp } from "@/lib/auth/otp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, channel } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Mobile number is required." },
        { status: 400 }
      );
    }

    const result = await generateAndSendOtp(phone, channel || "WHATSAPP");

    if (!result.success) {
      return NextResponse.json(result, { status: 429 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error in /api/auth/otp/send:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred while sending OTP." },
      { status: 500 }
    );
  }
}
