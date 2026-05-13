import Hero       from "@/components/sections/Hero";
import Services   from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Coverage   from "@/components/sections/Coverage";
import QuoteForm  from "@/components/sections/QuoteForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Coverage />
      <QuoteForm />
    </>
  );
}
