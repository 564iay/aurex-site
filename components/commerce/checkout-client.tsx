"use client";

import { useMemo, useState, useTransition } from "react";

import { formatCurrency } from "@/lib/currency";
import { useCommerceStore } from "@/store/use-commerce-store";

export function CheckoutClient() {
  const [couponCode, setCouponCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const cart = useCommerceStore((state) => state.cart);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [cart]);

  const handleCheckout = () => {
    startTransition(async () => {
      setStatus(null);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cartItems: cart,
          couponCode,
          shippingRate: 2500
        })
      });

      const payload = await response.json();

      if (payload.url) {
        window.location.href = payload.url;
        return;
      }

      setStatus(payload.message ?? "Stripe is not configured yet. Complete the environment setup and try again.");
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-3xl uppercase tracking-[0.14em] text-white">Shipping + Payment</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {["Full Name", "Email", "Address", "City", "Country", "Postal Code"].map((field) => (
            <input
              key={field}
              placeholder={field}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          ))}
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-[rgba(215,180,106,0.24)] bg-[rgba(215,180,106,0.06)] p-5 text-sm text-white/70">
          Secure payment is handed off to Stripe Checkout. Order confirmation and webhook fulfillment are processed
          server-side after successful payment.
        </div>
      </section>
      <aside className="grid gap-4">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/48">Order Summary</p>
          <div className="mt-5 space-y-3 text-white/72">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <span>{item.title}</span>
                <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span>Shipping</span>
            <span>{formatCurrency(2500)}</span>
          </div>
          <input
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="Coupon code"
            className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isPending || cart.length === 0}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white disabled:opacity-50"
          >
            {isPending ? "Launching Checkout..." : "Pay Securely"}
          </button>
          {status ? <p className="mt-4 text-sm text-white/58">{status}</p> : null}
        </div>
      </aside>
    </div>
  );
}
