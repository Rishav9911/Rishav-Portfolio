import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import SkillOrbit from "../components/SkillOrbit";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Toolbox"
          title="What I work with."
          tone="violet"
        />

        <div className="grid gap-x-14 gap-y-24 sm:gap-x-20 sm:gap-y-28 lg:gap-x-24 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.05 }}
            >
              <SkillOrbit group={group} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
