import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import GlassCard from "../components/GlassCard";
import { profile } from "../data/profile";
import { accent } from "../utils/accents";

const focusAccents = ["pink", "mint", "amber", "violet"];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="About" title={profile.about.heading} tone="amber" />

        <div className="grid gap-10 md:grid-cols-12">
          {/* Left: short story + focus chips, offset from center for a
              less "heading > paragraph > cards" feel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-4"
          >
            {profile.about.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-ink-dim leading-relaxed">
                {p}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.about.focusAreas.map((area, i) => {
                const a = accent(focusAccents[i % focusAccents.length]);
                return (
                  <motion.span
                    key={area.label}
                    whileHover={{ y: -2, scale: 1.03 }}
                    className={`rounded-full ${a.bg} border ${a.border} px-3.5 py-1.5 text-xs ${a.text}`}
                    title={area.detail}
                  >
                    {area.label}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Right: a slightly rotated "sticky note" card — the personal
              touch the brief asked for, offset against the grid */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 md:-mt-12"
          >
            <GlassCard className="overflow-hidden p-5" hover={false}>
              <img
                src={profile.about.photo}
                alt={profile.name}
                className="aspect-[4/5] w-full rounded-xl object-cover"
              />
              <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                “{profile.about.philosophy}”
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
