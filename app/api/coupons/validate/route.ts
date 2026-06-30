import { NextResponse } from "next/server";

import { resolveCoupon } from "@/lib/services/pricing";

export async function POST(request: Request) {
  const { code } = (await request.json()) as { code?: string };
  const coupon = resolveCoupon(code);

  return NextResponse.json({
    valid: Boolean(coupon),
    coupon
  });
}
