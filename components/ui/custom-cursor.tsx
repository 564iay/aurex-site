"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div className="absolute left-[var(--cursor-x)] top-[var(--cursor-y)] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm" />
      <div className="absolute left-[var(--cursor-x)] top-[var(--cursor-y)] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(215,180,106,0.3)]" />
    </div>
  );
}
