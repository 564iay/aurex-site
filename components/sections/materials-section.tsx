"use client";

import { motion } from "framer-motion";

import { materials } from "@/lib/content";

export function MaterialsSection() {
  return (
    <section
      id="materials"
      data-scene-phase="materials"
      className="section-wrap px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-4">Premium Materials</p>
        <h2 className="section-title max-w-3xl">A tactile palette for sound worth holding onto.</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {materials.map((item, index) => (
            <motion.article
              key={item}
              className="glass-panel card-shine min-h-[300px] rounded-[2rem] p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.07 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                className="h-40 rounded-[1.5rem]"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(145deg, #57595e, #1f2227)"
                      : index === 1
                        ? "linear-gradient(145deg, #5d4435, #23150f)"
                        : index === 2
                          ? "linear-gradient(145deg, #aeb4bd, #51565d)"
                          : index === 3
                            ? "radial-gradient(circle at 30% 30%, #f2e8d7, #988f81)"
                            : "linear-gradient(145deg, rgba(152,197,255,0.45), rgba(255,255,255,0.12), rgba(19,26,37,0.95))"
                }}
              />
              <h3 className="mt-6 font-display text-3xl uppercase tracking-[0.12em] text-white">{item}</h3>
              <p className="mt-4 text-sm leading-7 text-white/62">
                Carefully chosen finishes create a restrained luxury that reads through light, texture, and touch.
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
