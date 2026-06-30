"use client";

import { useMemo, useState } from "react";

import { formatCurrency } from "@/lib/currency";
import { useCommerceStore } from "@/store/use-commerce-store";

export function CartPanel() {
  const cart = useCommerceStore((state) => state.cart);
  const removeFromCart = useCommerceStore((state) => state.removeFromCart);
  const [couponCode, setCouponCode] = useState("");

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [cart]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-3xl uppercase tracking-[0.14em] text-white">Saved Cart</h2>
        <div className="mt-6 grid gap-4">
          {cart.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-white/10 px-6 py-10 text-white/50">
              Your cart is empty. Build a custom headset or choose a launch edition.
            </div>
          ) : (
            cart.map((item) => (
              <article key={item.id} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl uppercase tracking-[0.14em] text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/54">Quantity {item.quantity}</p>
                  </div>
                  <p className="font-display text-3xl text-white">{formatCurrency(item.unitPrice * item.quantity)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="mt-5 text-xs uppercase tracking-[0.22em] text-[rgba(215,180,106,0.82)]"
                >
                  Remove
                </button>
              </article>
            ))
          )}
        </div>
      </section>
      <aside className="grid gap-4">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/48">Coupon</p>
          <input
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="AUREX10"
            className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />
          <p className="mt-3 text-sm text-white/48">Supports saved carts, promo codes, and Stripe-hosted checkout handoff.</p>
        </div>
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/48">Summary</p>
          <div className="mt-5 flex items-center justify-between text-white/72">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-white/72">
            <span>Shipping</span>
            <span>{formatCurrency(2500)}</span>
          </div>
          <div className="mt-5 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between text-xl text-white">
              <span>Total</span>
              <span>{formatCurrency(subtotal + 2500)}</span>
            </div>
          </div>
          <a
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[rgba(215,180,106,0.34)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white"
          >
            Secure Checkout
          </a>
        </div>
      </aside>
    </div>
  );
}
