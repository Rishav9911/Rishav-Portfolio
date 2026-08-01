import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TbSearch, TbX } from "react-icons/tb";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { projects, allTech } from "../data/projects";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [techFilter, setTechFilter] = useState(null);

  // Chrome Extension is an implementation detail of one project, not a
  // filter people search by — Python is the far more useful chip since
  // it spans every project in the list.
  const techFilters = useMemo(() => {
    const prioritized = ["Python"];
    const rest = allTech.filter((t) => t !== "Chrome Extension" && !prioritized.includes(t));
    return [...prioritized, ...rest].slice(0, 6);
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTech = !techFilter || p.stack.includes(techFilter);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.stack.some((t) => t.toLowerCase().includes(q));
      return matchesTech && matchesQuery;
    });
  }, [query, techFilter]);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Things I've built and shipped."
          tone="pink"
        />

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <TbSearch
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tech..."
              className="glass w-full rounded-full py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-aurora-pink/40"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
              >
                <TbX size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTechFilter(null)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                !techFilter
                  ? "bg-gradient-to-r from-aurora-blue/20 to-aurora-pink/20 border border-aurora-pink/40 text-ink"
                  : "glass text-ink-dim hover:text-ink"
              }`}
            >
              All
            </button>
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setTechFilter(tech === techFilter ? null : tech)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                  techFilter === tech
                    ? "bg-gradient-to-r from-aurora-blue/20 to-aurora-pink/20 border border-aurora-pink/40 text-ink"
                    : "glass text-ink-dim hover:text-ink"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-ink-faint text-sm">
            No projects match that search.
          </p>
        ) : (
          <div className="space-y-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
              >
                <ProjectCard project={project} reverse={i % 2 === 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
