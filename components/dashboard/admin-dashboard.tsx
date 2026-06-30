import { mockAdmin } from "@/lib/mock";

export function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <section className="dashboard-grid dashboard-grid--3">
        {[
          ["Stock", String(mockAdmin.stock)],
          ["Revenue", mockAdmin.revenue],
          ["Conversion", mockAdmin.conversion],
          ["Custom Orders", String(mockAdmin.customOrders)],
          ["Payment Logs", String(mockAdmin.paymentLogs)],
          ["Coupons Active", String(mockAdmin.couponsActive)]
        ].map(([label, value]) => (
          <article key={label} className="metric-card">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
            <p className="mt-4 text-3xl uppercase tracking-[0.08em] text-white">{value}</p>
          </article>
        ))}
      </section>
      <section className="dashboard-grid dashboard-grid--2">
        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase tracking-[0.14em] text-white">Operations</h2>
          <div className="mt-5 space-y-3 text-white/66">
            <p>Product management and variant control</p>
            <p>Shipment control and fulfillment state</p>
            <p>Custom order review and engraving approval</p>
            <p>Coupon lifecycle and review moderation</p>
          </div>
        </article>
        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase tracking-[0.14em] text-white">Analytics</h2>
          <div className="mt-5 space-y-3 text-white/66">
            <p>Sales analytics and order heatmaps</p>
            <p>Payment logs and webhook observability</p>
            <p>Customer funnel drop-off from configurator to checkout</p>
          </div>
        </article>
      </section>
    </div>
  );
}
