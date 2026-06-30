"use client";

import { productCatalog } from "@/lib/catalog";
import { useCommerceStore } from "@/store/use-commerce-store";

export function WishlistPanel() {
  const wishlist = useCommerceStore((state) => state.wishlist);
  const toggleWishlist = useCommerceStore((state) => state.toggleWishlist);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[productCatalog.slug, "aurex-studio-reference"].map((productId) => {
        const active = wishlist.includes(productId);
        return (
          <article key={productId} className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/48">Wishlist Item</p>
            <h2 className="mt-4 text-2xl uppercase tracking-[0.14em] text-white">
              {productId === productCatalog.slug ? productCatalog.name : "AUREX Studio Reference"}
            </h2>
            <button
              type="button"
              onClick={() => toggleWishlist(productId)}
              className="mt-6 rounded-full border border-[rgba(215,180,106,0.28)] px-5 py-3 text-xs uppercase tracking-[0.24em] text-white"
            >
              {active ? "Remove from Wishlist" : "Save to Wishlist"}
            </button>
          </article>
        );
      })}
    </div>
  );
}
