import type { Config } from "tailwindcss";

// Palette pulled 1:1 from the approved Claude Design source
// (Aarachitt Ventures Website.dc.html) — do not rename or drift these
// values without re-checking design fidelity.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EF",
        "ivory-card": "#F3EDE1",
        "ivory-border": "#E4DAC5",
        charcoal: "#23201C",
        "charcoal-soft": "#3A3529",
        gold: {
          DEFAULT: "#B8862E",
          dark: "#8F6A21",
          deep: "#8A6A2E",
          light: "#D9BD7A",
          pale: "#E8CE8F",
        },
        champagne: {
          DEFAULT: "#C9B48C",
          light: "#DED4C0",
          muted: "#B0A481",
        },
        ink: {
          DEFAULT: "#57503F",
          soft: "#8A7A5C",
        },
        highlight: "#F0E6D1",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        floatSlow2: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(14px) rotate(4deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "float-slow": "floatSlow 9s ease-in-out infinite",
        "float-slow2": "floatSlow2 11s ease-in-out infinite",
        "float-slow-13": "floatSlow 13s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
        "fade-up": "fadeUp 0.9s ease both",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        spin: "spin 0.9s linear infinite",
      },
      boxShadow: {
        card: "0 24px 48px rgba(35,32,28,0.12)",
        "card-lg": "0 40px 80px rgba(35,32,28,0.18)",
        cta: "0 10px 30px rgba(35,32,28,0.25)",
        "cta-gold": "0 10px 28px rgba(184,134,46,0.35)",
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
