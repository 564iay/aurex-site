import { notFound } from "next/navigation";

import { CommercePageShell } from "@/components/commerce/commerce-page-shell";
import { productCatalog } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if (resolvedParams.slug !== productCatalog.slug) {
    notFound();
  }

  return (
    <CommercePageShell
      eyebrow="Product Detail"
      title={productCatalog.name}
      description={productCatalog.description}
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/48">Luxury Audio Flagship</p>
          <h2 className="mt-4 text-5xl uppercase tracking-[0.12em] text-white">{productCatalog.name}</h2>
          <p className="mt-6 max-w-2xl text-white/66">
            Real ecommerce architecture, customization hooks, and post-purchase dashboard flows now sit behind the
            cinematic launch narrative.
          </p>
        </article>
        <aside className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/48">Starting At</p>
          <p className="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-white">{formatCurrency(productCatalog.price)}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/configure" className="rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white">
              Customize
            </a>
            <a href="/checkout" className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.24em] text-white/78">
              Buy Now
            </a>
          </div>
        </aside>
      </div>
    </CommercePageShell>
  );
}
