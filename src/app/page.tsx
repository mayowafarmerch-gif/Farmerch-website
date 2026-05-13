import Hero       from "@/components/sections/Hero";
import Services   from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Coverage   from "@/components/sections/Coverage";
import { SectionWrapper } from "@/components/shared";
import { Container }      from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Coverage />

      {/* ── Placeholder — replaced when QuoteForm is built ── */}
      <SectionWrapper id="contact" background="white">
        <Container>
          <h2 className="text-3xl font-bold text-ink">Request a Quote</h2>
          <p className="mt-4 text-ink-muted">Quote form — coming soon.</p>
        </Container>
      </SectionWrapper>
    </>
  );
}
