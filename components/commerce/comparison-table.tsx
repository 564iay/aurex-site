import { comparisonProducts } from "@/lib/catalog";

export function ComparisonTable() {
  return (
    <div className="glass-panel overflow-hidden rounded-[2rem]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-white/45">
            <th className="px-6 py-4">Model</th>
            <th className="px-6 py-4">ANC</th>
            <th className="px-6 py-4">Battery</th>
            <th className="px-6 py-4">Materials</th>
            <th className="px-6 py-4">Weight</th>
          </tr>
        </thead>
        <tbody>
          {comparisonProducts.map((product) => (
            <tr key={product.name} className="border-b border-white/6 last:border-b-0">
              <td className="px-6 py-5 text-white">{product.name}</td>
              <td className="px-6 py-5 text-white/68">{product.anc}</td>
              <td className="px-6 py-5 text-white/68">{product.battery}</td>
              <td className="px-6 py-5 text-white/68">{product.material}</td>
              <td className="px-6 py-5 text-white/68">{product.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
