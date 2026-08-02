import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { TbChevronDown, TbBuildingSkyscraper, TbMapPin } from "react-icons/tb";
import SectionHeading from "../components/SectionHeading";
import GlassCard from "../components/GlassCard";
import { experience } from "../data/experience";
import { accent, techAccent } from "../utils/accents";

// Company logo tile. Renders the image from `role.logo` when set —
// swap that path in src/data/experience.js and it updates everywhere.
// Falls back to an accent-gradient initials tile if there's no image
// yet, or if the image fails to load.
function CompanyMark({ company, logo, a }) {
  const [failed, setFailed] = useState(false);
  const showImage = logo && !failed;

  const initials = company
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (showImage) {
    return (
      <span
        className={`flex h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border ${a.border} shadow-glass`}
      >
        <img
          src={logo}
          alt={`${company} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${a.gradient} font-display text-lg font-semibold text-white shadow-glass`}
    >
      {initials}
    </span>
  );
}

function ExperienceItem({ role, index, isLast }) {
  const [open, setOpen] = useState(false);
  // Tracks whether a tech badge in THIS card is being hovered, so the
  // card-border glow stays scoped to a single card instead of leaking
  // into siblings.
  const [stackHover, setStackHover] = useState(false);
  const a = accent(role.accent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex gap-5 sm:gap-6"
    >
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <span
          className={`relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${a.bg} border-2 ${a.border}`}
        >
          {role.current && (
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${a.dot} opacity-50`} />
          )}
          <span className={`relative h-1.5 w-1.5 rounded-full ${a.dot}`} />
        </span>
        {/* Line always continues for the full height of this item — for
            the last role that means it now runs all the way down through
            the card's bottom padding (instead of stopping at the dot),
            with a gentle taper at the very end rather than a hard cut. */}
        <span
          className="mt-1 w-px flex-1 bg-ink/10"
          style={
            isLast
              ? {
                  background:
                    "linear-gradient(to bottom, rgb(var(--c-ink-rgb) / 0.1) 0%, rgb(var(--c-ink-rgb) / 0.1) 75%, transparent 100%)",
                }
              : undefined
          }
        />
      </div>

      {/* Card */}
      <div className="flex-1 pb-14">
        <div className="relative">
          {/* Glow overlay: fades in only while a tech badge in THIS card
              is hovered, using the card's own accent — border color only,
              no background change, smooth in and out. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 rounded-2xl border-2 ${a.borderStrong} ${a.glow} transition-opacity duration-300 ease-out ${
              stackHover ? "opacity-100" : "opacity-0"
            }`}
          />
          <GlassCard className="p-7 sm:p-8" hover={false}>
          {/* Header: the eye should land here first */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <CompanyMark company={role.company} logo={role.logo} a={a} />
              <div>
                <h3 className="font-display text-2xl sm:text-[1.96rem] font-semibold leading-tight tracking-tight text-ink">
                  {role.role}
                </h3>
                <p className={`mt-1 flex items-center gap-1.5 text-base sm:text-lg font-semibold bg-gradient-to-r ${a.gradient} bg-clip-text text-transparent`}>
                  <TbBuildingSkyscraper size={18} className={a.text} />
                  {role.company}
                </p>
                {role.location && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-ink-faint">
                    <TbMapPin size={13} /> {role.location}
                  </p>
                )}
              </div>
            </div>

            <span className={`inline-flex flex-shrink-0 items-center gap-2 rounded-full ${a.bg} border ${a.border} px-3 py-1.5`}>
              {role.current && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${a.dot} opacity-60`} />
                  <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${a.dot}`} />
                </span>
              )}
              <span className={`text-[12.3px] font-mono font-medium ${a.text}`}>{role.duration}</span>
            </span>
          </div>

          {/* Supporting one-liner */}
          <p className="mt-5 border-l-2 border-ink/10 pl-4 text-sm italic text-ink-dim leading-relaxed">
            "{role.story}"
          </p>

          {/* Metrics */}
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/10 pt-5">
            {role.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className={`font-display text-xl sm:text-2xl font-semibold ${a.text}`}>{m.value}</p>
                <p className="mt-1 text-[12.3px] text-ink-faint leading-tight">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {role.stack.map((t) => {
              const ta = techAccent(t);
              return (
                <span
                  key={t}
                  onMouseEnter={() => setStackHover(true)}
                  onMouseLeave={() => setStackHover(false)}
                  className={`cursor-default rounded-md ${ta.badgeBg} border ${ta.badgeBorder} px-2 py-1 text-[12.3px] font-mono font-medium ${ta.badgeText} transition-transform duration-200 hover:scale-105`}
                >
                  {t}
                </span>
              );
            })}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-5 flex items-center gap-1.5 text-xs text-ink-faint hover:text-ink transition-colors"
          >
            {open ? "Hide" : "Show"} highlights
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <TbChevronDown size={15} />
            </motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {role.achievements.map((line, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-ink-dim leading-relaxed">
                    <span className={`mt-2 h-1 w-1 flex-shrink-0 rounded-full ${a.dot}`} />
                    {line}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}

// A small glowing "comet" that rides the timeline rail, its position tied
// to how far the user has scrolled through the experience list. Position
// is driven by Framer Motion's scroll progress (itself rAF-based) and
// smoothed with a spring so it eases fluidly in both scroll directions
// rather than snapping to the raw scroll value.
function TimelineComet({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.35"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const top = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-2 z-10 -translate-x-1/2"
      style={{ top, opacity }}
    >
      {/* shimmering trail: a soft fading streak behind the comet */}
      <div className="absolute bottom-0 left-1/2 h-20 w-px -translate-x-1/2 bg-gradient-to-t from-aurora-mint/80 via-aurora-mint/25 to-transparent" />
      {/* outer halo */}
      <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-mint/30 blur-md" />
      {/* bright core */}
      <div className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-mint shadow-[0_0_12px_3px_rgba(92,224,184,0.85)]" />
    </motion.div>
  );
}

export default function Experience() {
  const timelineRef = useRef(null);

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked."
          tone="mint"
        />

        <div ref={timelineRef} className="relative">
          <TimelineComet containerRef={timelineRef} />
          {experience.map((role, i) => (
            <ExperienceItem
              key={role.id}
              role={role}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
