import Image from "next/image";
import Rail from "@/components/Rail";

export default function Home() {
  return (
    <div className="shell">
      <Rail />
      <main className="content">
        {/* HERO */}
        <section id="hero" className="sec hero">
          <div className="eyebrow">Full-Stack · Flutter · AI — Karachi, PK</div>
          <h1>I build products that real schools <span className="u">run on every day.</span></h1>
          <p className="sub">
            Founding engineer at SimpliEd — an EdTech platform used by 25,000+ students, parents and
            teachers. Six years shipping across Angular, React, Node.js, .NET and Flutter, and I train
            the developers who build them.
          </p>
          <div className="facts">
            <div className="fact"><div className="v">6+</div><div className="k">Years shipping</div></div>
            <div className="fact"><div className="v">25k+</div><div className="k">Users served</div></div>
            <div className="fact"><div className="v">1,200+</div><div className="k">Students taught</div></div>
          </div>
          <div className="avail">Open to relocation — <b>Gulf / UAE / KSA</b> · visa sponsorship · <b>~30 days notice</b> · remote worldwide</div>
        </section>

        {/* ABOUT */}
        <section id="about" className="sec">
          <div className="eyebrow">About</div>
          <h2 className="big">Engineer on weekdays, teacher on weekends.</h2>
          <div className="prose">
            <p>I&apos;m a software engineer in Karachi. For six years I&apos;ve turned ideas into products people use every day — from an EdTech platform serving thousands to mobile apps that took real paperwork off teachers&apos; and parents&apos; hands.</p>
            <p>As founding engineer at <strong>SimpliEd</strong> I own the full stack — the Angular/Node web app, the Flutter apps, the AWS infrastructure and CI/CD — and lead architecture and code review. On weekends I teach Flutter; I care as much about clear explanations as clean architecture.</p>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="sec">
          <div className="eyebrow">Selected work</div>

          <a className="feat" href="https://simpliedtech.com" target="_blank" rel="noopener noreferrer">
            <div className="feat__media">
              <Image src="/img/projects/simplied-platform.png" alt="SimpliEd platform" fill sizes="(max-width:900px) 100vw, 45vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="feat__body">
              <span className="feat__flag">Flagship</span>
              <h3>SimpliEd — School Management Platform</h3>
              <p>Attendance, fee invoicing, announcements and a full LMS, on web and mobile. Built end to end since day one; runs the daily operations of 10 schools for 25,000+ people.</p>
              <div className="pcard__stack">
                <span className="tag">Angular</span><span className="tag">Node.js</span><span className="tag">Flutter</span><span className="tag">MongoDB</span><span className="tag">AWS</span>
              </div>
            </div>
          </a>

          <div className="cards">
            {[
              { img: "ledgerly-dashboard.jpg", t: "Ledgerly", type: "Open source · AI", d: "Privacy-first money manager with an AI assistant — runs fully offline, reads receipts and statements.", s: ["Next.js 16", "React 19", "IndexedDB"], href: "https://github.com/codewithowais/expense-tracker" },
              { img: "decidr.jpg", t: "Decidr", type: "AI · Next.js", d: "AI decision assistant — weigh options, see trade-offs, sensitivity, and where bias tilts the call.", s: ["Next.js", "Supabase"], href: "https://decidr-black.vercel.app" },
              { img: "cadence.jpg", t: "Cadence", type: "AI video", d: "A prompt-native video editor: describe the edit and an AI director cuts your footage.", s: ["Next.js", "AI"], href: "https://github.com/codewithowais/Cadence" },
              { img: "devpath.jpg", t: "DevPath", type: "EdTech", d: "Learning hub for early-career devs: roadmaps, a career ladder, 200+ runnable lessons.", s: ["Next.js", "Tailwind"], href: "https://dev-path-by-codewithowais.vercel.app" },
              { img: "agentic.jpg", t: "Agentic AI Course", type: "Teaching", d: "A 16-week hands-on course on building AI agents, from first tool-using agent to multi-agent systems.", s: ["LangGraph", "Python"], href: "https://codewithowais.github.io/agentic-ai/" },
            ].map((p) => (
              <a className="pcard" key={p.t} href={p.href} target="_blank" rel="noopener noreferrer">
                <div className="pcard__media">
                  <Image src={`/img/projects/${p.img}`} alt={p.t} fill sizes="(max-width:900px) 100vw, 30vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="pcard__body">
                  <div className="pcard__head">
                    <h4>{p.t}</h4>
                    <span className="pcard__type">{p.type}</span>
                  </div>
                  <p>{p.d}</p>
                  <div className="pcard__stack">{p.s.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
                </div>
              </a>
            ))}
          </div>
          <p className="more">Plus Shanghai Trip Assistant, Mini Gantt, ERMS, and 60+ more — <a href="https://github.com/codewithowais" target="_blank" rel="noopener noreferrer">see all on GitHub ↗</a></p>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="sec">
          <div className="eyebrow">Experience</div>
          <div className="exp">
            <div className="exp__row">
              <div className="exp__when">Jun 2022 — now<br />Karachi · On-site</div>
              <div>
                <div className="exp__place">SimpliEd</div>
                <div className="exp__title">Senior Software Engineer · Founding Engineer</div>
                <ul>
                  <li>Grew SimpliEd from zero to 25,000+ users across 10 institutions, building the platform end to end.</li>
                  <li>Retired manual roll-call by shipping the Flutter QR-attendance and parent apps — now the product&apos;s daily touchpoint.</li>
                  <li>Architected the Node.js + MongoDB backend and automated CI/CD on AWS; set technical direction for a team of 5–6.</li>
                </ul>
              </div>
            </div>
            <div className="exp__row">
              <div className="exp__when">Aug 2020 — May 2022<br />Karachi · On-site</div>
              <div>
                <div className="exp__place">Dawateislami-IT</div>
                <div className="exp__title">Associate Software Engineer</div>
                <ul>
                  <li>Migrated core services from .NET Framework to .NET Core and moved Razor modules to an Angular SPA.</li>
                  <li>Built secure REST APIs with Entity Framework on MS SQL Server.</li>
                </ul>
              </div>
            </div>
            <div className="exp__row">
              <div className="exp__when">Jan 2021 — now<br />Remote · Weekends</div>
              <div>
                <div className="exp__place">Jawan Pakistan</div>
                <div className="exp__title">Flutter Development Instructor</div>
                <ul>
                  <li>Designed the full Flutter curriculum and trained 1,200+ students across 11+ cohorts to published App/Play Store apps.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="sec">
          <div className="eyebrow">Stack</div>
          <h2 className="big">A full-stack toolkit across three worlds.</h2>
          <div className="spec">
            {[
              ["Languages", "core", [["TypeScript", "daily"], ["Dart", "daily"], ["C#", "fluent"], ["Python", "fluent"], ["SQL", "fluent"]]],
              ["Frontend", "web · mobile", [["Angular", "expert"], ["React / Next.js", "expert"], ["Flutter", "expert"], ["React Native", "fluent"]]],
              ["Backend", "apis", [["Node.js", "expert"], [".NET Core", "expert"], ["Django", "fluent"], ["REST / GraphQL", "expert"]]],
              ["Data", "sql · nosql", [["MongoDB", "daily"], ["PostgreSQL", "fluent"], ["MS SQL", "fluent"], ["Redis", "fluent"]]],
              ["Cloud / DevOps", "ship", [["AWS", "daily"], ["Docker", "daily"], ["GitHub Actions", "daily"], ["Linux", "fluent"]]],
              ["Practice", "how i work", [["System design", "·"], ["Code review", "·"], ["Mentoring", "·"], ["AI-assisted dev", "·"]]],
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
          <div className="eyebrow">Teaching</div>
          <h2 className="big">Over a thousand developers, from first widget to published app.</h2>
          <div className="prose">
            <p>As a Flutter instructor at Jawan Pakistan I designed a full curriculum and have taken <strong>1,200+ students</strong> across 11+ cohorts from their first widget to a published App Store / Play Store app.</p>
            <p>I focus on project-based learning — state management, API integration, Firebase, and the patterns that separate a demo from a production app — with structured video, exercises and assessments.</p>
          </div>
          <div className="facts">
            <div className="fact"><div className="v">1,200+</div><div className="k">Students trained</div></div>
            <div className="fact"><div className="v">11+</div><div className="k">Cohorts delivered</div></div>
            <div className="fact"><div className="v">100%</div><div className="k">Project-based</div></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec faq">
          <div className="eyebrow">FAQ</div>
          <h2 className="big">Quick answers.</h2>
          <details>
            <summary>Is he available for freelance or full-time work?</summary>
            <p>Yes — freelance/contract and full-time (remote, hybrid, or on-site), and open to relocation for roles in the Gulf, Saudi Arabia (KSA) and the UAE.</p>
          </details>
          <details>
            <summary>Is he open to relocation or Gulf (KSA / UAE) roles?</summary>
            <p>Yes. I work remotely with teams worldwide from Karachi, and I&apos;m open to relocation for the right role — including on-site positions in the Gulf, KSA and the UAE, with employer visa sponsorship.</p>
          </details>
          <details>
            <summary>What does he specialize in?</summary>
            <p>Shipping full products end to end — Angular/React + Node.js/.NET on the web, Flutter on mobile, API and cloud architecture on AWS, and AI integration.</p>
          </details>
          <details>
            <summary>Does he offer training or mentorship?</summary>
            <p>Yes — Flutter instruction, workshops and 1:1 mentorship for individuals and teams.</p>
          </details>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec contact">
          <div className="eyebrow">Contact</div>
          <h2>Have a role, a project, or a <span className="u">workshop</span> in mind?</h2>
          <div className="prose"><p>I read every message and reply within a day or two. Open to freelance, full-time, and relocation for the right role in the Gulf.</p></div>
          <div className="ways">
            <div><div className="k">Email</div><div className="val"><a href="mailto:codewithowais@gmail.com">codewithowais@gmail.com</a></div></div>
            <div><div className="k">WhatsApp</div><div className="val"><a href="https://wa.me/923169585886">+92 316 9585886</a></div></div>
            <div><div className="k">Based in</div><div className="val">Karachi, PK · remote-friendly</div></div>
          </div>
        </section>
      </main>
    </div>
  );
}
