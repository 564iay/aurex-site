import { CheckoutClient } from "@/components/commerce/checkout-client";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

export default function CheckoutPage() {
  return (
    <CommercePageShell
      eyebrow="Secure Checkout"
      title="Stripe-powered payment, shipping capture, and launch reservation."
      description="Checkout is prepared for Stripe Checkout Sessions, server-side order creation, payment confirmation webhooks, and post-purchase dashboard visibility."
    >
      <CheckoutClient />
    </CommercePageShell>
  );
}
