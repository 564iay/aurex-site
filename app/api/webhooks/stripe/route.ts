import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { productCatalog } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Stripe webhook is not configured." }, { status: 202 });
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ message: "Missing Stripe signature." }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Webhook verification failed." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const product = await prisma.product.upsert({
      where: {
        slug: productCatalog.slug
      },
      update: {},
      create: {
        slug: productCatalog.slug,
        name: productCatalog.name,
        description: productCatalog.description,
        price: productCatalog.price,
        compareAt: productCatalog.compareAt,
        inventory: productCatalog.inventory
      }
    });

    await prisma.paymentLog.create({
      data: {
        provider: "stripe",
        eventType: event.type,
        eventId: event.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        payload: session as any,
        order: {
          create: {
            stripeSessionId: session.id,
            subtotal: Number(session.amount_subtotal ?? 0),
            total: Number(session.amount_total ?? 0),
            shipping: Number(session.total_details?.amount_shipping ?? 0),
            discount: Number(session.total_details?.amount_discount ?? 0),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shippingAddress: (session.customer_details as any) ?? {},
            status: "PAID",
            currency: session.currency?.toUpperCase() ?? "USD",
            items: {
              create: [
                {
                  productId: product.id,
                  title: "AUREX Checkout Order",
                  quantity: 1,
                  unitPrice: Number(session.amount_subtotal ?? 0)
                }
              ]
            }
          }
        }
      }
    });
  }

  return NextResponse.json({ received: true });
}
