import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { PartnershipForm } from "@/components/consultation/PartnershipForm";
import {
  consultationIntro,
  consultationCategories,
  partnerNetwork,
  partnerNetworkDisclaimer,
  partnerWithUsIntro,
} from "@/lib/content/consultation";

export const metadata: Metadata = {
  title: "Consultation & Partner Network",
  description:
    "Business, legal, financial, and startup consultation — delivered directly by Aarachitt Ventures and through a curated partner network of independent specialists.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto max-w-[1120px] px-6 py-24 md:px-12">
          <div className="mb-14 text-center">
            <h1 className="mb-3 font-display text-[clamp(30px,3.6vw,48px)] font-semibold">
              Consultation
            </h1>
            <p className="text-[15px] text-ink">{consultationIntro}</p>
          </div>

          {/* Categories */}
          <section className="mb-20">
            <div className="flex flex-wrap justify-center gap-3">
              {consultationCategories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-pill border-[1.5px] border-champagne px-5 py-3 text-sm font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>

          {/* Partner Network */}
          <section className="mb-10">
            <h2 className="mb-2 text-center font-display text-[clamp(24px,2.8vw,34px)] font-semibold">
              Partner Network
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-[1.8] text-ink">
              Aarachitt Ventures delivers consultation and specialised services directly and
              through a curated network of independent partner organisations, each bringing
              focused domain expertise:
            </p>
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
              {partnerNetwork.map((p) => (
                <div
                  key={p.title}
                  className="rounded-card border border-ivory-border bg-ivory-card p-7"
                >
                  <h3 className="mb-2.5 text-base font-bold text-gold-deep">{p.title}</h3>
                  <p className="text-[13px] leading-[1.7] text-ink">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer — prominent per brief */}
          <div className="mb-24 flex gap-3 rounded-card border-[1.5px] border-champagne bg-highlight p-6">
            <ShieldAlert size={20} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
            <p className="text-sm leading-[1.7] text-charcoal-soft">
              <strong>Please note: </strong>
              {partnerNetworkDisclaimer}
            </p>
          </div>

          {/* Partner With Us */}
          <section id="partner-with-us">
            <div className="mb-10 text-center">
              <h2 className="mb-3 font-display text-[clamp(24px,2.8vw,34px)] font-semibold">
                Partner With Us
              </h2>
              <p className="mx-auto max-w-2xl text-sm leading-[1.8] text-ink">{partnerWithUsIntro}</p>
            </div>
            <PartnershipForm />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
