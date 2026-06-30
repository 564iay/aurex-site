import { CommercePageShell } from "@/components/commerce/commerce-page-shell";
import { AiConcierge } from "@/components/commerce/ai-concierge";
import { productCatalog } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";

export default function ShopPage() {
  return (
    <CommercePageShell
      eyebrow="Product Ecosystem"
      title="AUREX products, premium launch commerce, and concierge purchasing."
      description="The marketing experience now extends into a real commerce layer with saved carts, checkout, dashboard flows, and product intelligence."
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="glass-panel rounded-[2rem] p-6">
          <p className="eyebrow">Flagship Product</p>
          <h2 className="mt-4 text-4xl uppercase tracking-[0.14em] text-white">{productCatalog.name}</h2>
          <p className="mt-4 max-w-2xl text-white/66">{productCatalog.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/configure" className="rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white">
              Configure Yours
            </a>
            <a href="/compare" className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.24em] text-white/78">
              Compare Models
            </a>
          </div>
        </article>
        <aside className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/48">Launch Price</p>
          <p className="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-white">{formatCurrency(productCatalog.price)}</p>
          <p className="mt-4 text-sm text-white/58">Saved carts, coupons, wishlist, comparison, user accounts, and secure Stripe checkout are all wired into this phase.</p>
        </aside>
      </div>
      <div className="mt-6">
        <AiConcierge />
      </div>
    </CommercePageShell>
  );
}
