import { formatCurrency } from "@/lib/currency";
import { getDashboardSnapshot } from "@/lib/services/orders";

export async function CustomerDashboard({ userId }: { userId?: string }) {
  const snapshot = await getDashboardSnapshot(userId);

  return (
    <div className="grid gap-6">
      <section className="dashboard-grid dashboard-grid--3">
        {[
          ["Purchases", String(snapshot.purchases.length)],
          ["Saved Builds", String(snapshot.savedBuilds.length)],
          ["Favorite Mode", snapshot.analytics.favoriteMode],
          ["Battery Average", snapshot.analytics.batteryAverage]
        ].map(([label, value]) => (
          <article key={label} className="metric-card">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
            <p className="mt-4 text-3xl uppercase tracking-[0.08em] text-white">{value}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--2">
        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase tracking-[0.14em] text-white">Purchases</h2>
          <div className="mt-5 space-y-4">
            {snapshot.purchases.map((purchase) => (
              <div key={purchase.id} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white">{purchase.id}</p>
                    <p className="mt-2 text-white/55">{purchase.status}</p>
                  </div>
                  <p className="text-xl text-white">{formatCurrency(purchase.total)}</p>
                </div>
                <p className="mt-3 text-sm text-white/48">Tracking: {purchase.trackingCode}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase tracking-[0.14em] text-white">Audio Dashboard</h2>
          <div className="mt-5 space-y-4 text-white/68">
            <p>EQ: Wide Stage Reference</p>
            <p>ANC Control: Adaptive Max</p>
            <p>Immersive Mode: {snapshot.analytics.immersiveUsage}</p>
            <p>Listening History: {snapshot.analytics.listeningHistory.join(", ")}</p>
          </div>
        </article>

        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase tracking-[0.14em] text-white">Warranty + Membership</h2>
          <div className="mt-5 space-y-4 text-white/68">
            <p>Warranty Serial: {snapshot.warranty.serialNumber}</p>
            <p>Coverage Until: {snapshot.warranty.expiresAt}</p>
            <p>Membership: AUREX Care+</p>
          </div>
        </article>

        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase tracking-[0.14em] text-white">Firmware + Support</h2>
          <div className="mt-5 space-y-4 text-white/68">
            <p>Firmware: {snapshot.firmware[0]?.version}</p>
            <p>{snapshot.firmware[0]?.notes}</p>
            <p>Ticket: {snapshot.supportTickets[0]?.subject}</p>
          </div>
        </article>
      </section>
    </div>
  );
}
