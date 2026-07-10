"use client";

import { motion } from "framer-motion";

const materialData = [
  {
    name: "Brushed Titanium",
    description:
      "Cold to the touch, warm to the eye. A directional brushed finish resists fingerprints while telegraphing structural confidence across every surface.",
    bg: "linear-gradient(145deg, #57595e, #1f2227)"
  },
  {
    name: "Vegan Leather",
    description:
      "Responsibly sourced bio-leather wraps the headband with a softness that breaks in like a favourite jacket — gaining character without compromise.",
    bg: "linear-gradient(145deg, #5d4435, #23150f)"
  },
  {
    name: "Precision Aluminum",
    description:
      "CNC-machined to within 0.01 mm, the yoke arms flex under real load then snap back to silence — a tolerance invisible until it matters.",
    bg: "linear-gradient(145deg, #aeb4bd, #51565d)"
  },
  {
    name: "Memory Foam",
    description:
      "Medical-grade viscoelastic foam maps to your skull geometry in seconds, distributing pressure evenly so four hours feels identical to four minutes.",
    bg: "radial-gradient(circle at 30% 30%, #f2e8d7, #988f81)"
  },
  {
    name: "Sapphire Glass Touch Surface",
    description:
      "Scratch-hardness of 9 Mohs and optical clarity let the capacitive touch layer sit below the surface, making the interface feel like thought.",
    bg: "linear-gradient(145deg, rgba(152,197,255,0.45), rgba(255,255,255,0.12), rgba(19,26,37,0.95))"
  }
];

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
          {materialData.map((item, index) => (
            <motion.article
              key={item.name}
              className="glass-panel card-shine min-h-[300px] rounded-[2rem] p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.07 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                className="h-40 rounded-[1.5rem]"
                style={{ background: item.bg }}
                role="img"
                aria-label={`${item.name} material swatch`}
              />
              <h3 className="mt-6 font-display text-3xl uppercase tracking-[0.12em] text-white">{item.name}</h3>
              <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
