import { ecosystemCards } from "@/lib/content";

export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      data-scene-phase="ecosystem"
      className="section-wrap px-4 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow mb-4">Smart App Ecosystem</p>
          <h2 className="section-title">Companion intelligence in a quieter interface.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            Floating device cards frame the AUREX app as a premium extension of the product with noise control,
            gesture surfaces, adaptive EQ, and battery intelligence.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="glass-panel rounded-[2rem] p-6 md:row-span-2">
            <div className="mx-auto max-w-[280px] rounded-[2.4rem] border border-white/10 bg-[#101114] p-4 shadow-2xl">
              <div className="rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(215,180,106,0.16),transparent_26%),linear-gradient(180deg,#18191d,#0d0e11)] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40">AUREX App</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <h3 className="font-display text-3xl uppercase tracking-[0.14em] text-white">Silence / Studio</h3>
                <div className="mt-6 grid gap-3">
                  {[72, 44, 86].map((value, index) => (
                    <div key={value} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45">
                        <span>{["Noise Control", "Battery", "Adaptive EQ"][index]}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-[rgba(215,180,106,0.4)] to-white" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
          {ecosystemCards.map((card) => (
            <article key={card} className="glass-panel rounded-[1.6rem] p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-[rgba(215,180,106,0.75)]">Feature</p>
              <h3 className="mt-4 text-2xl uppercase tracking-[0.14em] text-white">{card}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Designed as floating interface moments rather than dense mobile screens.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
