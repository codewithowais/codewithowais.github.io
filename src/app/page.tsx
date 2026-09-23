import Image from "next/image";
import Rail from "@/components/Rail";
import CopyEmail from "@/components/CopyEmail";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import CountUp from "@/components/CountUp";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <div className="shell">
      <div id="scroll-progress" aria-hidden="true" />
      <a href="#main-content" className="skip">Skip to content</a>
      <Rail />
      <Reveal />
      <ScrollProgress />
      <CountUp />
      <CommandPalette />
      <main id="main-content" tabIndex={-1} className="content">
        {/* HERO */}
        <section id="hero" className="sec hero">
          <div className="eyebrow">Staff Software Engineer · Full-Stack + Flutter + AI · Karachi, PK</div>
          <h1>I build products people <span className="u">rely on every day.</span></h1>
          <p className="sub">
            I&apos;m the founding engineer at SimpliEd. I took it from an empty repo to an EdTech
            platform that 25,000+ students, parents and teachers use across 10 schools. I own the tech
            end to end and lead a team of five. For six years I&apos;ve built full products with Angular,
            React, Node.js, .NET and Flutter: the web apps, the mobile apps, and the AWS they run on.
            On weekends I teach, and I&apos;ve trained 1,200+ developers so far.
          </p>
          <div className="facts">
            <div className="fact"><div className="v">6+</div><div className="k">Years shipping</div></div>
            <div className="fact"><div className="v">25k+</div><div className="k">Daily users</div></div>
            <div className="fact"><div className="v">1,200+</div><div className="k">Developers trained</div></div>
          </div>
          <div className="avail">
            Open to full-time &amp; freelance · <b>Gulf relocation (UAE / KSA), sponsorship welcome</b> · remote worldwide · ~30-day notice
          </div>
          <p className="now"><b>Currently:</b> scaling SimpliEd and building Ledgerly in the open.</p>
        </section>

        {/* ABOUT */}
        <section id="about" className="sec">
          <div className="eyebrow">01 / About</div>
          <h2 className="big">Engineer on weekdays, teacher on weekends.</h2>
          <div className="prose">
            <p>I&apos;m a staff software engineer in Karachi. For six years I&apos;ve owned the hard technical calls behind products people actually use: an EdTech platform that serves 25,000+ people, and the mobile apps that took daily paperwork off teachers and parents.</p>
            <p>As the founding engineer at <strong>SimpliEd</strong>, I built the whole platform: the Angular and Node web app, the Flutter apps, and the AWS setup and CI/CD behind them. I lead the team and still write code every week. On weekends I teach Flutter to new developers, and I hold a lesson to the same standard as production code.</p>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="sec">
          <div className="eyebrow">02 / Selected work</div>
          <h2 className="big">Products I&apos;ve shipped end to end.</h2>

          <a className="feat" href="https://simpliedtech.com" target="_blank" rel="noopener noreferrer">
            <div className="feat__media">
              <Image src="/img/projects/simplied-platform.jpg" alt="SimpliEd school-management platform dashboard" fill sizes="(max-width:900px) 100vw, 45vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="feat__body">
              <span className="feat__flag">Flagship</span>
              <h3>SimpliEd — School Management Platform</h3>
              <div className="feat__metric">25,000+ daily users · 10 schools · 4+ years in production</div>
              <p>Attendance, fee invoicing, announcements and a full LMS, across web and mobile. I built the first version alone and set the architecture. Today it runs daily operations for 10 schools and 25,000+ students, parents and teachers.</p>
              <div className="pcard__stack">
                <span className="tag">Angular</span><span className="tag">Node.js</span><span className="tag">Flutter</span><span className="tag">MongoDB</span><span className="tag">AWS</span>
              </div>
            </div>
          </a>

          <details className="casestudy">
            <summary>The hard calls behind SimpliEd</summary>
            <ul>
              <li><b>Node.js + MongoDB over a heavier stack:</b> one language across the API and tooling let a small team ship fast, and the flexible document model fit how differently each school structures its data.</li>
              <li><b>Flutter for one mobile codebase:</b> the attendance and parent apps had to reach every family on iOS and Android without doubling the team.</li>
              <li><b>Docker + GitHub Actions on lean AWS (EC2/RDS/S3):</b> reproducible, low-cost deploys sized to an early-stage budget, not a managed platform&apos;s bill.</li>
            </ul>
          </details>

          <a className="feat feat--reverse" href="https://github.com/codewithowais/expense-tracker" target="_blank" rel="noopener noreferrer">
            <div className="feat__media">
              <Image src="/img/projects/ledgerly-dashboard.jpg" alt="Ledgerly finance app dashboard" fill sizes="(max-width:900px) 100vw, 45vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="feat__body">
              <span className="feat__flag">Open source · AI</span>
              <h3>Ledgerly — Finance App with an AI Assistant</h3>
              <div className="feat__metric">100% offline · open source</div>
              <p>A privacy-first money manager that runs entirely in your browser. Its AI assistant turns receipts and statements into clean transactions, and you can self-host it. No data ever leaves your device.</p>
              <div className="pcard__stack">
                <span className="tag">Next.js 16</span><span className="tag">React 19</span><span className="tag">TypeScript</span><span className="tag">IndexedDB</span>
              </div>
            </div>
          </a>

          <a className="feat" href="https://github.com/codewithowais/ai-study-planner" target="_blank" rel="noopener noreferrer">
            <div className="feat__media">
              <Image src="/img/projects/ai-study-partner.jpg" alt="AI Study Partner — open-source, local-first AI study app" fill sizes="(max-width:900px) 100vw, 45vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="feat__body">
              <span className="feat__flag">Open source · Local-first</span>
              <h3>AI Study Partner — Learn From Your Own Notes</h3>
              <div className="feat__metric">Runs 100% on your machine · your notes never leave it</div>
              <p>Upload your PDFs and notes and it builds a course around them: chapters, plain explanations, quizzes and mock exams, and revision aimed at your weak topics. A local AI companion does the work, so nothing leaves your machine.</p>
              <div className="pcard__stack">
                <span className="tag">Next.js</span><span className="tag">TypeScript</span><span className="tag">Tailwind</span><span className="tag">Local AI</span>
              </div>
            </div>
          </a>

          <div className="cards">
            {[
              { img: "devpath.jpg", t: "DevPath", type: "EdTech", m: "Live algorithm visualizer", d: "A learning hub for early-career devs: roadmaps, a career ladder, and 200+ runnable lessons. Its 'Watch it sort' player animates each algorithm straight from the lesson's own code.", s: ["Next.js", "Tailwind"], href: "https://dev-path-by-codewithowais.vercel.app" },
              { img: "decidr.jpg", t: "Decidr", type: "AI · Next.js", m: "Bias-aware decisions", d: "AI decision assistant that weighs your options, surfaces the trade-offs, and flags where bias is tilting the call.", s: ["Next.js", "Supabase"], href: "https://decidr-black.vercel.app" },
              { img: "cadence.jpg", t: "Cadence", type: "AI video", m: "Prompt-native editing", d: "A prompt-native video editor: describe the cut you want and an AI director edits the footage for you.", s: ["Next.js", "AI"], href: "https://github.com/codewithowais/Cadence" },
              { img: "agentic.jpg", t: "Agentic AI Course", type: "Teaching", m: "16-week course", d: "A hands-on course on building AI agents, from your first tool-using agent to full multi-agent systems.", s: ["LangGraph", "Python"], href: "https://codewithowais.github.io/agentic-ai/" },
              { img: "invoicebook.jpg", t: "InvoiceBook", type: "SaaS · Full-stack", m: "Recurring billing + PDF", d: "Team invoicing: create invoices, attach proof of payment, and auto-generate monthly recurring bills. Roles, reminders, an audit log, and PDF export.", s: ["Next.js", "Postgres"], href: "https://github.com/codewithowais/InvoiceBook" },
              { img: "crispcast.jpg", t: "CrispCast", type: "Desktop · Electron", m: "Offline screen recorder", d: "A cross-platform screen recorder that captures system audio and an isolated mic, cleans up your voice, and merges it into one crisp MP4. Fully offline.", s: ["Electron", "ffmpeg"], href: "https://github.com/codewithowais/CrispCast" },
            ].map((p) => (
              <a className="pcard" key={p.t} href={p.href} target="_blank" rel="noopener noreferrer">
                <div className="pcard__media">
                  <Image src={`/img/projects/${p.img}`} alt={`${p.t} — ${p.type} project`} fill sizes="(max-width:900px) 100vw, 30vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="pcard__body">
                  <div className="pcard__head">
                    <h4>{p.t}</h4>
                    <span className="pcard__type">{p.type}</span>
                  </div>
                  <div className="pcard__metric">{p.m}</div>
                  <p>{p.d}</p>
                  <div className="pcard__stack">{p.s.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
                </div>
              </a>
            ))}
          </div>
          <p className="more">Another 60+ repos on GitHub: Shanghai Trip Assistant, Mini Gantt, ERMS and more. <a href="https://github.com/codewithowais" target="_blank" rel="noopener noreferrer">Browse them ↗</a></p>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="sec">
          <div className="eyebrow">03 / Experience</div>
          <h2 className="big">Where I&apos;ve made an impact.</h2>
          <div className="exp">
            <div className="exp__row">
              <div className="exp__when">Jun 2022 — now · Karachi</div>
              <div>
                <div className="exp__place">SimpliEd</div>
                <div className="exp__title">Staff Software Engineer (Founding Engineer)</div>
                <p className="exp__impact">Took an EdTech platform from an empty repo to <b>25,000+ daily users across 10 schools</b>, and still run it end to end.</p>
                <ul>
                  <li>Set the platform&apos;s <strong>technical direction and coding standards</strong>, and lead architecture and code review for a team of five.</li>
                  <li>Chose the stack it runs on: a Node.js + MongoDB backend and Docker CI/CD on AWS (EC2/RDS/S3), with trade-offs a small team can maintain for years.</li>
                  <li>Shipped the Flutter QR-attendance and parent apps that <strong>replaced manual roll-call</strong>, now the product&apos;s daily touchpoint for thousands of families.</li>
                </ul>
              </div>
            </div>
            <div className="exp__row">
              <div className="exp__when">Aug 2020 — May 2022 · Karachi</div>
              <div>
                <div className="exp__place">Dawateislami-IT</div>
                <div className="exp__title">Associate Software Engineer</div>
                <p className="exp__impact">Modernized a legacy enterprise stack: <b>migrated core services to .NET Core</b> and rebuilt server-rendered modules as a modern Angular SPA.</p>
                <ul>
                  <li>Led the migration from .NET Framework to .NET Core with a 10-person team.</li>
                  <li>Built secure REST APIs on Entity Framework and MS SQL Server, and rebuilt the server-rendered Razor UI as an Angular SPA.</li>
                </ul>
              </div>
            </div>
            <div className="exp__row">
              <div className="exp__when">Jan 2021 — now · Remote</div>
              <div>
                <div className="exp__place">Jawan Pakistan</div>
                <div className="exp__title">Flutter Development Instructor</div>
                <p className="exp__impact">Built a Flutter curriculum from scratch and took <b>1,200+ developers across 11 cohorts</b> from their first widget to a published App Store / Play Store app.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="sec">
          <div className="eyebrow">04 / Stack</div>
          <h2 className="big">The stack I build with.</h2>
          <div className="spec">
            {[
              ["Languages", "core", [["TypeScript", "daily"], ["Dart", "daily"], ["C#", "fluent"], ["Python", "fluent"], ["SQL", "fluent"]]],
              ["Frontend", "web · mobile", [["Angular", "expert"], ["React / Next.js", "expert"], ["Flutter", "expert"], ["React Native", "fluent"]]],
              ["Backend", "apis", [["Node.js", "expert"], [".NET Core", "expert"], ["Django", "fluent"], ["REST / GraphQL", "expert"]]],
              ["Data", "sql · nosql", [["MongoDB", "daily"], ["PostgreSQL", "fluent"], ["MS SQL", "fluent"], ["Redis", "fluent"]]],
              ["Cloud / DevOps", "ship", [["AWS", "daily"], ["Docker", "daily"], ["GitHub Actions", "daily"], ["Linux", "fluent"]]],
              ["Practice", "how i work", [["System design", "core"], ["Code review", "weekly"], ["Mentoring", "weekly"], ["AI-assisted dev", "daily"]]],
            ].map(([h, sub, items]) => (
              <div className="spec__group" key={h as string}>
                <div className="spec__h"><span>{h as string}</span><span>{sub as string}</span></div>
                <ul>
                  {(items as string[][]).map(([k, v]) => (
                    <li key={k}>{k} <span>{v}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* TEACHING */}
        <section id="teaching" className="sec">
          <div className="eyebrow">05 / Teaching</div>
          <h2 className="big">I built the Flutter course 1,200+ developers learned on.</h2>
          <div className="prose">
            <p>As the Flutter instructor at Jawan Pakistan, I designed all 11 cohorts: the syllabus, the projects, and the assessments that take a developer from their first widget to a store-ready app.</p>
            <p>I teach the way I build: project-based, covering state management, API integration, Firebase, and the patterns that separate a demo from a production app.</p>
          </div>
          <div className="facts">
            <div className="fact"><div className="v">1,200+</div><div className="k">Developers trained</div></div>
            <div className="fact"><div className="v">11</div><div className="k">Cohorts delivered</div></div>
            <div className="fact"><div className="v">100%</div><div className="k">Hands-on, project-based</div></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec faq">
          <div className="eyebrow">06 / FAQ</div>
          <h2 className="big">Quick answers.</h2>
          <details>
            <summary>Is he available for freelance or full-time work?</summary>
            <p>Yes. I take on full-time roles and freelance or contract work (remote, hybrid, or on-site), and I&apos;m open to relocating to the Gulf (UAE / KSA) for the right role, with visa sponsorship welcome and around 30 days&apos; notice.</p>
          </details>
          <details>
            <summary>How quickly can he start?</summary>
            <p>Around 30 days&apos; notice for a full-time role. For freelance or contract work I can usually start within a week.</p>
          </details>
          <details>
            <summary>Can he lead a team or own a product solo?</summary>
            <p>Both. At SimpliEd I built the first version alone and now lead a team of five. I set the architecture, review the code, and stay hands-on shipping.</p>
          </details>
          <details>
            <summary>What does he specialize in?</summary>
            <p>Shipping full products end to end: Angular/React and Node.js/.NET on the web, Flutter on mobile, API and cloud architecture on AWS, and AI features on top.</p>
          </details>
          <details>
            <summary>Does he offer training or mentorship?</summary>
            <p>Yes. Flutter courses, team workshops and 1:1 mentorship. I&apos;ve trained 1,200+ developers so far.</p>
          </details>
          <details>
            <summary>Is he open to on-site work in the UAE or Saudi Arabia?</summary>
            <p>Yes. I&apos;m open to relocating on-site to the Gulf with visa sponsorship, and I also work fully remote. Typical notice is around 30 days.</p>
          </details>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec contact">
          <div className="eyebrow">07 / Contact</div>
          <div className="contact__card">
            <div className="contact__lead">
              <h2>Have a role, a project, or a <span className="u">workshop</span> in mind?</h2>
              <p>I read every message and reply within a day or two, whether it&apos;s a full-time role, a freelance project, or a workshop.</p>
              <div className="contact__cta">
                <a className="btn btn--lg" href="mailto:codewithowais@gmail.com">Email me <span aria-hidden="true">→</span></a>
                <a className="btn btn--ghost btn--lg" href="https://wa.me/923169585886" aria-label="Message on WhatsApp">WhatsApp</a>
              </div>
              <p className="contact__avail"><span className="status-dot" aria-hidden="true" /> Open to full-time &amp; freelance · Gulf relocation (UAE / KSA), sponsorship welcome · ~30-day notice</p>
            </div>
            <div className="contact__side">
              <div className="contact__row"><span className="k">Email</span><CopyEmail email="codewithowais@gmail.com" /></div>
              <div className="contact__row"><span className="k">WhatsApp</span><a href="https://wa.me/923169585886" aria-label="WhatsApp +92 316 9585886">+92 316 9585886</a></div>
              <div className="contact__row"><span className="k">Résumé</span><a href="/muhammad-owais-ahmed-resume.pdf" download>Download PDF</a></div>
              <div className="contact__row"><span className="k">Elsewhere</span><span className="contact__links"><a href="https://github.com/codewithowais" target="_blank" rel="noopener noreferrer">GitHub</a> <a href="https://www.linkedin.com/in/codewithowais/" target="_blank" rel="noopener noreferrer">LinkedIn</a></span></div>
              <div className="contact__row"><span className="k">Based in</span><span>Karachi, PK · remote worldwide</span></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
