
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { accent } from "../utils/accents";

// One "solar system" per skill group: a labeled hub in the center with
// skill bubbles orbiting around it, sized by proficiency. Replaces the
// plain progress-bar list with something people actually want to poke at.
//
// Sizing is measurement-driven (via ResizeObserver) rather than fixed
// breakpoint values: every internal measurement (ring, radius, hub,
// bubbles, type) is a fixed ratio of the container's actual rendered
// width. That keeps the whole "solar system" — ring, orbit radius and
// bubbles together — scaling as one unit at any viewport width, so nothing
// overlaps and nothing needs a hard-coded mobile/tablet/desktop split.
const MAX_SIZE = 320;
const MIN_SIZE = 220;

export default function SkillOrbit({ group }) {
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);
  const [size, setSize] = useState(MAX_SIZE);
  const a = accent(group.accent);
  const n = group.skills.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width;
      if (w) setSize(Math.max(MIN_SIZE, Math.min(MAX_SIZE, w)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Every measurement below is the same ratio-to-container-width the
  // original design used at its fixed 320px size, so the enlarged system
  // keeps identical proportions instead of just scaling font sizes.
  const ringSize = size * 0.756;
  const radius = size * 0.378;
  const hubSize = size * 0.275;
  const hubFont = Math.max(11, size * 0.0384);
  const bubbleBase = size * 0.153;
  const bubbleRange = size * 0.069;
  const bubbleFont = Math.max(10, size * 0.035);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex items-center justify-center"
      style={{ width: "100%", maxWidth: MAX_SIZE, aspectRatio: "1 / 1" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* orbit ring guide */}
      <div
        className={`absolute rounded-full border ${a.border} border-dashed opacity-40`}
        style={{ width: ringSize, height: ringSize }}
      />

      {/* center hub */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center rounded-full ${a.bg} border ${a.border} text-center`}
        style={{ width: hubSize, height: hubSize }}
      >
        <span
          className={`font-display leading-tight ${a.text} px-1`}
          style={{ fontSize: hubFont }}
        >
          {group.label}
        </span>
      </div>

      {/* orbiting bubbles: outer plain div rotates the whole ring,
          each bubble counter-rotates so its label stays upright */}
      <motion.div
        animate={paused ? {} : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {group.skills.map((skill, i) => {
          const angle = (2 * Math.PI * i) / n;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const bSize = bubbleBase + (skill.level / 100) * bubbleRange;

          return (
            <div
              key={skill.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            >
              <motion.div
                animate={paused ? {} : { rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  title={`${skill.name} — ${skill.level}%`}
                  style={{ width: bSize, height: bSize }}
                  className={`flex items-center justify-center rounded-full glass border ${a.border} text-center leading-none shadow-glass cursor-default`}
                >
                  <span
                    className="px-1.5 font-medium text-ink"
                    style={{ fontSize: bubbleFont }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
