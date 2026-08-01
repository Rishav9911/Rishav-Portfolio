import { motion, AnimatePresence } from "framer-motion";
import { TbArrowUp } from "react-icons/tb";
import { useScrollProgress } from "../hooks/useScrollProgress";

export default function BackToTop() {
  const progress = useScrollProgress();
  const visible = progress > 15;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full glass text-ink hover:border-aurora-pink/40 transition-colors"
        >
          <TbArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
