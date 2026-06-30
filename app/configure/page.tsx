"use client";

import dynamic from "next/dynamic";
import { CommercePageShell } from "@/components/commerce/commerce-page-shell";

const ConfiguratorStudio = dynamic(() => import("@/components/configurator/configurator-studio"), { ssr: false });

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
