import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu2, TbX } from "react-icons/tb";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollProgress } from "../hooks/useScrollProgress";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(LINKS.map((l) => l.id));
  const progress = useScrollProgress();
  const condensed = progress > 2;

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        animate={{
          paddingTop: condensed ? 8 : 12,
          paddingBottom: condensed ? 8 : 12,
        }}
        className="glass flex w-full max-w-3xl items-center justify-between rounded-full px-5 shadow-glass"
      >
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-sm font-semibold tracking-tight text-ink"
        >
          rishav<span className="text-aurora">.</span>dev
        </button>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative px-3 py-1.5 text-sm rounded-full transition-colors ${
                active === link.id ? "text-ink" : "text-ink-dim hover:text-ink"
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-aurora-blue/15 via-aurora-violet/15 to-aurora-pink/15 border border-aurora-pink/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-ink"
          >
            {open ? <TbX size={20} /> : <TbMenu2 size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-2xl p-3 md:hidden"
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full rounded-lg px-4 py-3 text-left text-sm ${
                  active === link.id
                    ? "text-aurora-pink bg-aurora-pink/10"
                    : "text-ink-dim"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
