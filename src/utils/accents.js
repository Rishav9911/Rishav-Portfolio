// Central accent-color map so each section/card can declare a hue by
// name ("pink", "mint"...) and get consistent Tailwind classes back,
// instead of every component hardcoding one shade of blue.
export const ACCENTS = {
  blue: {
    text: "text-aurora-blue",
    bg: "bg-aurora-blue/10",
    border: "border-aurora-blue/30",
    borderStrong: "border-aurora-blue/70",
    glow: "shadow-glow-blue",
    dot: "bg-aurora-blue",
    gradient: "from-aurora-blue to-aurora-indigo",
    badgeBg: "bg-aurora-blue/[0.16]",
    badgeBorder: "border-aurora-blue/45",
    badgeText: "text-[#8fb8ff]",
  },
  violet: {
    text: "text-aurora-violet",
    bg: "bg-aurora-violet/10",
    border: "border-aurora-violet/30",
    borderStrong: "border-aurora-violet/70",
    glow: "shadow-glow-blue",
    dot: "bg-aurora-violet",
    gradient: "from-aurora-indigo to-aurora-violet",
    badgeBg: "bg-aurora-violet/[0.16]",
    badgeBorder: "border-aurora-violet/45",
    badgeText: "text-[#c3a3ff]",
  },
  pink: {
    text: "text-aurora-pink",
    bg: "bg-aurora-pink/10",
    border: "border-aurora-pink/30",
    borderStrong: "border-aurora-pink/70",
    glow: "shadow-glow-pink",
    dot: "bg-aurora-pink",
    gradient: "from-aurora-violet to-aurora-pink",
    badgeBg: "bg-aurora-pink/[0.16]",
    badgeBorder: "border-aurora-pink/45",
    badgeText: "text-[#ff9dc8]",
  },
  amber: {
    text: "text-aurora-amber",
    bg: "bg-aurora-amber/10",
    border: "border-aurora-amber/30",
    borderStrong: "border-aurora-amber/70",
    glow: "shadow-glow-amber",
    dot: "bg-aurora-amber",
    gradient: "from-aurora-coral to-aurora-amber",
    badgeBg: "bg-aurora-amber/[0.16]",
    badgeBorder: "border-aurora-amber/45",
    badgeText: "text-[#ffcb80]",
  },
  mint: {
    text: "text-aurora-mint",
    bg: "bg-aurora-mint/10",
    border: "border-aurora-mint/30",
    borderStrong: "border-aurora-mint/70",
    glow: "shadow-glow-mint",
    dot: "bg-aurora-mint",
    gradient: "from-aurora-cyan to-aurora-mint",
    badgeBg: "bg-aurora-mint/[0.16]",
    badgeBorder: "border-aurora-mint/45",
    badgeText: "text-[#8aeed0]",
  },
};

export const ACCENT_KEYS = Object.keys(ACCENTS);

export function accent(key) {
  return ACCENTS[key] || ACCENTS.blue;
}

// Deterministic hash so a given technology name (e.g. "Python") always
// resolves to the same accent everywhere it's used across the site —
// a stable color identity per tech, rather than one shared neutral tone.
export function techAccent(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const key = ACCENT_KEYS[Math.abs(hash) % ACCENT_KEYS.length];
  return ACCENTS[key];
}
