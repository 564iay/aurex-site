import { ArLaunchpad } from "@/components/ar/ar-launchpad";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

export default function ArPage() {
  return (
    <CommercePageShell
      eyebrow="AR Try-On"
      title="Preview AUREX in your space with WebXR-ready browser AR."
      description="Mobile-first immersive AR support is scaffolded here with a device compatibility gate and a graceful fallback for unsupported browsers."
    >
      <ArLaunchpad />
    </CommercePageShell>
  );
}
