// Each role gets a one-line "story" (what it actually was, in plain
// English) plus a handful of metric-driven highlights instead of a
// wall of resume bullets. Full detail still lives in `achievements`
// for anyone who wants to expand it.
export const experience = [
  {
    id: "hashedin",
    company: "HashedIn by Deloitte",
    role: "Software Engineer",
    location: "Bangalore, India",
    duration: "Apr 2026 — Present",
    current: true,
    accent: "pink",
    // Swap this path for the real company logo whenever it's ready —
    // nothing else in the component needs to change.
    logo: "/assets/placeholders/hashedin.png",
    story: "A place where curiosity became my biggest strength—I learned, adapted, and built across AI, backend, cloud, and frontend technologies.",
    stack: ["Python", "FastAPI", "LangGraph", "MCP", "Spark", "Kafka", "Angular"],
    metrics: [
      { value: "50%", label: "faster repo profiling" },
      { value: "6", label: "engineers led" },
      { value: "250+", label: "files per repo analyzed" },
    ],
    achievements: [
      "Led a 6-person team building an agentic repo profiler for AI red-team analysis.",
      "Paired deterministic parsing with specialized agents — less LLM guesswork, more accuracy.",
      "Shipped a LangGraph + MCP virtual patient assistant with memory and human-in-the-loop approval.",
      "Built the Kafka-driven backend for a gamified smartwatch platform, plus 20+ Angular UI modules.",
      "Designed a food-delivery backend on ASP.NET Core — 25+ APIs, 78% test coverage.",
    ],
  },
  {
    id: "karkhana",
    company: "Karkhana Hub",
    role: "Full-Stack Developer Intern",
    location: "Gurugram, India",
    duration: "May — Jul 2025",
    current: false,
    accent: "mint",
    logo: "/assets/placeholders/karkhana.png",
    story: "Wore multiple hats every day, building full-stack features and learning what it takes to ship software in a startup.",
    stack: ["Next.js", "Node.js", "MongoDB", "WordPress"],
    metrics: [
      { value: "20%", label: "faster load times" },
      { value: "30%", label: "fewer early bugs" },
      { value: "20+", label: "models tested" },
    ],
    achievements: [
      "Built a print-time estimator integrating CLI slicing tools.",
      "Shipped membership and Razorpay payment flows for onboarding.",
      "Led end-to-end QA across vendor and admin sides.",
    ],
  },
  {
    id: "spicejet",
    company: "SpiceJet Limited",
    role: "Technical Intern",
    location: "Gurugram, India",
    duration: "Jun — Aug 2024",
    current: false,
    accent: "amber",
    logo: "/assets/placeholders/spicejet.png",
    story: "Where I discovered that a few well-designed backend services can save hours of manual work.",
    stack: ["Java", "Spring Boot", "Hibernate", "MySQL"],
    metrics: [
      { value: "10+", label: "REST endpoints shipped" },
      { value: "5,000+", label: "flight records automated" },
      { value: "50%", label: "less manual processing" },
    ],
    achievements: [
      "Built backend APIs for IROP, a flight-disruption management system.",
      "Automated Excel-to-SQL import for thousands of flight records.",
      "Added filtering that halved manual data processing time.",
    ],
  },
];
