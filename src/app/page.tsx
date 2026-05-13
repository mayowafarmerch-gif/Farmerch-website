import Hero     from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import { SectionWrapper } from "@/components/shared";
import { Container }      from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />

      {/* ── Placeholder sections — replaced one by one as built ── */}

      <SectionWrapper id="how-it-works" background="muted">
        <Container>
          <h2 className="text-3xl font-bold text-ink">How It Works</h2>
          <p className="mt-4 text-ink-muted">How It Works section — coming soon.</p>
        </Container>
      </SectionWrapper>

      <SectionWrapper id="coverage" background="gradient">
        <Container>
          <h2 className="text-3xl font-bold text-ink">Coverage</h2>
          <p className="mt-4 text-ink-muted">Coverage section — coming soon.</p>
        </Container>
      </SectionWrapper>

      <SectionWrapper id="contact" background="white">
        <Container>
          <h2 className="text-3xl font-bold text-ink">Request a Quote</h2>
          <p className="mt-4 text-ink-muted">Quote form — coming soon.</p>
        </Container>
      </SectionWrapper>
    </>
  );
}
