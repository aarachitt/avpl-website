import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { whyCards, industries, siteConfig } from "@/lib/content/site";
import { services, featuredServiceSlugs } from "@/lib/content/services";
import { impactStats } from "@/lib/content/wins";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Build Brands. Generate Growth. Create Impact.`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const featuredServices = services.filter((s) => featuredServiceSlugs.includes(s.slug));

export default function HomePage() {
  return (
    <>
      <div className="relative overflow-hidden">
        {/* Decorative floating background layer — purely visual, aria-hidden */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute right-[-7%] top-[1%] h-[560px] w-[560px] animate-float-slow rounded-full blur-[14px]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(217,189,122,0.5), rgba(184,134,46,0.14) 60%, transparent 75%)",
            }}
          />
          <div
            className="absolute left-[-8%] top-[36%] h-[520px] w-[520px] animate-float-slow2 rounded-full blur-[10px]"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(201,180,140,0.42), rgba(35,32,28,0.06) 65%, transparent 80%)",
            }}
          />
          <div
            className="absolute right-[-5%] top-[76%] h-[380px] w-[380px] animate-float-slow-13 rounded-full blur-[12px]"
            style={{
              background: "radial-gradient(circle at 45% 45%, rgba(217,189,122,0.28), transparent 72%)",
            }}
          />
        </div>

        {/* HERO */}
        <section className="relative z-[1] flex min-h-screen items-center px-6 pb-[60px] pt-[84px] md:px-12">
          <div className="mx-auto grid w-full max-w-[1240px] items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="mb-[22px] animate-fade-up text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
                India&apos;s 360&deg; Growth &amp; Solutions Company
              </p>
              <h1 className="mb-[26px] animate-fade-up font-display text-[clamp(42px,5.2vw,76px)] font-semibold leading-[1.06]">
                Build Brands.
                <br />
                <span className="text-gradient-shimmer italic">Generate Growth.</span>
                <br />
                Create Impact.
              </h1>
              <p className="mb-9 max-w-[540px] animate-fade-up text-[17px] leading-[1.75] text-ink">
                Every successful brand begins with a story. Every growing business needs a
                strategy. Every lasting impact requires execution. We bring together branding,
                marketing, culture, storytelling, events, content and growth strategy — moving
                businesses from visibility to credibility, and from credibility to scale.
              </p>
              <div className="flex animate-fade-up flex-wrap gap-3.5">
                <Button href="/services" variant="solid">
                  Explore Our Work
                </Button>
                <Button href="/contact" variant="outline">
                  Let&apos;s Build Together
                </Button>
              </div>
            </div>
            <div className="relative flex h-[460px] items-center justify-center">
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-[18px] overflow-hidden rounded-[28px] border border-ivory-border shadow-card-lg"
                style={{ background: "linear-gradient(160deg, #F3EDE1, #E4D6B8)" }}
              >
                <div className="flex animate-float-slow flex-col items-center" aria-hidden="true">
                  <div
                    className="-mb-[10px] h-[46px] w-[46px] rounded-full"
                    style={{ background: "linear-gradient(160deg, #E8CE8F, #B8862E)" }}
                  />
                  <div className="-mb-2 h-10 w-[100px] rounded-full bg-charcoal" />
                  <div
                    className="-mb-[10px] h-11 w-[150px] rounded-full"
                    style={{ background: "linear-gradient(160deg, #DDCBA8, #C9B48C)" }}
                  />
                  <div className="-mb-2 h-9 w-[90px] rounded-full bg-[#B98F72]" />
                  <div
                    className="h-[60px] w-[210px] rounded-full"
                    style={{ background: "linear-gradient(160deg, #302B24, #17140F)" }}
                  />
                </div>
                <p className="text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  Balance &middot; Growth &middot; Impact
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY AVPL */}
        <section className="relative z-[1] mx-auto max-w-[1240px] px-6 pb-20 pt-24 md:px-12">
          <div className="mb-14 text-center">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
              Why AVPL
            </p>
            <h2 className="mx-auto max-w-xl font-display text-[clamp(28px,3.2vw,42px)] font-semibold">
              Three beliefs behind everything we build
            </h2>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {whyCards.map((card) => (
              <div
                key={card.num}
                className="rounded-card border border-ivory-border bg-ivory-card p-9 px-[30px] transition-all duration-[350ms] hover:-translate-y-2 hover:shadow-card"
              >
                <div className="mb-[18px] font-display text-[34px] font-semibold text-gold">
                  {card.num}
                </div>
                <h3 className="mb-2.5 text-lg font-bold">{card.title}</h3>
                <p className="text-sm leading-[1.7] text-ink">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="relative z-[1] mx-auto max-w-[1240px] px-6 pb-24 pt-4 md:px-12">
          <div className="mb-9 text-center">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
              Who We Work With
            </p>
            <h2 className="font-display text-[clamp(24px,2.8vw,34px)] font-semibold">
              Built for every kind of ambition
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3.5">
            {industries.map((ind) => (
              <span
                key={ind}
                className="rounded-pill border-[1.5px] border-champagne px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
              >
                {ind}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* SERVICES TEASER */}
      <section className="bg-charcoal px-6 py-24 text-ivory md:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-light">
                What We Do
              </p>
              <h2 className="font-display text-[clamp(28px,3.2vw,42px)] font-semibold">
                A full growth ecosystem, under one roof
              </h2>
            </div>
            <Link
              href="/services"
              className="whitespace-nowrap rounded-pill border-[1.5px] border-gold-light px-[26px] py-[13px] text-sm font-bold text-gold-light transition-all duration-300 hover:bg-gold-light hover:text-charcoal"
            >
              View All 10 Services &rarr;
            </Link>
          </div>
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {featuredServices.map((svc, i) => (
              <Link
                key={svc.slug}
                href="/services"
                className="rounded-2xl border border-[rgba(217,189,122,0.25)] bg-[rgba(250,246,239,0.05)] p-[30px] px-[26px] transition-all duration-[350ms] hover:-translate-y-1.5 hover:bg-[rgba(217,189,122,0.1)]"
              >
                <div className="mb-4 font-display text-2xl text-gold-light">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-[17px] font-bold">{svc.name}</h3>
                <p className="text-[13px] leading-[1.6] text-champagne">{svc.line}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT TEASER */}
      <section className="mx-auto max-w-[1240px] px-6 py-24 text-center md:px-12">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
          Our Impact
        </p>
        <h2 className="mb-12 font-display text-[clamp(28px,3.2vw,42px)] font-semibold">
          Real work. Real results. Real relationships.
        </h2>
        <div className="mb-11 grid grid-cols-2 gap-5 md:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="rounded-card bg-ivory-card px-4 py-[30px]">
              <div className="font-display text-[44px] font-semibold text-gold">{stat.value}</div>
              <div className="mt-1.5 text-xs text-ink">{stat.label}</div>
            </div>
          ))}
        </div>
        <Link
          href="/wins"
          className="inline-block rounded-pill border-[1.5px] border-charcoal px-7 py-[13px] text-sm font-bold transition-all duration-300 hover:bg-charcoal hover:text-ivory"
        >
          See Our Full Story &rarr;
        </Link>
      </section>

      <CtaBand />
      <Footer />
    </>
  );
}
