const partLabels = [
  {
    label: "40mm Driver Array",
    copy: "Custom-wound neodymium drivers tuned to AUREX's reference curve, delivering a 6 Hz–40 kHz response with zero harmonic colouring."
  },
  {
    label: "Acoustic Chamber",
    copy: "A precision-damped internal volume calculated by finite-element analysis, eliminating resonance peaks that conventional headphones hide with EQ."
  },
  {
    label: "Floating Yoke",
    copy: "Tri-axis articulation absorbs head movement without slipping, maintaining consistent driver-to-ear distance for repeatable imaging on every listen."
  },
  {
    label: "Touch Crystal Surface",
    copy: "Haptic-mapped sapphire glass registers swipe velocity, pressure, and dwell time — enabling 14 distinct gestures without a single visible button."
  }
];

export function ExplodedSection() {
  return (
    <section
      data-scene-phase="exploded"
      className="section-wrap px-4 py-24 md:px-8 md:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] p-8 md:p-10">
          <p className="eyebrow mb-4">Exploded Product View</p>
          <h2 className="section-title">Craft is visible before it is heard.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            The headphone separates into a technical tableau as you scroll, exposing the internal driver architecture,
            cushion geometry, and weight-balanced frame.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {partLabels.map(({ label, copy }) => (
              <div key={label} className="gradient-stroke rounded-2xl p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-[rgba(215,180,106,0.8)]">{label}</p>
                <p className="mt-3 text-sm leading-7 text-white/62">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <div className="space-y-8">
            {[
              [
                "Transparent shell",
                "A ghosted finish mode lets the internal construction read like an engineered artifact."
              ],
              [
                "Part labels",
                "Feature callouts are presented as editorial annotations rather than technical clutter."
              ],
              [
                "Scroll choreography",
                "The scene expands and resolves fluidly to keep the experience controlled and elegant."
              ]
            ].map(([title, copy]) => (
              <div key={title}>
                <div className="gold-line mb-4 w-16" />
                <h3 className="text-xl uppercase tracking-[0.18em] text-white">{title}</h3>
                <p className="mt-3 text-white/64">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
