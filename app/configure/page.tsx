"use client";

import { ConfiguratorStudio } from "@/components/configurator/configurator-studio";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

export default function ConfigurePage() {
  return (
    <CommercePageShell
      eyebrow="Advanced 3D Configurator"
      title="Customize AUREX in real time with materials, engraving, lighting, and accessory add-ons."
      description="This studio is designed as a premium pre-purchase ritual with live visual feedback, drag rotation, zoom, exploded view, and saved build architecture."
    >
      <ConfiguratorStudio />
    </CommercePageShell>
  );
}
