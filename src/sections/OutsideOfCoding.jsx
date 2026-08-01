import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import GlassCard from "../components/GlassCard";
import { interests } from "../data/interests";
import { accent } from "../utils/accents";

// Per-card hover personalities — each interest gets its own little
// physical tic instead of one shared lift animation, so the section
// feels handcrafted rather than templated.
const HOVER_MOTION = [
  { y: -8, rotate: [0, -4, 4, -3, 0], transition: { duration: 0.6, ease: "easeInOut" } }, // cricket: a little swing
  { y: -8, rotate: [0, -6, 6, -4, 0], transition: { duration: 0.6, ease: "easeInOut" } }, // anime: restless wiggle
  { y: -8, x: [0, -2, 2, -2, 0], transition: { duration: 0.4, ease: "easeInOut" } }, // sketching: scribble shake
  { y: [-8, -14, -8], transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } }, // swimming: bobbing
  { y: -8, scale: 1.05, rotate: 4, transition: { duration: 0.3, ease: "easeOut" } }, // food: little pop
];

const SPARKLES = ["✨", "⭐", "💫", "🌟", "✦"];

export default function OutsideOfCoding() {
  const [revealed, setRevealed] = useState(() => new Set());
  const [bursts, setBursts] = useState({});

  const toggleReveal = (id) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    // A tiny sparkle burst as a reward for clicking, not just hovering.
    setBursts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <section id="outside" className="relative overflow-hidden px-6 py-24">
      {/* Floating doodle accents — purely decorative, signal that this
          section is a deliberate break from the technical content above it */}
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[6%] top-[8%] hidden text-3xl opacity-30 sm:block"
      >
        ✏️
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="pointer-events-none absolute right-[8%] top-[16%] hidden text-2xl opacity-30 sm:block"
      >
        ⭐
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-[18%] bottom-[8%] hidden text-2xl opacity-25 sm:block"
      >
        💭
      </motion.span>

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Off the clock"
          title="Outside of coding."
          tone="blue"
        />

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {interests.map((interest, i) => {
            const a = accent(interest.accent);
            const isRevealed = revealed.has(interest.id);
            const burstKey = bursts[interest.id] || 0;

            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative w-[17.25rem]"
              >
                <motion.div
                  whileHover={HOVER_MOTION[i % HOVER_MOTION.length]}
                  whileTap={{ scale: 0.94, rotate: 0 }}
                  onClick={() => toggleReveal(interest.id)}
                  className="group h-full cursor-pointer select-none"
                >
                  <GlassCard
                    className={`h-full p-7 text-center border ${a.border} hover:shadow-glow-blue`}
                    hover={false}
                  >
                    <motion.span
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      className={`mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl ${a.bg} border ${a.border} text-3xl`}
                    >
                      {interest.emoji}
                    </motion.span>
                    <p className={`mt-4 text-sm font-semibold ${a.text}`}>
                      {interest.label}
                    </p>
                    <p className="mt-2 text-sm text-ink-dim leading-relaxed">
                      {interest.line}
                    </p>

                    {/* Fun fact: peeks in on hover, and stays put once tapped
                        so the interaction works on touch devices too */}
                    <AnimatePresence mode="wait">
                      {isRevealed ? (
                        <motion.p
                          key="pinned"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className={`overflow-hidden text-xs italic ${a.text}`}
                        >
                          {interest.funFact}
                        </motion.p>
                      ) : (
                        <p className="mt-2 text-[12.3px] italic text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {interest.funFact}
                        </p>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>

                {/* Click reward: a tiny sparkle burst radiating from the card */}
                <AnimatePresence>
                  {burstKey > 0 && (
                    <BurstOnce key={burstKey} emoji={SPARKLES[i % SPARKLES.length]} />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Fires a handful of little sparkles outward from a card and then
// unmounts itself — a one-off confetti moment reserved for clicking,
// so it stays a delightful surprise instead of a hover-loop distraction.
function BurstOnce({ emoji }) {
  const particles = [0, 1, 2, 3, 4];
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, delay: 0.7 }}
      className="pointer-events-none absolute inset-0 z-20"
    >
      {particles.map((p) => {
        const angle = (p / particles.length) * Math.PI * 2;
        const dist = 46;
        return (
          <motion.span
            key={p}
            initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 text-lg"
          >
            {emoji}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
