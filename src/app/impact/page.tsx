import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { StatCounters } from "@/components/wins/StatCounters";
import { CaseStudyPlaceholder } from "@/components/impact/CaseStudyPlaceholder";
import { winsCategories, gujaratStatement } from "@/lib/content/wins";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Brands, institutions, ventures and communities Aarachitt Ventures has worked with — Gujarat-rooted, with 20 years of combined experience across marketing, consultation, and business advisory.",
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-12">
          <div className="mb-5 text-center">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
              Our Impact
            </p>
            <h1 className="font-display text-[clamp(30px,3.4vw,46px)] font-semibold">
              Brands. Institutions. Ventures. Communities.
            </h1>
          </div>

          <StatCounters />

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {winsCategories.map((cat) => (
              <div key={cat.title}>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-gold-deep">
                  {cat.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-ivory-border bg-white p-4 px-[18px] transition-all duration-300 hover:border-champagne hover:shadow-card"
                    >
                      <div className="mb-1.5 flex items-center gap-3">
                        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-ivory-card text-[11px] font-bold text-gold-deep">
                          {item.abbr}
                        </span>
                        <span className="text-sm font-bold">{item.name}</span>
                      </div>
                      <p className="pl-[46px] text-xs leading-[1.6] text-ink">{item.story}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-14 rounded-card bg-charcoal p-9 text-center text-ivory md:p-12">
            <h2 className="mb-3 font-display text-xl font-semibold text-gold-light">
              Gujarat-rooted, 20 years of combined experience
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-[1.8] text-[#DED4C0]">
              {gujaratStatement}
            </p>
          </div>

          <CaseStudyPlaceholder />
        </div>
      </div>
      <CtaBand />
      <Footer />
    </>
  );
}
