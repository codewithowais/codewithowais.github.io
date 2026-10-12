// Knowledge base for the "Ask about Owais" bot. No model: every answer below is
// written by hand and matched by keyword. To add a project or fact, add an entry
// (or extend `keys`) here. Keep claims identical to the rest of the site:
// "25,000+ users" (never "daily users"), on the founding team (never a title),
// and concept sites / forks are never presented as client or own work.

export type Link = { label: string; href: string };

export type Entry = {
  id: string;
  /** Words or phrases that should trigger this answer. Multi-word phrases score higher. */
  keys: string[];
  answer: string;
  links?: Link[];
};

export const EMAIL = "codewithowais@gmail.com";
export const WHATSAPP = "https://wa.me/923169585886";

export const SUGGESTIONS = [
  "What is SimpliEd?",
  "What's his tech stack?",
  "Is he available to hire?",
  "Show me his projects",
  "How can I contact him?",
];

export const FALLBACK: Entry = {
  id: "fallback",
  keys: [],
  answer:
    "I don't have an answer for that one, and I'd rather say so than guess. Try asking about his projects, experience, stack or availability, or ask Owais directly.",
  links: [
    { label: "Email Owais", href: `mailto:${EMAIL}` },
    { label: "WhatsApp", href: WHATSAPP },
  ],
};

export const GREETING =
  "Hi, I'm the little Q&A bot on Owais's portfolio. I'm not an AI model: I answer from what's written on this site. Ask me about his work, experience, stack or availability.";

export const ENTRIES: Entry[] = [
  {
    id: "greet",
    keys: ["hi", "hello", "hey", "salam", "assalam", "assalamualaikum", "good morning", "good evening", "yo"],
    answer: "Hello! Ask me anything about Owais: his projects, experience, tech stack, or whether he's free to work.",
  },
  {
    id: "thanks",
    keys: ["thanks", "thank you", "thx", "shukriya", "cheers", "great", "awesome", "nice"],
    answer: "Happy to help. If you'd like to talk to Owais himself, email is the fastest way.",
    links: [{ label: "Email Owais", href: `mailto:${EMAIL}` }],
  },
  {
    id: "about",
    keys: ["who", "about", "introduce", "yourself", "owais", "codewithowais", "background", "summary"],
    answer:
      "Muhammad Owais Ahmed (codewithowais) is a Staff Software Engineer in Karachi, Pakistan with 6 years of experience. He's at SimpliEd, an EdTech platform used by 25,000+ people across 10 schools, where he's been on the founding team since day one. He's also Lead Trainer at Jawan Pakistan, where he built the Flutter curriculum and has trained 1,200+ developers.",
    links: [{ label: "See his work", href: "#work" }],
  },
  {
    id: "available",
    keys: ["available", "availability", "hire", "hiring", "freelance", "contract", "open to work", "job", "opportunity", "opportunities", "full time", "full-time", "recruit", "work with", "looking for"],
    answer:
      "Yes. He's open to full-time roles and to freelance or contract work (remote, hybrid or on-site). He's also open to relocating to the Gulf (UAE and Saudi Arabia), with visa sponsorship welcome.",
    links: [
      { label: "Email Owais", href: `mailto:${EMAIL}` },
      { label: "WhatsApp", href: WHATSAPP },
    ],
  },
  {
    id: "notice",
    keys: ["notice", "start", "join", "how soon", "how quickly", "when can", "joining", "immediately"],
    answer:
      "Around 30 days' notice for a full-time role. For freelance or contract work he can usually start within a week.",
  },
  {
    id: "contact",
    keys: ["contact", "email", "mail", "reach", "get in touch", "whatsapp", "phone", "number", "call", "message", "linkedin", "talk to"],
    answer:
      "Email is best: codewithowais@gmail.com. You can also message him on WhatsApp at +92 316 9585886 or connect on LinkedIn.",
    links: [
      { label: "Email", href: `mailto:${EMAIL}` },
      { label: "WhatsApp", href: WHATSAPP },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/codewithowais/" },
    ],
  },
  {
    id: "resume",
    keys: ["resume", "résumé", "cv", "curriculum", "pdf", "download"],
    answer: "Here's his résumé as a PDF.",
    links: [{ label: "Download résumé (PDF)", href: "/muhammad-owais-ahmed-resume.pdf" }],
  },
  {
    id: "location",
    keys: ["where", "location", "based", "live", "city", "country", "karachi", "pakistan", "relocate", "relocation", "gulf", "uae", "dubai", "saudi", "ksa", "remote", "visa", "timezone"],
    answer:
      "He's based in Karachi, Pakistan, and works remotely with teams worldwide. He's also open to relocating to the Gulf, including Dubai (UAE) and Saudi Arabia, with visa sponsorship welcome.",
  },
  {
    id: "experience",
    keys: ["experience", "years", "career", "history", "worked", "companies", "employer", "roles", "senior", "staff", "designation", "title"],
    answer:
      "6 years of experience. Staff Software Engineer at SimpliEd (Jun 2022 to now; he joined as a Software Engineer and grew to Senior, then Staff). Lead Trainer at Jawan Pakistan (since 2021). Before that, Associate Software Engineer at Dawateislami-IT (2020 to 2022).",
    links: [{ label: "Experience section", href: "#experience" }],
  },
  {
    id: "simplied",
    keys: ["simplied", "simpli", "school", "schools", "edtech", "education platform", "founding", "founder", "attendance", "25000", "25,000", "users"],
    answer:
      "SimpliEd is a school-management platform (web plus Flutter mobile apps) used by 25,000+ people across 10 schools. Owais has been on its founding team since day one. He built the first version alone, designed the Node.js and MongoDB backend, built the Angular web app and the Flutter QR-attendance and parent apps, runs the AWS infrastructure and CI/CD, and now leads architecture and code review for a team of 5 to 6 engineers.",
    links: [{ label: "simpliedtech.com", href: "https://simpliedtech.com" }],
  },
  {
    id: "jawan",
    keys: ["jawan", "teach", "teaching", "trainer", "instructor", "mentor", "mentorship", "course", "workshop", "students", "train", "curriculum", "cohort"],
    answer:
      "He's Lead Trainer at Jawan Pakistan. He designed the full Flutter curriculum and has trained 1,200+ developers across 11 cohorts, from their first widget to published App Store and Play Store apps. He also does workshops and 1:1 mentorship.",
    links: [{ label: "Teaching section", href: "#teaching" }],
  },
  {
    id: "dawateislami",
    keys: ["dawateislami", "dawat", "dotnet", ".net", "net core", "razor", "erms"],
    answer:
      "At Dawateislami-IT (Aug 2020 to May 2022) he was an Associate Software Engineer. He migrated core services from .NET Framework to .NET Core, moved server-rendered Razor modules to an Angular SPA, and built secure REST APIs with Entity Framework on MS SQL Server. ERMS, an enterprise resource-management app, came from that work (internal, so there's no public link).",
  },
  {
    id: "education",
    keys: ["education", "degree", "university", "study", "studied", "graduate", "college", "qualification", "bs", "computer science", "virtual"],
    answer:
      "He's doing a BS in Computer Science at Virtual University of Pakistan (2023 to 2027, in progress). Before that, an Intermediate in Pre-Engineering from Superior Govt College, Karachi.",
  },
  {
    id: "stack",
    keys: ["stack", "tech", "technology", "technologies", "skills", "skill", "tools", "languages", "language", "frameworks", "framework", "typescript", "javascript", "python", "dart", "database", "databases", "mongodb", "postgres", "sql", "aws", "docker", "node", "nodejs", "angular", "react", "nextjs", "next.js"],
    answer:
      "Languages: TypeScript, JavaScript, Dart, C#, Python, SQL. Frontend: Angular, React, Next.js, Flutter, React Native, Tailwind. Backend: Node.js (Express, NestJS), .NET Core, Django, REST, GraphQL. Data: MongoDB, MS SQL Server, PostgreSQL, MySQL, Redis, Firebase. Cloud: AWS (EC2, S3, RDS, Lambda), Docker, GitHub Actions.",
    links: [{ label: "Stack section", href: "#skills" }],
  },
  {
    id: "flutter",
    keys: ["flutter", "mobile", "android", "ios", "app store", "play store", "cross platform", "cross-platform"],
    answer:
      "Flutter is a core strength. He ships production Flutter apps (SimpliEd's QR-attendance and parent apps are used by thousands of families) and he built and teaches the Flutter curriculum at Jawan Pakistan. Side project: Shanghai Trip Assistant, an offline-first Flutter app with on-device translation.",
  },
  {
    id: "ai",
    keys: ["ai", "llm", "gpt", "chatgpt", "claude", "gemini", "machine learning", "agents", "agent", "artificial", "automation", "prompt", "ai projects", "ai work", "ai experience"],
    answer:
      "He builds AI features into real products. Examples: Ledgerly has an AI finance assistant, Decidr is an AI decision assistant, Cadence is a prompt-native AI video editor, AI Study Partner runs a local AI companion, and AI Prompt Builder is a free tool with 60+ prompt templates. He also wrote a 16-week hands-on course on building AI agents.",
    links: [{ label: "AI Prompt Builder", href: "https://codewithowais.github.io/flutter-prompt-builder/" }],
  },
  {
    id: "projects",
    keys: ["projects", "project", "portfolio", "work", "built", "build", "made", "shipped", "examples", "apps", "demo", "demos", "showcase", "best"],
    answer:
      "The big ones are SimpliEd (school platform), Ledgerly (offline-first finance app with AI) and AI Study Partner. After that: AI Prompt Builder, DevPath, Decidr, Cadence, Tic-Tac-Toe Live, InvoiceBook, Zulaal, CrispCast, the Agentic AI course and more. Ask about any of them by name.",
    links: [
      { label: "Selected work", href: "#work" },
      { label: "All on GitHub", href: "https://github.com/codewithowais" },
    ],
  },
  {
    id: "ledgerly",
    keys: ["ledgerly", "expense", "finance", "budget", "money", "tracker", "pwa", "offline"],
    answer:
      "Ledgerly is an open-source, privacy-first finance app: an offline-first PWA with an AI assistant. Built with Next.js 16, React 19, TypeScript, Tailwind, IndexedDB (Dexie) and optional Neon Postgres. He's building it in the open.",
    links: [
      { label: "Live demo", href: "https://expense-tracker-ochre-one-65.vercel.app" },
      { label: "Code", href: "https://github.com/codewithowais/expense-tracker" },
    ],
  },
  {
    id: "promptbuilder",
    keys: ["prompt builder", "prompts", "templates", "prompt tool", "prompt-builder"],
    answer:
      "AI Prompt Builder is a free, live tool with no sign-up. It builds production-ready AI prompts from 60+ fill-in-the-blank templates: code prompts for 17 frameworks, chat personas for Claude, ChatGPT and Gemini, plus image, video and voice models and a multi-model context-handoff wizard.",
    links: [{ label: "Try it", href: "https://codewithowais.github.io/flutter-prompt-builder/" }],
  },
  {
    id: "studypartner",
    keys: ["study", "study partner", "ai study partner", "quiz", "quizzes", "exam", "pdf notes", "planner"],
    answer:
      "AI Study Partner is an open-source, local-first study app. You upload your own PDFs or notes and it builds a course: chapters, plain-language explanations, quizzes and mock exams, weak-topic revision and progress tracking, with a local AI companion so your data never leaves your machine. Next.js, TypeScript, Tailwind, Docker.",
    links: [{ label: "Code", href: "https://github.com/codewithowais/ai-study-planner" }],
  },
  {
    id: "tictactoe",
    keys: ["tic tac toe", "tic-tac-toe", "tictactoe", "game", "games", "multiplayer", "convex", "webrtc", "leaderboard", "voice chat"],
    answer:
      "Tic-Tac-Toe Live is real-time multiplayer for 2 to 4 players: shareable rooms, spectators, peer-to-peer voice chat (WebRTC), computer opponents, a weekly and all-time leaderboard, and an admin panel. Next.js 16, React 19, Tailwind and a Convex real-time backend.",
    links: [
      { label: "Play it", href: "https://tictactoe-live.vercel.app" },
      { label: "Code", href: "https://github.com/codewithowais/tic-tac-toe" },
    ],
  },
  {
    id: "decidr",
    keys: ["decidr", "decision", "decisions"],
    answer: "Decidr is an AI decision-making assistant, built with Next.js, TypeScript and Supabase.",
    links: [
      { label: "Live", href: "https://decidr-black.vercel.app" },
      { label: "Code", href: "https://github.com/codewithowais/Decidr" },
    ],
  },
  {
    id: "cadence",
    keys: ["cadence", "video", "video editor", "editor"],
    answer: "Cadence is a prompt-native AI video editor built with Next.js and TypeScript.",
    links: [
      { label: "Live", href: "https://web-theta-five-lnuv05pt7e.vercel.app" },
      { label: "Code", href: "https://github.com/codewithowais/Cadence" },
    ],
  },
  {
    id: "devpath",
    keys: ["devpath", "dev path", "roadmap", "roadmaps", "learning platform", "sorting", "visualizer", "lessons"],
    answer:
      "DevPath is a beginner-friendly learning and career platform: roadmaps, a career ladder and 200+ runnable lessons. Its signature feature is a \"Watch it sort\" visualizer that animates each sorting algorithm step by step from the lesson's own code. Next.js, TypeScript, Tailwind.",
    links: [
      { label: "Live", href: "https://dev-path-by-codewithowais.vercel.app" },
      { label: "Code", href: "https://github.com/codewithowais/dev-path" },
    ],
  },
  {
    id: "invoicebook",
    keys: ["invoicebook", "invoice", "invoices", "invoicing", "billing", "saas"],
    answer:
      "InvoiceBook is a full-stack invoicing SaaS for a small team: invoices, manual payment tracking with proof attachments, auto-generated monthly recurring bills, PDF invoices, Admin and Staff roles, payment reminders, CSV export and an audit log. Next.js 16, Neon Postgres with Drizzle, Better Auth.",
    links: [{ label: "Code", href: "https://github.com/codewithowais/InvoiceBook" }],
  },
  {
    id: "zulaal",
    keys: ["zulaal", "water", "bottle", "bottles", "three.js", "threejs", "3d", "firebase"],
    answer:
      "Zulaal is a brand website for a premium Pakistani water company, with a three.js 3D hero, a product range, custom-labelled bottle orders and a React plus Firebase admin panel for quotes, messages and products.",
    links: [
      { label: "Live", href: "https://zulaal.vercel.app" },
      { label: "Code", href: "https://github.com/codewithowais/zulaal" },
    ],
  },
  {
    id: "concepts",
    keys: ["umbra", "aura", "aesthetics", "clinic", "car", "tint", "tinting", "detailing", "concept", "concepts"],
    answer:
      "Those two are concept sites, not client work: Umbra Auto Studio (a car tinting and detailing studio, Next.js) and Aura Aesthetics (a London aesthetic clinic with treatment menu and booking, React and Vite). They show his front-end and UX range.",
    links: [
      { label: "Umbra Auto Studio", href: "https://umbra-auto-studio.vercel.app" },
      { label: "Aura Aesthetics", href: "https://aesthic-clinic-demo.vercel.app" },
    ],
  },
  {
    id: "crispcast",
    keys: ["crispcast", "recorder", "screen", "recording", "electron", "desktop", "ffmpeg"],
    answer:
      "CrispCast is a cross-platform desktop screen recorder (Electron and ffmpeg). It captures the screen at native resolution with system audio and an isolated mic track, denoises the voice and merges everything into one clean MP4, fully offline. macOS, Windows and Linux.",
    links: [
      { label: "Download", href: "https://codewithowais.github.io/CrispCast" },
      { label: "Code", href: "https://github.com/codewithowais/CrispCast" },
    ],
  },
  {
    id: "agentic",
    keys: ["agentic", "langgraph", "agents course", "ai course", "ai agents"],
    answer: "The Agentic AI Course is a 16-week hands-on course on building AI agents with LangGraph, Python and LLMs.",
    links: [
      { label: "Course", href: "https://codewithowais.github.io/agentic-ai/" },
      { label: "Code", href: "https://github.com/codewithowais/agentic-ai" },
    ],
  },
  {
    id: "shanghai",
    keys: ["shanghai", "china", "chinese", "translation", "translate", "travel", "trip", "ml kit"],
    answer:
      "Shanghai Trip Assistant is an offline-first Flutter travel app with on-device English-to-Chinese translation (ML Kit), built with Flutter, Hive and Riverpod.",
    links: [{ label: "Code", href: "https://github.com/codewithowais/china-trip-app" }],
  },
  {
    id: "smallprojects",
    keys: ["gantt", "mini gantt", "olx", "marketplace", "classifieds", "mern", "smaller", "other projects", "more projects"],
    answer:
      "Smaller ones: Mini Gantt (a dependency-free drag-and-resize Gantt chart tool) and an OLX Clone (a MERN classifieds marketplace). There are 60+ more repositories on his GitHub.",
    links: [
      { label: "Mini Gantt", href: "https://mini-gantt-chart.vercel.app" },
      { label: "GitHub", href: "https://github.com/codewithowais" },
    ],
  },
  {
    id: "fork",
    keys: ["moneyprinterturbo", "money printer", "fork", "forked"],
    answer:
      "MoneyPrinterTurbo on his GitHub is a fork of someone else's open-source project, so it isn't his work and he doesn't present it as such. His own projects are the ones listed on this site.",
    links: [{ label: "Selected work", href: "#work" }],
  },
  {
    id: "github",
    keys: ["github", "git", "repos", "repositories", "repo", "open source", "open-source", "source code"],
    answer: "His code is on GitHub, with 60+ repositories. Several projects here are open source.",
    links: [{ label: "github.com/codewithowais", href: "https://github.com/codewithowais" }],
  },
  {
    id: "leadership",
    keys: ["lead", "leader", "leadership", "team", "manage", "architecture", "architect", "code review", "solo", "own a product"],
    answer:
      "Both. At SimpliEd he built the first version alone and now leads a team of 5 to 6 engineers: he sets the architecture, reviews code and stays hands-on shipping.",
  },
  {
    id: "rates",
    keys: ["rate", "rates", "salary", "price", "pricing", "cost", "charge", "budget for", "expected", "compensation", "quote"],
    answer:
      "Rates and salary depend on the scope, so he talks about them directly rather than listing numbers here. Send a short note about what you need and he'll reply.",
    links: [
      { label: "Email Owais", href: `mailto:${EMAIL}` },
      { label: "WhatsApp", href: WHATSAPP },
    ],
  },
  {
    id: "site",
    keys: ["site", "website", "portfolio built", "this site", "built with", "made with"],
    answer:
      "This site is a static Next.js 16 app (React 19, TypeScript, Tailwind v4) with plain CSS for the motion, no animation libraries, deployed on GitHub Pages. Press ⌘K (or /) for the command menu.",
  },
  {
    id: "bot",
    keys: ["bot", "chatbot", "you", "model", "real ai", "are you"],
    answer:
      "I'm a small rule-based Q&A bot, not an AI model. I match your question against answers Owais wrote about himself, so I only know what's on this site. For anything else, he's one email away.",
    links: [{ label: "Email Owais", href: `mailto:${EMAIL}` }],
  },
];

const STOP = new Set(
  "a an the is are was were be been do does did can could would should will of to in on at for and or but with about his he him her she it its this that these those what whats which whom how why when where me my i you your tell please show give any some".split(" "),
);

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9.+#À-ɏ\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Generic words that appear in many questions: they count, but never beat a topic word.
const WEAK = new Set(["who", "about", "work", "built", "build", "made", "you", "team", "lead", "site", "tech", "project", "projects", "live", "where", "start"]);

const stem = (w: string) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);

/** Returns the best-matching entry, or the fallback when nothing scores high enough. */
export function answerFor(question: string): Entry {
  const q = norm(question);
  if (!q) return FALLBACK;
  const padded = ` ${q} `;
  const tokens = q.split(" ").filter((t) => t && !STOP.has(t)).map(stem);
  const tokenSet = new Set(tokens);

  let best: Entry | null = null;
  let bestScore = 0;

  for (const e of ENTRIES) {
    let score = 0;
    for (const raw of e.keys) {
      const k = norm(raw);
      if (!k) continue;
      if (k.includes(" ")) {
        // multi-word phrase: must appear as written
        if (padded.includes(` ${k} `)) score += 4 * k.split(" ").length;
      } else if (tokenSet.has(stem(k))) {
        score += WEAK.has(k) ? 1.5 : 3;
      }
    }
    // greetings/thanks should not outrank a real topic hiding in the same message
    if ((e.id === "greet" || e.id === "thanks") && tokens.length > 2) score *= 0.3;
    // ties go to the later (more specific) entry
    if (score > 0 && score >= bestScore) {
      best = e;
      bestScore = score;
    }
  }

  return best && bestScore >= 1.5 ? best : FALLBACK;
}

/** Suggested next questions shown after an answer, keyed by entry id. */
export const FOLLOWUPS: Record<string, string[]> = {
  about: ["What is SimpliEd?", "What's his tech stack?", "Is he available to hire?"],
  available: ["How can I contact him?", "How soon can he start?", "Can he relocate to the Gulf?"],
  contact: ["Send me his résumé", "Is he available to hire?", "Where is he based?"],
  resume: ["What's his experience?", "Show me his projects", "How can I contact him?"],
  experience: ["What is SimpliEd?", "Does he teach?", "What's his education?"],
  simplied: ["Can he lead a team?", "Does he know Flutter?", "Show me his projects"],
  jawan: ["What's his experience?", "Does he know Flutter?", "How can I contact him?"],
  stack: ["Does he know Flutter?", "Any AI projects?", "Show me his projects"],
  flutter: ["What is SimpliEd?", "Does he teach?", "Show me his projects"],
  ai: ["Tell me about Ledgerly", "What is AI Prompt Builder?", "What is AI Study Partner?"],
  projects: ["Tell me about Ledgerly", "What is DevPath?", "Any AI projects?"],
  ledgerly: ["What's his tech stack?", "Any AI projects?", "Show me his projects"],
  promptbuilder: ["Any AI projects?", "Tell me about Ledgerly", "Show me his projects"],
  location: ["Is he available to hire?", "How soon can he start?", "How can I contact him?"],
  leadership: ["What is SimpliEd?", "What's his experience?", "Is he available to hire?"],
  fallback: ["Show me his projects", "What's his tech stack?", "How can I contact him?"],
};
