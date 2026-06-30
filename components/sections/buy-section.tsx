"use client";

import { motion } from "framer-motion";

export function BuySection({ onToggleLuxMode }: { onToggleLuxMode: () => void }) {
  return (
    <section
      id="buy"
      data-scene-phase="buy"
      className="section-wrap px-4 pb-24 pt-24 md:px-8 md:pb-36 md:pt-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="glass-panel rounded-[2.2rem] p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="eyebrow mb-4">Launch Reservation</p>
          <h2 className="section-title">Reserve the first edition.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
            AUREX arrives as a premium object release, not a discount-driven storefront. The final call to action
            remains calm, luminous, and product-first.
          </p>
          <div className="mx-auto mt-10 max-w-md rounded-[1.8rem] border border-[rgba(215,180,106,0.26)] bg-[rgba(255,255,255,0.03)] p-8 shadow-gold">
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Founders Edition</p>
            <p className="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-white">$799</p>
            <p className="mt-4 text-sm text-white/56">Includes luxury travel case, braided charging cable, and first-run engraving.</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@aurex-audio.com"
              className="rounded-full border border-[rgba(215,180,106,0.42)] bg-[linear-gradient(90deg,rgba(215,180,106,0.14),rgba(255,255,255,0.08),rgba(215,180,106,0.14))] bg-[length:200%_100%] px-8 py-4 text-sm uppercase tracking-[0.28em] text-white shadow-gold transition hover:animate-shimmer"
            >
              Preorder AUREX
            </a>
            <button
              type="button"
              onClick={onToggleLuxMode}
              className="rounded-full border border-white/12 px-8 py-4 text-sm uppercase tracking-[0.28em] text-white/78 transition hover:border-white/30 hover:text-white"
            >
              Hidden Light Mode
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
