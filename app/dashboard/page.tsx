import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/shop");
  }

  return (
    <CommercePageShell
      eyebrow="Customer Dashboard"
      title="Your listening profile, orders, firmware, and premium membership in one place."
      description="This dashboard is built to feel like a luxury control center rather than an account page."
    >
      <CustomerDashboard userId={session.user.id} />
    </CommercePageShell>
  );
}
