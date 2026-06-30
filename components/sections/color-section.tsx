"use client";

import clsx from "clsx";

import { colors } from "@/lib/content";

type ColorSectionProps = {
  selectedColor: string;
  onColorChange: (value: string) => void;
};

export function ColorSection({ selectedColor, onColorChange }: ColorSectionProps) {
  return (
    <section
      data-scene-phase="colors"
      className="section-wrap px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="eyebrow mb-4">Color Customization</p>
          <h2 className="section-title">Choose the tone of the object.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            Finish selection updates the live 3D material so the product stays central to the decision, not detached
            inside a swatch strip.
          </p>
        </div>
        <div className="grid gap-4">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => onColorChange(color.value)}
              className={clsx(
                "glass-panel flex items-center justify-between rounded-[1.5rem] px-6 py-5 text-left transition",
                selectedColor === color.value
                  ? "border-[rgba(215,180,106,0.45)] shadow-gold"
                  : "border-white/10 hover:border-white/25"
              )}
            >
              <div>
                <p className="text-xl uppercase tracking-[0.16em] text-white">{color.name}</p>
                <p className="mt-2 text-sm text-white/56">Live finish update on the floating hero model.</p>
              </div>
              <span className="h-12 w-12 rounded-full border border-white/10" style={{ backgroundColor: color.value }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
