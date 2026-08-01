import { useState } from "react";
import { motion } from "framer-motion";
import { accent } from "../utils/accents";

// One "solar system" per skill group: a labeled hub in the center with
// skill bubbles orbiting around it, sized by proficiency. Replaces the
// plain progress-bar list with something people actually want to poke at.
export default function SkillOrbit({ group }) {
  const [paused, setPaused] = useState(false);
  const a = accent(group.accent);
  const n = group.skills.length;
  const radius = 121;

  return (
    <div
      className="relative mx-auto flex h-80 w-80 items-center justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* orbit ring guide */}
      <div className={`absolute h-[242px] w-[242px] rounded-full border ${a.border} border-dashed opacity-40`} />

      {/* center hub */}
      <div className={`relative z-10 flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center rounded-full ${a.bg} border ${a.border} text-center`}>
        <span className={`text-[12.3px] font-display leading-tight ${a.text} px-1`}>
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
          const size = 49 + Math.round((skill.level / 100) * 22);

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
                  style={{ width: size, height: size }}
                  className={`flex items-center justify-center rounded-full glass border ${a.border} text-center leading-none shadow-glass cursor-default`}
                >
                  <span className="px-1.5 text-[11.2px] font-medium text-ink">
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
