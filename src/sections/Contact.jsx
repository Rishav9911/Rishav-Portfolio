import { motion } from "framer-motion";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
  TbArrowUpRight,
} from "react-icons/tb";
import SectionHeading from "../components/SectionHeading";
import GlassCard from "../components/GlassCard";
import { profile } from "../data/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ConnectCard({ icon, label, value, href, tone }) {
  return (
    <motion.a
      variants={item}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="group block"
    >
      <GlassCard className="flex items-center gap-4 p-6 h-full" hover={true}>
        <span
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone.gradient} text-white shadow-glass transition-transform duration-300 group-hover:scale-105`}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-ink-faint">{label}</p>
          <p className="mt-0.5 truncate text-sm font-medium text-ink group-hover:text-aurora-pink transition-colors">
            {value}
          </p>
        </div>
        <TbArrowUpRight
          size={18}
          className="flex-shrink-0 text-ink-faint opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-aurora-pink"
        />
      </GlassCard>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect."
          description="Open to full-time AI engineering and software engineering roles. Reach out through any of the channels below."
          tone="pink"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <ConnectCard
            icon={<TbMail size={21} />}
            label="Primary Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
            tone={{ gradient: "from-aurora-blue to-aurora-violet" }}
          />
          <ConnectCard
            icon={<TbMail size={21} />}
            label="Secondary Email"
            value={profile.emailSecondary}
            href={`mailto:${profile.emailSecondary}`}
            tone={{ gradient: "from-aurora-violet to-aurora-pink" }}
          />
          <ConnectCard
            icon={<TbBrandGithub size={21} />}
            label="GitHub"
            value="View my projects & code"
            href={profile.github}
            tone={{ gradient: "from-aurora-pink to-aurora-coral" }}
          />
          <ConnectCard
            icon={<TbBrandLinkedin size={21} />}
            label="LinkedIn"
            value="Let's connect professionally"
            href={profile.linkedin}
            tone={{ gradient: "from-aurora-coral to-aurora-amber" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
