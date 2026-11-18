import { NextResponse } from "next/server";
import { verifyOtpCode } from "@/lib/auth/otp";
import { createSessionCookie } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, code } = body;

    if (!phone || !code) {
      return NextResponse.json(
        { success: false, message: "Mobile number and 6-digit OTP code are required." },
        { status: 400 }
      );
    }

    const result = await verifyOtpCode(phone, code);

    if (!result.success || !result.user) {
      return NextResponse.json(result, { status: 400 });
    }

    // Issue session cookie
    await createSessionCookie({
      userId: result.user.id,
      phone: result.user.phone,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
    });

    return NextResponse.json({
      success: true,
      message: "Authenticated successfully.",
      user: {
        id: result.user.id,
        phone: result.user.phone,
        name: result.user.name,
        role: result.user.role,
        gstin: result.user.gstin,
      },
    });
  } catch (error) {
    console.error("API Error in /api/auth/otp/verify:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred while verifying OTP." },
      { status: 500 }
    );
  }
}
