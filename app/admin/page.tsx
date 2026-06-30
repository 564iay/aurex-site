import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/shop");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <CommercePageShell
      eyebrow="Admin Control Room"
      title="Operations, orders, sales analytics, coupons, and moderation."
      description="The admin surface is structured for inventory, sales, shipment control, and premium custom-order workflows."
    >
      <AdminDashboard />
    </CommercePageShell>
  );
}
