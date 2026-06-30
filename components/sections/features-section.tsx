"use client";

import { motion } from "framer-motion";

import { featureCards } from "@/lib/content";

export function FeaturesSection() {
  return (
    <section
      id="features"
      data-scene-phase="features"
      className="section-wrap px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-4">Core Features</p>
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="section-title max-w-2xl">The luxury of less compromise.</h2>
          <p className="max-w-xl text-white/66">
            Every feature is framed as a premium instrument detail, not a spec-sheet bullet. Hover states add a quiet
            halo to keep the interaction tactile.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="glass-panel card-shine rounded-[1.75rem] border border-white/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-[rgba(215,180,106,0.3)] hover:shadow-gold"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(215,180,106,0.3)] bg-[rgba(215,180,106,0.08)] font-display text-xl text-[rgba(215,180,106,0.95)]">
                {index + 1}
              </div>
              <h3 className="text-2xl uppercase tracking-[0.16em] text-white">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/66">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
