import { motion } from "framer-motion";
import { TbBrandGithub, TbBrandLinkedin, TbMail, TbFileText, TbArrowDown, TbSparkles } from "react-icons/tb";
import MagneticButton from "../components/MagneticButton";
import { profile } from "../data/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-24"
    >
      {/* Floating decorative shapes — offset, not centered, so the hero
          doesn't read as a plain stacked resume header */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute right-[6%] top-[14%] hidden h-44 w-44 rounded-[38%_62%_60%_40%/40%_45%_55%_60%] border border-aurora-pink/30 lg:block"
      />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute right-[16%] top-[38%] hidden h-28 w-28 rounded-[62%_38%_40%_60%/60%_35%_65%_40%] border border-aurora-mint/30 lg:block"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[10%] bottom-[16%] hidden h-20 w-20 rounded-2xl bg-gradient-to-br from-aurora-amber/25 to-aurora-coral/25 backdrop-blur-sm lg:block"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-5xl"
      >
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs text-ink-dim">{profile.availability}</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-hero text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.03] tracking-tight text-ink"
        >
          {profile.heroGreeting}
          <TbSparkles className="ml-3 inline h-8 w-8 sm:h-10 sm:w-10 text-aurora-amber align-middle" />
        </motion.h1>

        <motion.p
          variants={item}
          className="font-hero mt-4 max-w-2xl text-2xl sm:text-4xl font-semibold leading-tight tracking-tight text-aurora animate-gradient-shift"
        >
          {profile.heroTagline}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg text-ink-dim leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
          <MagneticButton
            as="a"
            href={profile.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-aurora-blue via-aurora-violet to-aurora-pink px-6 py-3 text-sm font-medium text-white shadow-glow-pink"
          >
            <TbFileText size={18} /> View Resume
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-ink"
          >
            Get in touch
          </MagneticButton>
          <MagneticButton
            as="a"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink"
          >
            <TbBrandGithub size={19} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink"
          >
            <TbBrandLinkedin size={19} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink"
          >
            <TbMail size={19} />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-faint"
      >
        <TbArrowDown size={22} />
      </motion.button>
    </section>
  );
}
