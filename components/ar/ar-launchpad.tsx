"use client";

import { useMemo, useState } from "react";

export function ArLaunchpad() {
  const [status, setStatus] = useState("Check device compatibility for immersive AR.");
  const qrUrl = useMemo(() => `${typeof window !== "undefined" ? window.location.origin : ""}/ar`, []);

  const launchAr = async () => {
    if (!("xr" in navigator)) {
      setStatus("WebXR is unavailable on this device. Showing the fallback 3D viewer instead.");
      return;
    }

    const xr = (navigator as Navigator & { xr?: XRSystem }).xr;

    if (!xr) {
      setStatus("WebXR is unavailable on this device. Showing the fallback 3D viewer instead.");
      return;
    }

    const supported = await xr.isSessionSupported("immersive-ar");

    if (!supported) {
      setStatus("Immersive AR is not supported here. Continue with the standard luxury 3D viewer.");
      return;
    }

    setStatus("Immersive AR is supported. Connect the scene session here after installing dependencies and testing on device.");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-3xl uppercase tracking-[0.14em] text-white">Browser AR Try-On</h2>
        <p className="mt-4 max-w-2xl text-white/66">
          Uses WebXR `immersive-ar` where available, with a graceful fallback to the standard 3D viewer for unsupported
          browsers or desktop environments.
        </p>
        <div className="mt-6 rounded-[1.6rem] border border-white/8 bg-black/35 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[rgba(215,180,106,0.8)]">AR Entry Flow</p>
          <p className="mt-3 text-white/66">
            Open phone camera, place on desk, rotate, scale, try around neck, and adapt the scene to lighting when the
            session becomes active.
          </p>
          <button
            type="button"
            onClick={launchAr}
            className="mt-6 rounded-full border border-[rgba(215,180,106,0.32)] bg-[rgba(215,180,106,0.1)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white"
          >
            Enter AR
          </button>
          <p className="mt-4 text-sm text-white/54">{status}</p>
        </div>
      </section>
      <aside className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-white/48">QR Open From Desktop</p>
        <div className="mt-5 flex h-72 items-center justify-center rounded-[1.6rem] border border-dashed border-white/12 bg-white/[0.03] text-center text-white/48">
          Generate a QR to<br />{qrUrl || "your /ar route"}
        </div>
        <p className="mt-5 text-sm text-white/58">
          Mobile-safe asset loading and glTF optimization should be added when the OBJ is converted into an AR-ready
          asset pipeline.
        </p>
      </aside>
    </div>
  );
}
