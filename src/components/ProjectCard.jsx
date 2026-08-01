import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbBrandGithub, TbFileText, TbChevronDown, TbCpu } from "react-icons/tb";
import GlassCard from "./GlassCard";
import TiltCard from "./TiltCard";
import { accent, techAccent } from "../utils/accents";

export default function ProjectCard({ project, reverse = false }) {
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const a = accent(project.accent);
  const showImage = project.image && !imageFailed;

  return (
    <GlassCard className="p-0 overflow-hidden" hover={false}>
      <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Visual panel — a prominent banner area for a project screenshot.
            Swap `project.image` in src/data/projects.js and this fills in
            automatically; the gradient "architecture" look underneath is
            just a graceful fallback if no image is set (or fails to load). */}
        <TiltCard className="relative flex w-full items-center justify-center overflow-hidden lg:w-[42%]">
          <div
            className={`relative flex h-64 w-full items-center justify-center bg-gradient-to-br ${a.gradient} lg:h-full`}
          >
            {showImage && (
              <img
                src={project.image}
                alt={`${project.name} preview`}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {!showImage && (
              <>
                <div className="absolute inset-0 opacity-20 grid-overlay" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute h-44 w-44 rounded-full border border-white/25 border-dashed"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  className="absolute h-28 w-28 rounded-full border border-white/30"
                />
                <TbCpu className="relative z-10 text-white/90" size={45} />
              </>
            )}

            <span className="absolute bottom-4 right-4 z-10 rounded-full bg-black/30 px-3 py-1 font-mono text-[12.3px] text-white/90 backdrop-blur-sm">
              {project.date}
            </span>
          </div>
        </TiltCard>

        {/* Content panel */}
        <div className="flex-1 p-7 sm:p-9">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full ${a.bg} border ${a.border} px-2.5 py-0.5 text-[12.3px] ${a.text}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mt-3 font-display text-2xl text-ink">{project.name}</h3>
          <p className={`mt-1.5 text-base font-medium ${a.text}`}>{project.hook}</p>
          <p className="mt-3 text-sm text-ink-dim leading-relaxed">{project.solution}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => {
              const t = techAccent(tech);
              return (
                <span
                  key={tech}
                  className={`rounded-md ${t.badgeBg} border ${t.badgeBorder} px-2 py-1 text-[12.3px] font-mono font-medium ${t.badgeText}`}
                >
                  {tech}
                </span>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {project.impact.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-ink/[0.04] px-2.5 py-3 text-center">
                <p className={`font-display text-sm ${a.text}`}>{stat.value}</p>
                <p className="mt-0.5 text-[11.2px] text-ink-faint leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-5 space-y-4 border-t border-ink/10 pt-5 text-sm">
                  <div>
                    <p className="eyebrow mb-1.5 text-ink-faint">Problem</p>
                    <p className="text-ink-dim leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-1.5 text-ink-faint">Architecture</p>
                    <p className="text-ink-dim leading-relaxed">{project.architecture}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-1.5 text-ink-faint">Challenges</p>
                    <p className="text-ink-dim leading-relaxed">{project.challenges}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-3 pt-1">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs text-ink hover:border-white/30 transition-colors"
            >
              <TbBrandGithub size={16} /> Code
            </a>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs text-ink hover:border-white/30 transition-colors"
            >
              <TbFileText size={16} /> Case study
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <TbChevronDown size={15} />
              </motion.span>
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
