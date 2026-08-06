import type { Metadata } from "next";
import Script from "next/script";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { services } from "@/lib/content/services";
import { serviceListJsonLd, faqPageJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The Aarachitt Growth Ecosystem: branding, marketing strategy, consultation, digital marketing, PR, events, content, CSR, corporate training, prototype & MVP development, AI-integrated product development, website & digital presence, and on-ground activation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto max-w-[1240px] px-6 pb-10 pt-24 md:px-12">
          <div className="mb-10 text-center">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
              Our Services
            </p>
            <h1 className="mb-3.5 font-display text-[clamp(30px,3.4vw,46px)] font-semibold">
              Explore The AVPL Growth Ecosystem
            </h1>
            <p className="text-[15px] text-ink">Click any card to reveal what&apos;s inside</p>
          </div>
          <ServiceGrid />

          {/* FAQ */}
          <section className="mx-auto mt-24 max-w-[820px]">
            <h2 className="mb-10 text-center font-display text-[clamp(24px,2.8vw,34px)] font-semibold">
              Frequently Asked Questions
            </h2>
            <FaqAccordion />
          </section>
        </div>
      </div>
      <CtaBand />
      <Footer />

      {/* Service JSON-LD — one entry per category */}
      {serviceListJsonLd().map((entry, i) => (
        <Script
          key={services[i]?.slug ?? i}
          id={`service-jsonld-${services[i]?.slug ?? i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }}
      />
    </>
  );
}
