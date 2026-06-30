import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        aurum: "#d7b46a",
        obsidian: "#060606",
        ink: "#0d0d0d",
        mist: "#f4efe8"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        gold: "0 0 40px rgba(215, 180, 106, 0.16)",
        glass: "0 24px 60px rgba(0, 0, 0, 0.38)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at 50% 20%, rgba(215, 180, 106, 0.18), transparent 32%), radial-gradient(circle at 20% 15%, rgba(127, 71, 24, 0.16), transparent 28%), radial-gradient(circle at 85% 5%, rgba(110, 146, 187, 0.16), transparent 24%)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pulseSoft: "pulseSoft 3.2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.02)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
