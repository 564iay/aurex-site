"use client";

import { useState, useTransition } from "react";

export function AiConcierge() {
  const [question, setQuestion] = useState("Which AUREX build is best for travel and long listening?");
  const [answer, setAnswer] = useState<{ recommendation: string; reason: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const ask = () => {
    startTransition(async () => {
      const response = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      setAnswer(await response.json());
    });
  };

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="eyebrow mb-3">AI Product Advisor</p>
      <h2 className="text-3xl uppercase tracking-[0.14em] text-white">Concierge assistance for premium decisions.</h2>
      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        className="mt-5 min-h-32 w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none"
      />
      <button
        type="button"
        onClick={ask}
        disabled={isPending}
        className="mt-5 rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white"
      >
        {isPending ? "Thinking..." : "Ask AUREX AI"}
      </button>
      {answer ? (
        <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-[rgba(215,180,106,0.78)]">Recommendation</p>
          <p className="mt-3 text-xl uppercase tracking-[0.12em] text-white">{answer.recommendation}</p>
          <p className="mt-3 text-white/64">{answer.reason}</p>
        </div>
      ) : null}
    </div>
  );
}
