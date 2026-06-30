import { CartPanel } from "@/components/commerce/cart-panel";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

export default function CartPage() {
  return (
    <CommercePageShell
      eyebrow="Cart + Saved Sessions"
      title="Luxury checkout begins with continuity."
      description="Saved carts persist client-side and can be extended with Redis or database-backed recovery for signed-in users."
    >
      <CartPanel />
    </CommercePageShell>
  );
}
