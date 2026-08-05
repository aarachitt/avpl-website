import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { CampaignWizard } from "@/components/campaign-builder/CampaignWizard";

export const metadata: Metadata = {
  title: "AI Campaign Builder — Your Marketing Co-Pilot",
  description:
    "Answer a few questions about your business and objective — get a personalized growth blueprint grounded in AVPL's own service ecosystem.",
  alternates: { canonical: "/ai-campaign-builder" },
};

export default function AICampaignBuilderPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto max-w-[880px] px-6 pb-[30px] pt-20 text-center md:px-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
            Your Marketing Co-Pilot
          </p>
          <h1 className="mb-[18px] font-display text-[clamp(28px,3.2vw,42px)] font-semibold leading-tight">
            The AI Campaign Builder
          </h1>
          <p className="text-[15px] leading-[1.8] text-ink">
            Answer a few questions about your business and objective — the assistant builds a
            personalized growth blueprint, grounded in AVPL&apos;s own service ecosystem.
          </p>
        </div>

        <div className="mx-auto max-w-[780px] px-6 pb-[110px] pt-10 md:px-12">
          <div className="relative overflow-hidden rounded-[28px] border border-ivory-border bg-white shadow-card-lg">
            <CampaignWizard />
          </div>
        </div>
      </div>
      <CtaBand />
      <Footer />
    </>
  );
}
