import { NextResponse } from "next/server";

import { checkoutSchema } from "@/lib/zod";
import { applyCoupon } from "@/lib/services/pricing";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const payload = checkoutSchema.parse(await request.json());
  const subtotal = payload.cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discounted = applyCoupon(subtotal, payload.couponCode);
  const total = discounted.amount + payload.shippingRate;

  if (!stripe) {
    return NextResponse.json(
      {
        message: "Stripe is not configured. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET to enable live checkout.",
        total
      },
      { status: 202 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    line_items: payload.cartItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          metadata: item.configuration ? { configuration: JSON.stringify(item.configuration) } : undefined
        },
        unit_amount: item.unitPrice
      }
    })),
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "White Glove Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: payload.shippingRate,
            currency: "usd"
          }
        }
      }
    ],
    metadata: {
      couponCode: payload.couponCode ?? "",
      discount: String(discounted.discount)
    }
  });

  return NextResponse.json({
    url: session.url
  });
}
