import Link from "next/link";

import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

export default function CheckoutSuccessPage() {
  return (
    <CommercePageShell
      eyebrow="Order Confirmed"
      title="Your AUREX reservation has been received."
      description="This confirmation page is intended to be reached after successful Stripe Checkout redirection and webhook-backed fulfillment processing."
    >
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="max-w-2xl text-lg leading-8 text-white/68">
          We&apos;ve captured your premium audio configuration. Next steps include order confirmation, invoice access,
          shipment updates, and dashboard tracking.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/dashboard" className="rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white">
            Open Dashboard
          </Link>
          <Link href="/track" className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.24em] text-white/78">
            Track Order
          </Link>
        </div>
      </div>
    </CommercePageShell>
  );
}
