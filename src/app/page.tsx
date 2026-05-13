import { SectionWrapper } from "@/components/shared";
import { Container } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      {/* Hero — full-height gradient, no section ID (hero is above the fold) */}
      <SectionWrapper background="gradient" className="min-h-[90vh] flex items-center">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-3">
            Coming soon
          </p>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">
            Professional Farm Mechanization at Scale
          </h1>
          <p className="mt-6 text-lg text-ink-muted max-w-2xl">
            Hero section — will be replaced with the full Hero component.
          </p>
        </Container>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper id="services" background="white">
        <Container>
          <h2 className="text-3xl font-bold text-ink">Services</h2>
          <p className="mt-4 text-ink-muted">
            Services section — placeholder for scroll-link testing.
          </p>
        </Container>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper id="how-it-works" background="muted">
        <Container>
          <h2 className="text-3xl font-bold text-ink">How It Works</h2>
          <p className="mt-4 text-ink-muted">
            How It Works section — placeholder for scroll-link testing.
          </p>
        </Container>
      </SectionWrapper>

      {/* Coverage */}
      <SectionWrapper id="coverage" background="gradient">
        <Container>
          <h2 className="text-3xl font-bold text-ink">Coverage</h2>
          <p className="mt-4 text-ink-muted">
            Coverage section — placeholder for scroll-link testing.
          </p>
        </Container>
      </SectionWrapper>

      {/* Contact / Quote Form */}
      <SectionWrapper id="contact" background="white">
        <Container>
          <h2 className="text-3xl font-bold text-ink">Request a Quote</h2>
          <p className="mt-4 text-ink-muted">
            Quote form section — placeholder for scroll-link testing.
          </p>
        </Container>
      </SectionWrapper>
    </>
  );
}
