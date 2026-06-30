export function createSoundRecommendation(input: {
  genre?: string;
  environment?: string;
  batteryMode?: string;
  noiseLevel?: string;
}) {
  const genre = input.genre ?? "mixed";
  const environment = input.environment ?? "studio";
  const batteryMode = input.batteryMode ?? "balanced";
  const noiseLevel = input.noiseLevel ?? "moderate";

  return {
    profile:
      genre === "classical"
        ? "Wide Stage Reference"
        : genre === "electronic"
          ? "Deep Pulse"
          : genre === "podcast"
            ? "Vocal Precision"
            : "Signature Balance",
    anc:
      environment === "flight" || noiseLevel === "high" ? "Adaptive Max ANC" : "Comfort Transparency",
    eq:
      batteryMode === "eco"
        ? "Efficiency EQ trims sub-bass bloom and reduces DSP load."
        : "Dynamic EQ maintains warmth, detail, and depth based on your scene.",
    explanation: `Tuned for ${genre} listening in a ${environment} environment with ${noiseLevel} noise and ${batteryMode} battery preference.`
  };
}

export function createAdvisorAnswer(question: string) {
  const lower = question.toLowerCase();

  if (lower.includes("best") || lower.includes("which")) {
    return {
      recommendation: "Signature edition with brushed titanium and ivory leather.",
      reason: "It balances flagship finish, long-wear comfort, and the strongest storytelling for a first AUREX purchase."
    };
  }

  if (lower.includes("checkout") || lower.includes("shipping")) {
    return {
      recommendation: "Use the secure Stripe checkout to confirm shipping details and reserve your configuration.",
      reason: "Orders remain editable until payment confirmation, and tracking activates once the webhook marks the order as paid."
    };
  }

  return {
    recommendation: "Founders edition with Satin Gold frame and custom engraving.",
    reason: "That combination best expresses the premium positioning of AUREX while unlocking the highest-end accessories."
  };
}
