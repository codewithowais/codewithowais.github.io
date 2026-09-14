import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
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
  title: "Muhammad Owais Ahmed — Senior Software Engineer | codewithowais",
  description:
    "Muhammad Owais Ahmed (codewithowais) — Senior Software Engineer in Karachi. Full-Stack (Angular, React, Node, .NET) & Flutter. Founding engineer at SimpliEd.",
  keywords: [
    "Muhammad Owais Ahmed", "codewithowais", "Senior Software Engineer", "Full-Stack Developer",
    "Flutter Developer", "Angular", "React", "Node.js", ".NET", "Karachi", "Pakistan", "SimpliEd",
    "Gulf", "UAE", "KSA", "Saudi Arabia", "software engineer for hire",
  ],
  authors: [{ name: "Muhammad Owais Ahmed", url: SITE }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    title: "Muhammad Owais Ahmed — Senior Software Engineer",
    description:
      "Founding engineer at SimpliEd. Full-Stack (Angular, React, Node, .NET) & Flutter. Open to Gulf / KSA / UAE relocation.",
    siteName: "Muhammad Owais Ahmed",
    images: [{ url: "/img/og-image.png", width: 1200, height: 630, alt: "Muhammad Owais Ahmed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Owais Ahmed — Senior Software Engineer",
    description: "Full-Stack & Flutter engineer. Founding engineer at SimpliEd. Open to Gulf roles.",
    images: ["/img/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Muhammad Owais Ahmed",
      alternateName: ["codewithowais", "Owais Ahmed"],
      jobTitle: "Senior Software Engineer",
      url: SITE,
      image: `${SITE}/img/profilepic.jpg`,
      email: "mailto:codewithowais@gmail.com",
      telephone: "+92-316-9585886",
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      worksFor: { "@type": "Organization", name: "SimpliEd", url: "https://simpliedtech.com" },
      sameAs: ["https://github.com/codewithowais", "https://www.linkedin.com/in/codewithowais/"],
      knowsAbout: [
        "Full-Stack Development", "Angular", "React", "Node.js", ".NET Core", "Flutter",
        "TypeScript", "AWS", "MongoDB", "AI integration", "System Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Muhammad Owais Ahmed",
      publisher: { "@id": `${SITE}/#person` },
    },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('owais-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
