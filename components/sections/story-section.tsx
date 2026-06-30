"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Approach",
    body: "The silhouette emerges from shadow as the camera glides inward and the finish catches a warm metallic line."
  },
  {
    title: "Reveal",
    body: "Contours separate from darkness. The frame, yoke, and cushioned interior become a study in form and restraint."
  },
  {
    title: "Resolution",
    body: "Every scroll movement sharpens the perspective, bringing the listener closer to the engineering inside."
  }
];

export function StorySection() {
  return (
    <section
      id="story"
      data-scene-phase="reveal"
      className="section-wrap px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow mb-4">Scroll Product Reveal</p>
          <h2 className="section-title text-white">A story told through motion.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            As the page flows, the headphone tightens into frame, rotates in measured intervals, and reveals the build
            in cinematic layers. The background drifts with a soft parallax glow to keep the product at the center of
            attention.
          </p>
        </div>
        <div className="grid gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="glass-panel card-shine rounded-[1.75rem] p-8"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="font-display text-4xl text-[rgba(215,180,106,0.85)]">0{index + 1}</span>
                <div className="gold-line flex-1" />
              </div>
              <h3 className="text-2xl uppercase tracking-[0.18em] text-white">{step.title}</h3>
              <p className="mt-4 text-white/68">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
