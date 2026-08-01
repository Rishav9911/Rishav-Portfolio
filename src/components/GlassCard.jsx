import { motion } from "framer-motion";

// Reusable glass surface with a subtle hover lift + border glow.
// `as` lets callers render it as a different element (e.g. article).
export default function GlassCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`glass rounded-2xl shadow-glass transition-colors duration-300 hover:border-aurora-pink/25 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
