"use client";

import { motion } from "framer-motion";

import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section
      data-scene-phase="testimonials"
      className="section-wrap px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-4">Testimonials</p>
        <h2 className="section-title max-w-3xl">Words from those who know how detail feels.</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              className="glass-panel rounded-[1.8rem] p-7"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mb-5 text-3xl text-[rgba(215,180,106,0.9)]">“</div>
              <p className="text-lg leading-8 text-white/76">{item.quote}</p>
              <div className="mt-8">
                <p className="text-sm uppercase tracking-[0.24em] text-white">{item.name}</p>
                <p className="mt-2 text-sm text-white/48">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
