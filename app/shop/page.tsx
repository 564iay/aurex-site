import Link from "next/link";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";
import { AiConcierge } from "@/components/commerce/ai-concierge";
import { productCatalog } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";

const specs = [
  { label: "Sound", value: "Spatial Audio · 6Hz–40kHz" },
  { label: "ANC", value: "Adaptive · 3-mic array" },
  { label: "Battery", value: "80-hour endurance" },
  { label: "Frame", value: "Brushed Titanium" },
  { label: "Touch", value: "Sapphire Glass" },
  { label: "AI", value: "AUREX Signature Engine" }
];

const colorSwatches = [
  { name: "Obsidian Black", value: "#141414" },
  { name: "Silver Mist", value: "#bfc6cf" },
  { name: "Midnight Blue", value: "#22334c" },
  { name: "Rose Gold", value: "#b88d74" }
];

export default function ShopPage() {
  return (
    <CommercePageShell
      eyebrow="Product Ecosystem"
      title="AUREX Founders Edition"
      description="A premium object release for those who refuse to compromise between studio tuning and considered design. Limited to 500 hand-numbered units worldwide."
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* Main product card */}
        <article className="glass-panel rounded-[2rem] p-8">
          <p className="eyebrow mb-3">Flagship Product</p>
          <h2 className="mt-2 text-4xl uppercase tracking-[0.14em] text-white">{productCatalog.name}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/66">{productCatalog.description}</p>

          {/* Spec grid */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {specs.map(({ label, value }) => (
              <div key={label} className="rounded-[1rem] border border-white/8 bg-white/3 px-4 py-3">
                <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45">{label}</p>
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Color swatches */}
          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/45">Available Finishes</p>
            <div className="flex flex-wrap gap-3">
              {colorSwatches.map((c) => (
                <div key={c.value} className="flex items-center gap-2">
                  <span
                    className="h-7 w-7 rounded-full border border-white/15"
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                    aria-label={c.name}
                  />
                  <span className="text-xs text-white/55">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/configure"
              className="rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white transition hover:bg-[rgba(215,180,106,0.22)]"
            >
              Configure Yours
            </a>
            <a
              href="/compare"
              className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.24em] text-white/78 transition hover:border-white/25 hover:text-white"
            >
              Compare Models
            </a>
          </div>
        </article>

        {/* Price / CTA */}
        <aside className="glass-panel rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-white/48">Launch Price</p>
          <p className="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-white">
            {formatCurrency(productCatalog.price)}
          </p>
          <div className="gold-line mt-6 w-full" />
          <ul className="mt-6 space-y-3 text-sm text-white/60">
            {[
              "Luxury travel case included",
              "Braided charging cable",
              "First-run serial engraving",
              "Priority firmware access",
              "2-year global warranty"
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#d7b46a]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/#buy"
            className="mt-8 block w-full rounded-full border border-[rgba(215,180,106,0.42)] bg-[rgba(215,180,106,0.1)] py-4 text-center text-sm uppercase tracking-[0.28em] text-white transition hover:bg-[rgba(215,180,106,0.2)]"
          >
            Reserve Now
          </Link>
          <p className="mt-4 text-center text-xs text-white/35">No payment captured today</p>
        </aside>
      </div>

      <div className="mt-6">
        <AiConcierge />
      </div>
    </CommercePageShell>
  );
}
