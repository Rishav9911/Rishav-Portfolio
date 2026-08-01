export const projects = [
  {
    id: "pdf-xtractify",
    name: "PDF Xtractify",
    hook: "Teaching machines to read a 100-page PDF like a human skims it.",
    date: "July 2025",
    accent: "blue",
    // Swap this path for a real screenshot whenever it's ready —
    // nothing else in the component needs to change.
    image: "/assets/placeholders/pdf-xtractify.svg",
    tags: ["AI", "Document Understanding"],
    stack: ["Python", "PaddleOCR", "PyMuPDF", "Sentence Transformers", "Docker"],
    problem:
      "Unstructured PDFs hide their own hierarchy — headings and reading order aren't recoverable from raw text alone.",
    solution:
      "A layout-aware pipeline that extracts hierarchical outlines from complex PDFs at 95%+ heading accuracy.",
    architecture:
      "Five specialized agents — structure, visual, text, hierarchy, validation — pass results downstream, powered by PaddleOCR's PP-DocLayout-L and Sentence Transformers.",
    challenges:
      "Making layout-aware OCR fast on CPU alone: 4-way parallelism and model reuse got it to 0.22 pages/sec, no GPU required.",
    impact: [
      { value: "95%+", label: "heading accuracy" },
      { value: "100+", label: "pages handled" },
      { value: "0.22", label: "pages/sec, CPU-only" },
    ],
    links: { github: "https://github.com/Rishav9911/PDF-Extractify", caseStudy: "#" },
  },
  {
    id: "aplica-plus",
    name: "Aplica+",
    hook: "An AI co-pilot for the most tedious part of job hunting.",
    date: "March 2025",
    accent: "pink",
    image: "/assets/placeholders/aplica-plus.svg",
    tags: ["AI", "Chrome Extension", "RAG"],
    stack: ["Python", "Flask", "Streamlit", "MongoDB", "Ollama", "Hugging Face", "Chrome Extension"],
    problem:
      "Tailoring applications, tracking outreach, and rehearsing interviews eats hours with no single tool covering the loop.",
    solution:
      "A RAG-powered job assistant that matches roles, auto-fills applications, and preps you for interviews.",
    architecture:
      "Flask/Streamlit backend running RAG job-matching, a LLaMA-7b Chrome extension for in-browser autofill, Gmail API outreach, and Whisper + LLaMA interview scoring.",
    challenges:
      "Keeping a 7B local model responsive inside a browser extension while it writes personalized cover letters on the fly.",
    impact: [
      { value: "500/day", label: "outreach emails sent" },
      { value: "30+/wk", label: "applications automated" },
      { value: "60%", label: "less review time" },
    ],
    links: { github: "https://github.com/Rishav9911/Aplica", caseStudy: "#" },
  },
  {
    id: "medminion",
    name: "MedMinion",
    hook: "Lightweight clinic software that gives a first read on symptoms.",
    date: "September 2024",
    accent: "mint",
    image: "/assets/placeholders/medminion.svg",
    tags: ["Full-Stack", "Healthcare"],
    stack: ["Python", "Flask", "React", "Node.js", "Express.js", "MongoDB"],
    problem:
      "Small clinics need appointment scheduling and a first-pass symptom read, without enterprise EHR overhead.",
    solution:
      "A full-stack clinic system with automated scheduling, disease identification, and medicine recommendations.",
    architecture:
      "React over an Express/Node API, with a MedBERT NER model plus weighted symptom logic ranking likely diagnoses, behind role-based auth.",
    challenges:
      "Turning noisy, free-text symptoms into ranked, clinically reasonable diagnoses without overfitting to common cases.",
    impact: [
      { value: "+26%", label: "diagnosis accuracy" },
      { value: "10+", label: "trial accounts tested" },
    ],
    links: { github: "https://github.com/Rishav9911/MedMinion", caseStudy: "#" },
  },
  {
    id: "iot-malware",
    name: "IoT Malware Detector",
    hook: "Catching malware across a million rows of noisy IoT traffic.",
    date: "November 2024",
    accent: "amber",
    image: "/assets/placeholders/iot-malware.svg",
    tags: ["Machine Learning", "Security"],
    stack: ["Python", "Pandas", "Scikit-Learn", "XGBoost"],
    problem:
      "Telling benign traffic from 10 malware classes across devices is a high-dimensional, imbalanced problem.",
    solution:
      "A multiclass XGBoost classifier spotting benign activity vs. 10 malware classes across 3 IoT devices.",
    architecture:
      "IQR-based outlier handling, class balancing, and recursive feature elimination narrowed 115 features to 10 before training.",
    challenges:
      "Generalizing across devices without overfitting to the dominant benign class in a heavily imbalanced 1M-row dataset.",
    impact: [
      { value: "70%", label: "accuracy, 11 classes" },
      { value: "1M", label: "entries analyzed" },
      { value: "68.5%", label: "after fine-tuning" },
    ],
    links: { github: "https://github.com/Rishav9911/IoT-Malware-Detection-Models", caseStudy: "#" },
  },
];

export const allTech = [...new Set(projects.flatMap((p) => p.stack))].sort();
