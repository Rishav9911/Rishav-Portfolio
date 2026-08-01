import { TbBrandGithub, TbBrandLinkedin, TbMail } from "react-icons/tb";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-sm text-ink">rishav.dev</p>
          <p className="mt-1 text-xs text-ink-faint">
            Built with React, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-ink-dim hover:text-aurora-pink transition-colors"
          >
            <TbBrandGithub size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-ink-dim hover:text-aurora-pink transition-colors"
          >
            <TbBrandLinkedin size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-ink-dim hover:text-aurora-pink transition-colors"
          >
            <TbMail size={20} />
          </a>
        </div>

        <p className="text-xs text-ink-faint">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
