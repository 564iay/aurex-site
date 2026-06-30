"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="top"
      data-scene-phase="hero"
      className="section-wrap relative flex min-h-screen items-center overflow-hidden px-4 pt-24 md:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-end gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-6">Flagship Acoustic Edition</p>
          <h1 className="hero-title text-balance text-white">AUREX</h1>
          <p className="mt-4 font-display text-3xl uppercase tracking-[0.22em] text-[rgba(215,180,106,0.96)] md:text-4xl">
            Hear Beyond Sound
          </p>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/72 md:text-xl">
            Crafted for those who demand pure sound. A cinematic listening object sculpted in titanium, tuned by AI,
            and built to disappear between you and the music.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#buy"
              className="rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-8 py-4 text-sm uppercase tracking-[0.28em] text-white transition hover:scale-[1.02] hover:bg-[rgba(215,180,106,0.2)]"
            >
              Preorder Now
            </a>
            <a
              href="#story"
              className="rounded-full border border-white/10 px-8 py-4 text-sm uppercase tracking-[0.28em] text-white/82 transition hover:border-white/30 hover:text-white"
            >
              Explore Story
            </a>
          </div>
        </motion.div>
        <motion.div
          className="justify-self-end rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:max-w-md"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <div className="gold-line mb-6 w-20" />
          <p className="text-sm uppercase tracking-[0.32em] text-white/55">Cinematic Precision</p>
          <p className="mt-4 text-sm leading-7 text-white/68">
            Soft ambient particles, reflection sweeps, and scroll-led choreography turn the product into the narrative.
            The object remains center stage while each section reveals a new dimension of the brand.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
