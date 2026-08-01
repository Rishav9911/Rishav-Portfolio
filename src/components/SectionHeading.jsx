import { motion } from "framer-motion";
import { accent } from "../utils/accents";

export default function SectionHeading({ eyebrow, title, description, align = "left", tone = "blue" }) {
  const a = accent(tone);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className={`eyebrow mb-3 ${a.text}`}>{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-ink-dim leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
