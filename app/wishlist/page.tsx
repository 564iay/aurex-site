import { CommercePageShell } from "@/components/commerce/commerce-page-shell";
import { WishlistPanel } from "@/components/commerce/wishlist-panel";

export default function WishlistPage() {
  return (
    <CommercePageShell
      eyebrow="Wishlist"
      title="Save the objects you want to come back to."
      description="Luxury buying journeys often span multiple sessions. Wishlist support keeps products and custom builds close at hand."
    >
      <WishlistPanel />
    </CommercePageShell>
  );
}
