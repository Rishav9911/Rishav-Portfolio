/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Type scale nudged up ~12% across every step (xs -> 7xl) so
      // headings, body copy, buttons, nav, labels etc. all read larger
      // while keeping the exact same ratios/hierarchy between steps.
      fontSize: {
        xs: ["0.84rem", { lineHeight: "1.12rem" }],
        sm: ["0.98rem", { lineHeight: "1.4rem" }],
        base: ["1.12rem", { lineHeight: "1.68rem" }],
        lg: ["1.26rem", { lineHeight: "1.96rem" }],
        xl: ["1.4rem", { lineHeight: "1.96rem" }],
        "2xl": ["1.68rem", { lineHeight: "2.24rem" }],
        "3xl": ["2.1rem", { lineHeight: "2.52rem" }],
        "4xl": ["2.52rem", { lineHeight: "2.8rem" }],
        "5xl": ["3.36rem", { lineHeight: "1" }],
        "6xl": ["4.2rem", { lineHeight: "1" }],
        "7xl": ["5.04rem", { lineHeight: "1" }],
      },
      colors: {
        void: {
          DEFAULT: "rgb(var(--c-bg-rgb) / <alpha-value>)",
          soft: "rgb(var(--c-bg-soft-rgb) / <alpha-value>)",
          card: "rgb(var(--c-bg-card-rgb) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink-rgb) / <alpha-value>)",
          dim: "rgb(var(--c-ink-dim-rgb) / <alpha-value>)",
          faint: "rgb(var(--c-ink-faint-rgb) / <alpha-value>)",
        },
        aurora: {
          blue: "#4C8DFF",
          indigo: "#7B6CFF",
          violet: "#A469FF",
          pink: "#FF6FB0",
          coral: "#FF7A5C",
          amber: "#FFB84D",
          mint: "#5CE0B8",
          cyan: "#4DD4E8",
        },
      },
      fontFamily: {
        hero: ["'Unbounded'", "'Space Grotesk'", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        note: ["'Caveat'", "cursive"],
      },
      backgroundImage: {
        "trace-gradient":
          "linear-gradient(90deg, transparent, #4C8DFF, #A469FF, #FF6FB0, transparent)",
        "aurora-text":
          "linear-gradient(100deg, #4C8DFF 0%, #A469FF 45%, #FF6FB0 80%, #FFB84D 100%)",
        "aurora-mesh":
          "radial-gradient(at 15% 20%, rgba(76,141,255,0.35) 0px, transparent 50%), radial-gradient(at 85% 15%, rgba(255,111,176,0.28) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(92,224,184,0.22) 0px, transparent 55%), radial-gradient(at 90% 85%, rgba(164,105,255,0.28) 0px, transparent 50%)",
      },
      boxShadow: {
        glass: "0 1px 1px 0 rgba(255,255,255,0.05) inset",
        "glow-blue": "0 0 60px -10px rgba(76,141,255,0.45)",
        "glow-pink": "0 0 60px -10px rgba(255,111,176,0.45)",
        "glow-mint": "0 0 60px -10px rgba(92,224,184,0.4)",
        "glow-amber": "0 0 60px -10px rgba(255,184,77,0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-20px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-14px)" },
        },
        pulseTrace: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blobMorph: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 45% 55% 55%" },
          "34%": { borderRadius: "62% 38% 40% 60% / 60% 35% 65% 40%" },
          "67%": { borderRadius: "38% 62% 55% 45% / 40% 62% 38% 60%" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinSlowReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "floatSlow 12s ease-in-out infinite",
        "pulse-trace": "pulseTrace 2.4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "blob-morph": "blobMorph 12s ease-in-out infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
        "spin-slow": "spinSlow 22s linear infinite",
        "spin-slow-reverse": "spinSlowReverse 26s linear infinite",
      },
    },
  },
  plugins: [],
};
