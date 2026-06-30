import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

export default function TrackPage() {
  return (
    <CommercePageShell
      eyebrow="Order Tracking"
      title="Track the progress of your AUREX order."
      description="Order tracking is connected to the order model and shipment records, ready for carrier integration and customer-facing updates."
    >
      <div className="glass-panel rounded-[2rem] p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Payment", "Confirmed"],
            ["Production", "In Assembly"],
            ["Shipment", "Awaiting dispatch"]
          ].map(([title, status]) => (
            <article key={title} className="metric-card">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">{title}</p>
              <p className="mt-4 text-2xl uppercase tracking-[0.12em] text-white">{status}</p>
            </article>
          ))}
        </div>
      </div>
    </CommercePageShell>
  );
}
