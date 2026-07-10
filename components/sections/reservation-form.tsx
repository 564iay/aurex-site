"use client";

import { FormEvent, useState } from "react";

import { colors } from "@/lib/content";

type FormState = "idle" | "submitting" | "confirmed" | "error";

function generateRef() {
  return "AUREX-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export function ReservationForm({ defaultColor }: { defaultColor: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [color, setColor] = useState(defaultColor);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<FormState>("idle");
  const [ref, setRef] = useState("");

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "A valid email address is required.";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("submitting");

    // Simulate API call — replace with real Stripe/DB endpoint later
    await new Promise((r) => setTimeout(r, 1200));
    const orderRef = generateRef();
    setRef(orderRef);
    setState("confirmed");

    // Optionally: await fetch('/api/reservations', { method: 'POST', body: JSON.stringify({name,email,color}) })
  }

  if (state === "confirmed") {
    const selectedColorName = colors.find((c) => c.value === color)?.name ?? color;
    return (
      <div
        role="status"
        aria-live="assertive"
        className="mt-8 rounded-[1.8rem] border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.06)] p-8 text-center"
      >
        <p className="font-display text-4xl uppercase tracking-[0.18em] text-white">AUREX</p>
        <div className="gold-line mx-auto mt-4 w-24" />
        <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[rgba(215,180,106,0.85)]">
          Reservation Confirmed
        </p>
        <p className="mt-4 text-xl text-white">{name}</p>
        <p className="mt-2 text-sm text-white/60">
          {selectedColorName} · Founders Edition · $799
        </p>
        <div className="mt-6 inline-block rounded-xl border border-white/10 bg-white/5 px-6 py-3">
          <p className="font-mono text-xs tracking-[0.3em] text-white/55">Order Reference</p>
          <p className="mt-1 font-mono text-lg tracking-[0.15em] text-white">{ref}</p>
        </div>
        <p className="mt-6 max-w-sm mx-auto text-sm leading-7 text-white/52">
          A confirmation will be sent to <span className="text-white/75">{email}</span>. 
          Your AUREX ships Q3 2026 — we will be in touch with tracking and first access to the companion app.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4" aria-label="Founders Edition reservation form">
      {/* Name */}
      <div>
        <label htmlFor="res-name" className="mb-1.5 block text-xs uppercase tracking-[0.24em] text-white/55">
          Full Name
        </label>
        <input
          id="res-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "res-name-err" : undefined}
          className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/25 backdrop-blur-sm transition focus:border-[rgba(215,180,106,0.45)] focus:outline-none focus:ring-0"
        />
        {errors.name && (
          <p id="res-name-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="res-email" className="mb-1.5 block text-xs uppercase tracking-[0.24em] text-white/55">
          Email Address
        </label>
        <input
          id="res-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "res-email-err" : undefined}
          className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/25 backdrop-blur-sm transition focus:border-[rgba(215,180,106,0.45)] focus:outline-none focus:ring-0"
        />
        {errors.email && (
          <p id="res-email-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Color */}
      <div>
        <label htmlFor="res-color" className="mb-1.5 block text-xs uppercase tracking-[0.24em] text-white/55">
          Finish Selection
        </label>
        <div className="relative">
          <select
            id="res-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label="Select headphone finish color"
            className="w-full appearance-none rounded-[1rem] border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white backdrop-blur-sm transition focus:border-[rgba(215,180,106,0.45)] focus:outline-none"
          >
            {colors.map((c) => (
              <option key={c.value} value={c.value} style={{ background: "#111" }}>
                {c.name}
              </option>
            ))}
          </select>
          {/* Color dot preview */}
          <span
            className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/20"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Edition summary */}
      <div className="rounded-[1.2rem] border border-white/8 bg-white/3 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">Founders Edition</p>
            <p className="mt-1 text-sm text-white/70">Luxury travel case · braided cable · first-run engraving</p>
          </div>
          <p className="font-display text-2xl tracking-[0.08em] text-white">$799</p>
        </div>
      </div>

      {state === "error" && (
        <p role="alert" className="text-xs text-red-400">Something went wrong — please try again.</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="group relative w-full overflow-hidden rounded-full border border-[rgba(215,180,106,0.42)] bg-[linear-gradient(90deg,rgba(215,180,106,0.14),rgba(255,255,255,0.08),rgba(215,180,106,0.14))] bg-[length:200%_100%] py-4 text-sm uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(215,180,106,0.12)] transition-all hover:bg-[rgba(215,180,106,0.22)] hover:shadow-[0_0_40px_rgba(215,180,106,0.2)] disabled:opacity-50"
      >
        {state === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Reserving…
          </span>
        ) : (
          "Reserve Your AUREX"
        )}
      </button>

      <p className="text-center text-xs text-white/32">
        No charge today · Secure reservation · Cancel anytime before ship date
      </p>
    </form>
  );
}
