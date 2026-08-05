import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";

export const metadata: Metadata = {
  title: "Services — The AVPL Growth Ecosystem",
  description:
    "10 core service verticals: Branding, Marketing Strategy, Digital Marketing, Social Media Marketing, PR, Event Marketing, Influencer Marketing, Content Production, CSR Campaigns and Corporate Training.",
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
        </div>
      </div>
      <CtaBand />
      <Footer />
    </>
  );
}
