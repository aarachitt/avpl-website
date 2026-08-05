import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Where creativity meets commerce. AVPL's mission, vision and core belief — strategy-led, culture-rooted, impact-first marketing.",
  alternates: { canonical: "/who-we-are" },
};

const badges = ["Strategy-Led", "Culture-Rooted", "Impact-First"];

export default function WhoWeArePage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto grid max-w-[1120px] items-start gap-[60px] px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-12">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
              Our Story
            </p>
            <h1 className="mb-6 font-display text-[clamp(32px,3.6vw,48px)] font-semibold leading-[1.15]">
              Where Creativity Meets Commerce
            </h1>
            <blockquote className="mb-[26px] border-l-[3px] border-champagne pl-5 font-display text-xl italic leading-[1.6] text-ink">
              &ldquo;Marketing is not a department. It&apos;s a way of thinking, building, and
              connecting.&rdquo;
            </blockquote>
            <p className="mb-[30px] text-[15px] leading-[1.85] text-ink">
              In a world crowded with noise, brands don&apos;t grow by speaking louder. They grow
              by creating meaning, building trust, and delivering value consistently. We help
              businesses, institutions, entrepreneurs and changemakers do exactly that — through
              strategy-led, culture-rooted, impact-first marketing.
            </p>
            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 rounded-pill border border-champagne px-[18px] py-2.5 text-[13px] font-semibold"
                >
                  <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="rounded-card border border-ivory-border bg-ivory-card p-[30px]">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-deep">
                Mission
              </p>
              <p className="text-sm leading-[1.75] text-ink">
                Help businesses, institutions, startups and creators build brands, generate
                growth, and create meaningful impact through strategy-driven marketing and
                storytelling.
              </p>
            </div>
            <div className="rounded-card bg-charcoal p-[30px] text-ivory">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-light">
                Vision
              </p>
              <p className="text-sm leading-[1.75] text-[#DED4C0]">
                Become India&apos;s most trusted growth partner — where creativity, culture and
                commerce build brands that matter.
              </p>
            </div>
            <div className="rounded-card border border-ivory-border bg-ivory-card p-[30px]">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-deep">
                Core Belief
              </p>
              <p className="text-sm leading-[1.75] text-ink">
                To become India&apos;s most trusted 360&deg; growth partner — where creativity
                meets commerce, and stories drive scale.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CtaBand />
      <Footer />
    </>
  );
}
