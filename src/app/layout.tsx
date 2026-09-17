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

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Muhammad Owais Ahmed — Staff Software Engineer | codewithowais",
  description:
    "Muhammad Owais Ahmed (codewithowais) — Staff Software Engineer in Karachi. Full-Stack (Angular, React, Node, .NET) & Flutter. Founding engineer at SimpliEd.",
  keywords: [
    "Muhammad Owais Ahmed", "codewithowais", "Staff Software Engineer", "Full-Stack Developer",
    "Flutter Developer", "Angular", "React", "Node.js", ".NET", "Karachi", "Pakistan", "SimpliEd",
    "Gulf", "UAE", "KSA", "Saudi Arabia", "software engineer for hire",
  ],
  authors: [{ name: "Muhammad Owais Ahmed", url: SITE }],
  creator: "Muhammad Owais Ahmed",
  publisher: "Muhammad Owais Ahmed",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE,
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
      url: SITE,
      mainEntityOfPage: { "@id": `${SITE}/#profilepage` },
      image: `${SITE}/img/profilepic.jpg`,
      email: "mailto:codewithowais@gmail.com",
      telephone: "+92-316-9585886",
      nationality: { "@type": "Country", name: "Pakistan" },
      knowsLanguage: ["English", "Urdu"],
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      homeLocation: { "@type": "Place", name: "Karachi, Pakistan" },
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationalCategory: "15-1252.00 Software Developers",
        skills:
          "Full-Stack Web Development, Flutter, Angular, React, Node.js, .NET Core, TypeScript, AWS, System Design, AI integration",
      },
      worksFor: [
        {
          "@type": "OrganizationRole",
          roleName: "Staff Software Engineer",
          startDate: "2026-09",
          worksFor: { "@id": `${SITE}/#simplied` },
        },
        {
          "@type": "OrganizationRole",
          roleName: "Founding Engineer",
          startDate: "2022-06",
          endDate: "2026-09",
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
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Virtual University of Pakistan",
        url: "https://www.vu.edu.pk/",
      },
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
        },
      ],
      subjectOf: {
        "@type": "DigitalDocument",
        name: "Muhammad Owais Ahmed — Résumé",
        url: `${SITE}/muhammad-owais-ahmed-resume.pdf`,
      },
      sameAs: ["https://github.com/codewithowais", "https://www.linkedin.com/in/codewithowais/"],
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
      description: "EdTech / school-management platform serving 25,000+ users across 10 institutions.",
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
      url: SITE,
      name: "Muhammad Owais Ahmed",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: SITE,
      name: "Muhammad Owais Ahmed — Staff Software Engineer",
      dateModified: "2026-09-15",
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
          name: "Can he lead a team or own a product solo?",
          acceptedAnswer: { "@type": "Answer", text: "Both. At SimpliEd I built the first version alone and now lead a team of five — I set the architecture, review the code, and stay hands-on shipping." },
        },
        {
          "@type": "Question",
          name: "What does he specialize in?",
          acceptedAnswer: { "@type": "Answer", text: "Shipping full products end to end: Angular/React and Node.js/.NET on the web, Flutter on mobile, API and cloud architecture on AWS, and AI features on top." },
        },
        {
          "@type": "Question",
          name: "Does he offer training or mentorship?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Flutter courses, team workshops and 1:1 mentorship — I've trained 1,200+ developers to date." },
        },
        {
          "@type": "Question",
          name: "Is he open to on-site work in the UAE or Saudi Arabia?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. I'm open to relocating on-site to the Gulf with visa sponsorship, and I also work fully remote. Typical notice is around 30 days." },
        },
      ],
    },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('owais-theme')||'light';document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',t==='dark'?'#14130f':'#f3f2ee');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
