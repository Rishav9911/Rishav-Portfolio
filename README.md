# rishav.dev — Portfolio

A premium, single-page portfolio for an AI Engineer / Software Engineer, built with React (Vite), Tailwind CSS, and Framer Motion. Content is sourced entirely from the two resume versions provided, merged and de-duplicated.

## Design system (v2 — redesign)

- **Palette** — a multi-hue "aurora" system instead of one shade of blue: electric blue, indigo, violet, pink, coral, amber, mint, and cyan, each section carrying its own accent (see `src/utils/accents.js`). Gradient text, gradient borders, and colored glows replace flat blue everywhere.
- **Type** — Space Grotesk for display/headings, Inter for body copy, JetBrains Mono for tags/metrics, and Caveat (handwritten-style) for the personality "sticky note" touches.
- **Layout** — deliberately broken grid: an alternating zigzag experience timeline, alternating full-width project cards instead of a uniform grid, an offset/rotated note card in About, staggered-height achievement cards.
- **Interactions** — cursor-follow gradient glow, magnetic buttons, 3D tilt project panels, orbiting skill-bubble constellations (hover to pause and inspect), morphing gradient blobs, floating particles — all respecting `prefers-reduced-motion`.
- **Copy** — trimmed from resume-bullet paragraphs to one-line "stories" per role/project, with metrics surfaced as big numbers instead of buried in sentences, plus a small Fun Facts section for personality.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

## Configuring the contact form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/) so it works with no backend.

1. Create a free EmailJS account, an email service, and a template with `from_name`, `from_email`, and `message` variables.
2. Copy `.env.example` to `.env` and fill in your IDs:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Restart the dev server. Until this is set, the form shows a friendly fallback pointing to the direct email address instead of failing silently.

## Things to fill in before you ship this

- **`src/data/profile.js`** — the resume PDFs' GitHub/LinkedIn/LeetCode icons didn't carry real hyperlinks in the extracted text, so those three URLs are placeholders (`YOUR_USERNAME`). Swap in your real profile links.
- **`public/resume/`** — add your resume as `Rishav_Sachdeva_Resume.pdf`. The Hero and Contact "Resume" buttons already link to `/resume/Rishav_Sachdeva_Resume.pdf`.
- **Project links** — `src/data/projects.js` has `github` and `caseStudy` links set to `#` for all four projects (no live demos exist for any of them, per your note). Point `github` at each repo when ready.
- **OG/social image & favicon** — `public/favicon.svg` is the Vite default; swap it for your own mark.

## Folder structure

```
src/
  components/   # Navbar, Footer, GlassCard, ProjectCard, ScrollProgress, etc.
  sections/     # Hero, About, Projects, Experience, Skills, Achievements, Education, Contact
  data/         # All resume content — edit here, not in components
  hooks/        # useTheme, useActiveSection, useScrollProgress
  index.css     # Design tokens (CSS variables) + Tailwind layers
```

Editing content (a new project, a role, a skill) only ever requires touching a file in `src/data/` — no JSX changes needed.

## Deployment

This is a static frontend-only app. Any static host works:

- **Vercel / Netlify** — connect the repo, build command `npm run build`, output directory `dist`, and add the three `VITE_EMAILJS_*` environment variables in the host's dashboard.
- **GitHub Pages** — run `npm run build` and deploy the `dist/` folder (add a `base` path in `vite.config.js` if hosting under a subpath).

## Notes on scope

Original build (v1) covered Phases 1–6: design system, scaffolding, all eight sections, EmailJS-backed contact form with project search/filtering, animations, dark/light mode, loading screen, scroll progress, back-to-top.

This redesign pass (v2) keeps that content and functionality intact but reworks the visual language end to end: a richer multi-hue palette, story-driven copy instead of resume bullets, an orbiting skill visualization, immersive alternating project cards, a zigzag experience timeline, and more interaction (cursor glow, magnetic buttons, tilt cards, morphing backgrounds). Production build verified to compile cleanly after the redesign.
