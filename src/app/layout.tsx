import type { Metadata } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE = "https://codewithowais.github.io";
const SITE_URL = `${SITE}/`; // canonical form (trailingSlash: true) — must match og:url

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Muhammad Owais Ahmed — Staff Software Engineer, Karachi",
  description:
    "Muhammad Owais Ahmed (codewithowais) — Staff Software Engineer & Flutter developer in Karachi, Pakistan. Full-stack Angular/React/Node/.NET. Founding engineer at SimpliEd. Open to Gulf roles.",
  keywords: [
    "Muhammad Owais Ahmed", "codewithowais", "Staff Software Engineer", "Full-Stack Developer",
    "Flutter Developer", "Flutter developer Karachi", "Angular", "React", "Node.js", ".NET", "Karachi", "Pakistan", "SimpliEd",
    "Gulf", "UAE", "Dubai", "KSA", "Saudi Arabia", "software engineer for hire",
  ],
  authors: [{ name: "Muhammad Owais Ahmed", url: SITE_URL }],
  creator: "Muhammad Owais Ahmed",
  publisher: "Muhammad Owais Ahmed",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    locale: "en_US",
    title: "Muhammad Owais Ahmed — Staff Software Engineer",
    description:
      "Founding engineer at SimpliEd. Full-Stack (Angular, React, Node, .NET) & Flutter. Open to Gulf / KSA / UAE relocation.",
    siteName: "Muhammad Owais Ahmed",
    images: [
      {
        url: "/img/og-image.png",
        secureUrl: `${SITE}/img/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Muhammad Owais Ahmed — Staff Software Engineer, Full-Stack & Flutter developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Owais Ahmed — Staff Software Engineer",
    description: "Full-Stack & Flutter engineer. Founding engineer at SimpliEd. Open to Gulf roles.",
    images: [
      {
        url: "/img/og-image.png",
        alt: "Muhammad Owais Ahmed — Staff Software Engineer, Full-Stack & Flutter developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Owais Ahmed",
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#7c2233",
  },
  verification: {
    google: "9aaPN77PzvyjifGzYkIwXJ7RzLDmgfWaYGhRUQhzTHk",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Muhammad Owais Ahmed",
      givenName: "Muhammad Owais",
      familyName: "Ahmed",
      alternateName: ["codewithowais", "Owais Ahmed"],
      jobTitle: "Staff Software Engineer",
      description:
        "Staff Software Engineer with 6 years of experience shipping production web and mobile products across Angular, React, Node.js, .NET and Flutter. Founding engineer at SimpliEd and Flutter instructor at Jawan Pakistan.",
      url: SITE_URL,
      mainEntityOfPage: { "@id": `${SITE}/#profilepage` },
      image: `${SITE}/img/profilepic.jpg`,
      email: "mailto:codewithowais@gmail.com",
      telephone: "+92-316-9585886",
      nationality: { "@type": "Country", name: "Pakistan" },
      knowsLanguage: ["English", "Urdu"],
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
      homeLocation: { "@type": "Place", name: "Karachi, Pakistan" },
      disambiguatingDescription: "Staff Software Engineer and Flutter instructor in Karachi, Pakistan; founding engineer at SimpliEd.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Hiring and project inquiries",
        email: "codewithowais@gmail.com",
        telephone: "+92-316-9585886",
        availableLanguage: ["English", "Urdu"],
        areaServed: ["Remote worldwide", "Pakistan", "United Arab Emirates", "Saudi Arabia"],
      },
      seeks: {
        "@type": "Demand",
        name: "Full-time, contract, or freelance software engineering roles",
        eligibleRegion: ["Remote worldwide", "Pakistan", "United Arab Emirates", "Saudi Arabia"],
        description: "Open to relocation to the Gulf (UAE / KSA) with visa sponsorship; around 30 days' notice.",
      },
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "Software Engineer",
          occupationalCategory: "15-1252.00 Software Developers",
          skills:
            "Full-Stack Web Development, Flutter, Angular, React, Node.js, .NET Core, TypeScript, AWS, System Design, AI integration",
          occupationLocation: [
            { "@type": "City", name: "Karachi" },
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "Saudi Arabia" },
          ],
        },
        {
          "@type": "Occupation",
          name: "Software Development Instructor",
          occupationalCategory: "25-1021.00 Computer Science Teachers, Postsecondary",
          skills: "Flutter, Dart, mobile app development, curriculum design, mentorship",
        },
      ],
      worksFor: [
        {
          "@type": "OrganizationRole",
          roleName: "Staff Software Engineer (Founding Engineer)",
          startDate: "2022-06",
          worksFor: { "@id": `${SITE}/#simplied` },
        },
        {
          "@type": "OrganizationRole",
          roleName: "Flutter Development Instructor",
          startDate: "2021-01",
          worksFor: { "@id": `${SITE}/#jawan` },
        },
        {
          "@type": "OrganizationRole",
          roleName: "Associate Software Engineer",
          startDate: "2020-08",
          endDate: "2022-05",
          worksFor: { "@id": `${SITE}/#dawateislami` },
        },
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Virtual University of Pakistan",
          url: "https://www.vu.edu.pk/",
        },
        {
          "@type": "EducationalOrganization",
          name: "Superior Govt College, Karachi",
        },
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-stack & Flutter software development",
            serviceType: "Software development (freelance, contract, or full-time)",
          },
          areaServed: ["Remote worldwide", "Pakistan", "United Arab Emirates", "Saudi Arabia"],
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Flutter training & mentorship",
            serviceType: "Developer training, workshops and 1:1 mentorship",
          },
          areaServed: ["Remote worldwide", "Pakistan"],
        },
      ],
      subjectOf: {
        "@type": "DigitalDocument",
        name: "Muhammad Owais Ahmed — Résumé",
        url: `${SITE}/muhammad-owais-ahmed-resume.pdf`,
      },
      sameAs: [
        "https://github.com/codewithowais",
        "https://www.linkedin.com/in/codewithowais/",
        SITE_URL,
      ],
      knowsAbout: [
        "Full-Stack Development", "Angular", "React", "Node.js", ".NET Core", "Flutter",
        "TypeScript", "AWS", "MongoDB", "AI integration", "System Design",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#simplied`,
      name: "SimpliEd",
      url: "https://simpliedtech.com",
      description: "EdTech / school-management platform serving 25,000+ users across 10 schools.",
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#jawan`,
      name: "Jawan Pakistan",
      description: "Technology training organization where Owais teaches Flutter development.",
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#dawateislami`,
      name: "Dawateislami-IT",
      description: "IT division where Owais worked as an Associate Software Engineer (.NET, Angular).",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE_URL,
      name: "Muhammad Owais Ahmed",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: SITE_URL,
      name: "Muhammad Owais Ahmed — Staff Software Engineer",
      datePublished: "2026-09-15T09:00:00+05:00",
      dateModified: "2026-09-24T12:00:00+05:00",
      inLanguage: "en-US",
      about: { "@id": `${SITE}/#person` },
      mainEntity: { "@id": `${SITE}/#person` },
      isPartOf: { "@id": `${SITE}/#website` },
      primaryImageOfPage: `${SITE}/img/og-image.png`,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      isPartOf: { "@id": `${SITE}/#website` },
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Muhammad Owais Ahmed (codewithowais)?",
          acceptedAnswer: { "@type": "Answer", text: "Muhammad Owais Ahmed, known online as codewithowais, is a Staff Software Engineer in Karachi, Pakistan with 6 years of experience. He is the founding engineer at the EdTech platform SimpliEd (25,000+ users across 10 schools) and the Flutter instructor at Jawan Pakistan, where he has trained 1,200+ developers across 11 cohorts." },
        },
        {
          "@type": "Question",
          name: "Is he available for freelance or full-time work?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. I take on full-time roles and freelance or contract work (remote, hybrid, or on-site), and I'm open to relocating to the Gulf (UAE / KSA) for the right role, with visa sponsorship welcome and around 30 days' notice." },
        },
        {
          "@type": "Question",
          name: "How quickly can he start?",
          acceptedAnswer: { "@type": "Answer", text: "Around 30 days' notice for a full-time role. For freelance or contract work I can usually start within a week." },
        },
        {
          "@type": "Question",
          name: "Is he a good Flutter developer to hire in Karachi or Pakistan?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. I built and teach the Flutter curriculum at Jawan Pakistan (1,200+ developers across 11 cohorts), and I ship production Flutter apps, including SimpliEd's QR-attendance and parent apps used every day by thousands of families." },
        },
        {
          "@type": "Question",
          name: "Can I hire a full-stack engineer in the Gulf (Dubai, UAE, or Saudi Arabia)?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. I'm open to relocating to the Gulf, including Dubai (UAE) and Saudi Arabia (KSA), for full-time or contract roles, with visa sponsorship welcome and around 30 days' notice. I also work fully remote." },
        },
        {
          "@type": "Question",
          name: "Can he lead a team or own a product solo?",
          acceptedAnswer: { "@type": "Answer", text: "Both. At SimpliEd I built the first version alone and now lead a team of five. I set the architecture, review the code, and stay hands-on shipping." },
        },
        {
          "@type": "Question",
          name: "What does he specialize in?",
          acceptedAnswer: { "@type": "Answer", text: "Shipping full products end to end: Angular/React and Node.js/.NET on the web, Flutter on mobile, API and cloud architecture on AWS, and AI features on top." },
        },
        {
          "@type": "Question",
          name: "Does he offer training or mentorship?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Flutter courses, team workshops and 1:1 mentorship. I've trained 1,200+ developers so far." },
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "SimpliEd",
      applicationCategory: "EducationApplication",
      operatingSystem: "Web, iOS, Android",
      url: "https://simpliedtech.com",
      author: { "@id": `${SITE}/#person` },
      description: "School-management EdTech platform serving 25,000+ users across 10 schools: attendance, fee invoicing, announcements and a full LMS across web and mobile.",
    },
    {
      "@type": "SoftwareApplication",
      name: "AI Prompt Builder",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
      url: "https://codewithowais.github.io/flutter-prompt-builder/",
      author: { "@id": `${SITE}/#person` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Free, no-sign-up tool that builds production-ready AI prompts from 60+ fill-in-the-blank templates across code (17 frameworks), chat personas, image, video and voice models, plus a multi-model context-handoff wizard.",
    },
    {
      "@type": "MobileApplication",
      name: "Shanghai Trip Assistant",
      applicationCategory: "TravelApplication",
      operatingSystem: "Android, iOS",
      codeRepository: "https://github.com/codewithowais/china-trip-app",
      author: { "@id": `${SITE}/#person` },
      description: "Offline-first Flutter travel app with on-device EN↔中文 translation, a PIN/biometric document vault, expenses and itinerary that all work with no signal.",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "Ledgerly",
      codeRepository: "https://github.com/codewithowais/expense-tracker",
      programmingLanguage: ["TypeScript"],
      runtimePlatform: "Next.js",
      author: { "@id": `${SITE}/#person` },
      description: "Offline-first, privacy-first finance PWA with an AI assistant that turns receipts and statements into clean transactions.",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "AI Study Partner",
      codeRepository: "https://github.com/codewithowais/ai-study-planner",
      programmingLanguage: ["TypeScript"],
      runtimePlatform: "Next.js",
      author: { "@id": `${SITE}/#person` },
      description: "Open-source, local-first study app that turns your own PDFs and notes into a course with quizzes and revision, using a local AI companion.",
    },
    {
      "@type": "SoftwareApplication",
      name: "DevPath",
      applicationCategory: "EducationApplication",
      operatingSystem: "Web Browser",
      url: "https://dev-path-by-codewithowais.vercel.app",
      author: { "@id": `${SITE}/#person` },
      description: "Beginner-friendly learning platform with 200+ runnable lessons and a live 'Watch it sort' algorithm visualizer.",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "InvoiceBook",
      codeRepository: "https://github.com/codewithowais/InvoiceBook",
      programmingLanguage: ["TypeScript"],
      runtimePlatform: "Next.js",
      author: { "@id": `${SITE}/#person` },
      description: "Full-stack invoicing SaaS: invoices, proof-of-payment, automatic monthly recurring billing, PDF export, roles, reminders and an audit log.",
    },
    {
      "@type": "SoftwareApplication",
      name: "CrispCast",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "macOS, Windows, Linux",
      url: "https://codewithowais.github.io/CrispCast/",
      license: "https://opensource.org/licenses/MIT",
      author: { "@id": `${SITE}/#person` },
      description: "Cross-platform desktop screen recorder that captures system audio and an isolated mic, denoises the voice, and merges everything into one clean MP4, fully offline.",
    },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('owais-theme')||'light';document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',t==='dark'?'#14130f':'#f3f2ee');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

// Arm scroll-reveal before first paint (no flash), only when motion is allowed.
// Failsafe un-hides everything if the reveal JS never takes over.
const revealScript = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var r=document.documentElement;r.classList.add('reveal-init');window.__revealFailsafe=setTimeout(function(){r.classList.remove('reveal-init');},4000);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${schibsted.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta name="theme-color" content="#f3f2ee" />
        {/* Author verification (E-E-A-T) — ties this page to owned profiles */}
        <link rel="me" href="https://github.com/codewithowais" />
        <link rel="me" href="https://www.linkedin.com/in/codewithowais/" />
        <link rel="me" href="mailto:codewithowais@gmail.com" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
