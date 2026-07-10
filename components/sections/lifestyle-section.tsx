"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const frames = [
  {
    id: "studio-silhouette",
    src: "/images/campaign/studio-silhouette.jpg",
    title: "Studio Silhouette",
    caption: "Form as an act of restraint. Titanium in a single light.",
    wide: true
  },
  {
    id: "travel-ritual",
    src: "/images/campaign/travel-ritual.jpg",
    title: "Travel Ritual",
    caption: "Objects that belong beside a passport and a boarding pass.",
    wide: false
  },
  {
    id: "night-listening",
    src: "/images/campaign/night-listening.jpg",
    title: "Night Listening",
    caption: "The city outside. Silence inside.",
    wide: false
  },
  {
    id: "architectural-closeup",
    src: "/images/campaign/architectural-closeup.jpg",
    title: "Architectural Close-up",
    caption: "Nine Mohs hard. Zero tolerance for imprecision.",
    wide: true
  }
];

export function LifestyleSection() {
  return (
    <section
      data-scene-phase="lifestyle"
      className="section-wrap overflow-hidden px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Campaign Edit</p>
            <h2 className="section-title">Designed like a quiet icon.</h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-7 text-white/55 md:block">
            Four editorial frames, each a different reading of the same object — light, travel, solitude, precision.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
          {frames.map((frame, index) => (
            <motion.article
              key={frame.id}
              className={`relative min-w-[300px] flex-shrink-0 overflow-hidden rounded-[2rem] ${
                frame.wide ? "md:min-w-[420px]" : "md:min-w-[340px]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Campaign image */}
              <div className="relative h-[420px] w-full">
                <Image
                  src={frame.src}
                  alt={frame.title}
                  fill
                  sizes="(max-width: 768px) 300px, 420px"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.72)] via-[rgba(0,0,0,0.18)] to-transparent" />
              </div>

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl uppercase tracking-[0.14em] text-white">
                  {frame.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{frame.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
