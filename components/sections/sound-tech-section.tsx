export function SoundTechSection() {
  return (
    <section
      data-scene-phase="sound"
      className="section-wrap px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow mb-4">Sound Technology</p>
          <h2 className="section-title">Engineered for motion, tuned for calm.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            A moving soundwave system, equalizer animation, and cursor-reactive particle field evoke the feeling of a
            living acoustic engine without distracting from the product.
          </p>
        </div>
        <div className="glass-panel overflow-hidden rounded-[2rem] p-8">
          <div className="mb-8 flex items-end gap-3">
            {Array.from({ length: 20 }).map((_, index) => (
              <span
                key={index}
                className="equalizer-bar inline-block w-3 rounded-full bg-gradient-to-t from-[rgba(215,180,106,0.35)] to-[rgba(255,255,255,0.95)]"
                style={{ height: `${32 + ((index * 13) % 70)}px`, animationDelay: `${index * 0.08}s` }}
              />
            ))}
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-black/30 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.28em] text-white/48">Frequency Graph</span>
              <span className="text-xs uppercase tracking-[0.28em] text-[rgba(215,180,106,0.78)]">AI Sound Engine</span>
            </div>
            <div className="relative h-48 overflow-hidden rounded-[1.25rem] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(215,180,106,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <svg viewBox="0 0 800 240" className="absolute inset-0 h-full w-full">
                <path
                  d="M0 128 C80 38 140 208 210 130 S350 60 430 122 550 196 630 110 750 54 800 128"
                  fill="none"
                  stroke="rgba(215,180,106,0.9)"
                  strokeWidth="3"
                />
                <path
                  d="M0 142 C100 86 160 190 250 144 S390 92 470 138 620 180 700 126 760 98 800 140"
                  fill="none"
                  stroke="rgba(123,167,218,0.8)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
