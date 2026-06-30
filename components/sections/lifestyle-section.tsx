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
          <p className="max-w-xl text-white/64">
            An editorial horizontal band gives the site a fashion-story rhythm while placeholder frames mark where your
            campaign imagery can drop in later.
          </p>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4">
          {[
            "Studio silhouette",
            "Travel ritual",
            "Night listening",
            "Architectural close-up"
          ].map((frame, index) => (
            <article
              key={frame}
              className={`glass-panel min-w-[300px] flex-1 rounded-[2rem] p-5 ${index % 2 === 0 ? "md:min-w-[420px]" : "md:min-w-[340px]"}`}
            >
              <div className="flex h-[420px] items-end rounded-[1.6rem] bg-[radial-gradient(circle_at_top,rgba(215,180,106,0.16),transparent_28%),linear-gradient(180deg,#171717,#090909)] p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/48">Image Placeholder</p>
                  <h3 className="mt-3 font-display text-4xl uppercase tracking-[0.14em] text-white">{frame}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
