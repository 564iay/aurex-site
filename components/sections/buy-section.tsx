"use client";

import { motion } from "framer-motion";

import { FoundersScarcity } from "@/components/sections/founders-scarcity";
import { ReservationForm } from "@/components/sections/reservation-form";

export function BuySection({ selectedColor }: { selectedColor: string }) {
  return (
    <section
      id="buy"
      data-scene-phase="buy"
      className="section-wrap px-4 pb-24 pt-24 md:px-8 md:pb-36 md:pt-32"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
        {/* Left: edition details + scarcity */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="eyebrow mb-4">Launch Reservation</p>
          <h2 className="section-title">Reserve the first edition.</h2>
          <p className="mt-6 text-lg leading-8 text-white/68">
            AUREX arrives as a premium object release — calm, luminous, and product-first. Founders Edition is limited
            to 500 hand-numbered units worldwide.
          </p>

          <div className="mt-8 rounded-[1.8rem] border border-[rgba(215,180,106,0.26)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_0_40px_rgba(215,180,106,0.08)]">
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Founders Edition</p>
            <p className="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-white">$799</p>
            <p className="mt-4 text-sm text-white/56">
              Includes luxury travel case, braided charging cable, and first-run serial engraving.
            </p>
          </div>

          {/* Scarcity block */}
          <FoundersScarcity />
        </motion.div>

        {/* Right: reservation form */}
        <motion.div
          className="glass-panel rounded-[2.2rem] p-8 md:p-10"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="eyebrow mb-3">Secure Your Unit</p>
          <h3 className="text-2xl uppercase tracking-[0.14em] text-white">Complete Your Reservation</h3>
          <p className="mt-3 text-sm leading-7 text-white/55">
            No payment is captured today. Your place in the first run is held by name and email — we will reach out before fulfilment.
          </p>
          <ReservationForm defaultColor={selectedColor} />
        </motion.div>
      </div>
    </section>
  );
}
