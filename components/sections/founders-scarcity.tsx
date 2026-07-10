"use client";

import { useEffect, useState } from "react";

const TOTAL_UNITS = 500;
const SHIP_DATE = new Date("2026-09-15T00:00:00Z");

function useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    const tick = () => {
      const delay = 8000 + Math.random() * 10000;
      const timer = window.setTimeout(() => {
        setCount((c) => Math.min(c + 1, TOTAL_UNITS - 2));
        tick();
      }, delay);
      return timer;
    };
    const timer = tick();
    return () => window.clearTimeout(timer);
  }, []);
  return count;
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);
    return { days, hours, minutes, seconds };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function Pad({ n }: { n: number }) {
  return <>{String(n).padStart(2, "0")}</>;
}

export function FoundersScarcity() {
  const reserved = useCounter(247);
  const { days, hours, minutes, seconds } = useCountdown(SHIP_DATE);
  const pct = Math.round((reserved / TOTAL_UNITS) * 100);

  return (
    <div className="mt-8 space-y-5">
      {/* Limited badge */}
      <div className="flex items-center gap-3">
        <span
          className="relative flex h-2.5 w-2.5"
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d7b46a] opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d7b46a]" />
        </span>
        <p className="text-xs uppercase tracking-[0.28em] text-[rgba(215,180,106,0.9)]">
          Founders Edition · Limited to {TOTAL_UNITS} units
        </p>
      </div>

      {/* Reservation counter */}
      <div>
        <div className="mb-2 flex items-end justify-between">
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">{reserved}</span> of {TOTAL_UNITS} reserved
          </p>
          <p className="text-xs text-white/45">{pct}% claimed</p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={reserved}
          aria-valuemin={0}
          aria-valuemax={TOTAL_UNITS}
          aria-label={`${reserved} of ${TOTAL_UNITS} Founders Edition units reserved`}
          className="h-1 w-full overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#d7b46a] to-[#f0d48a] transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Countdown */}
      <div className="rounded-[1.2rem] border border-[rgba(215,180,106,0.18)] bg-[rgba(215,180,106,0.04)] px-5 py-4">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/45">
          Ships Q3 2026 · Time remaining
        </p>
        <div className="flex gap-4" aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until shipping`}>
          {[
            { label: "Days", value: days },
            { label: "Hrs", value: hours },
            { label: "Min", value: minutes },
            { label: "Sec", value: seconds }
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl tabular-nums tracking-[0.06em] text-white">
                <Pad n={value} />
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.22em] text-white/45">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
