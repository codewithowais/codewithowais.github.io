import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import NameMarquee from "@/components/NameMarquee";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <NameMarquee />
        {/* Sections (About, Experience, Work, Skills, Services, Teaching, FAQ, Contact)
            are being ported next onto this new Next.js + Motion + WebGL foundation. */}
        <section className="mx-auto max-w-[1200px] px-5 py-24">
          <p className="font-mono text-sm" style={{ color: "var(--faint)" }}>
            More sections porting to the new stack…
          </p>
        </section>
      </main>
    </>
  );
}
