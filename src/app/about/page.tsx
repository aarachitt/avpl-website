import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { aboutCopy, values, missionPillars } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Where creativity meets commerce. Aarachitt Ventures' mission, vision, values and mission pillars — strategy-led, culture-rooted, impact-first growth and consultation.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto grid max-w-[1120px] items-start gap-[60px] px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-12">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
              {aboutCopy.eyebrow}
            </p>
            <h1 className="mb-6 font-display text-[clamp(32px,3.6vw,48px)] font-semibold leading-[1.15]">
              {aboutCopy.lead}
            </h1>
            <p className="mb-[18px] text-[15px] leading-[1.85] text-ink">{aboutCopy.paragraph1}</p>
            <p className="mb-[30px] text-[15px] leading-[1.85] text-ink">{aboutCopy.paragraph2}</p>
            <div className="flex flex-wrap gap-3">
              {values.map((v) => (
                <span
                  key={v}
                  className="flex items-center gap-2 rounded-pill border border-champagne px-[18px] py-2.5 text-[13px] font-semibold"
                >
                  <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="rounded-card border border-ivory-border bg-ivory-card p-[30px]">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-deep">
                Mission
              </p>
              <p className="text-sm leading-[1.75] text-ink">{aboutCopy.mission}</p>
            </div>
            <div className="rounded-card bg-charcoal p-[30px] text-ivory">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-light">
                Vision
              </p>
              <p className="text-sm leading-[1.75] text-[#DED4C0]">{aboutCopy.vision}</p>
            </div>
            <div className="rounded-card border border-ivory-border bg-ivory-card p-[30px]">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-deep">
                Who We Serve
              </p>
              <p className="text-sm leading-[1.75] text-ink">{aboutCopy.whoWeServe}</p>
            </div>
          </div>
        </div>

        {/* Mission Pillars */}
        <section className="mx-auto max-w-[1120px] px-6 pb-24 md:px-12">
          <h2 className="mb-10 text-center font-display text-[clamp(26px,3vw,36px)] font-semibold">
            Mission Pillars
          </h2>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {missionPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-card border border-ivory-border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
              >
                <h3 className="mb-2.5 font-display text-xl font-semibold text-gold">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-[1.7] text-ink">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <CtaBand />
      <Footer />
    </>
  );
}
