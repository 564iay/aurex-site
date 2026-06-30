import { ComparisonTable } from "@/components/commerce/comparison-table";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

export default function ComparePage() {
  return (
    <CommercePageShell
      eyebrow="Product Comparison"
      title="Compare flagship AUREX products with a premium editorial lens."
      description="This section is designed for thoughtful decision-making, not grid clutter, with comparison data that can be sourced dynamically from the catalog."
    >
      <ComparisonTable />
    </CommercePageShell>
  );
}
