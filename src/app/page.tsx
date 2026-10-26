import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { HeroLogoReveal } from "@/components/home/HeroLogoReveal";
import { siteConfig } from "@/lib/content/site";

// Exact meta title/description for Home, per
// AVPL_Website_Development_Brief.docx §3 (PAGE 1 — HOME).
export const metadata: Metadata = {
  title:
    "Aarachitt Ventures | 360° Growth & Consultation Partner – Branding, Marketing, Ground Activation, Startup & Investor Advisory",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const snapshots = [
  {
    eyebrow: "Who We Are",
    body: "Growth is not a department. It's a way of thinking. Aarachitt Ventures is the 360° growth and consultation partner for businesses, startups, and institutions that want more than a vendor.",
    cta: "Learn More About Us →",
    href: "/about",
  },
  {
    eyebrow: "What We Do",
    body: "From brand strategy and digital marketing to on-ground activation, consultation, and startup enablement — explore the full Aarachitt Growth Ecosystem.",
    cta: "View All Services →",
    href: "/services",
  },
  {
    eyebrow: "Our Impact",
    body: "Trusted by consumer brands, educational institutions, and ventures across India.",
    cta: "See Our Work →",
    href: "/impact",
  },
  {
    eyebrow: "AI Assistant",
    body: "Meet your growth co-pilot — a genuine AI assistant trained on our philosophy, services, and expertise, built to reason through your business challenges, not just answer FAQs.",
    cta: "Start a Conversation →",
    href: "/ai-assistant",
  },
];

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
                India&apos;s 360&deg; Growth, Solution &amp; Consultation Company
              </p>
              <h1 className="mb-[26px] animate-fade-up font-display text-[clamp(36px,4.6vw,66px)] font-semibold leading-[1.12]">
                Building Brands. <span className="text-gradient-shimmer italic">Generating Growth.</span>{" "}
                Creating Impact.{" "}
                <span className="text-[0.5em] font-medium leading-normal text-ink">
                  — for businesses in Gujarat, across India, and around the world.
                </span>
              </h1>
              <div className="mb-9 max-w-[560px] animate-fade-up space-y-4 text-[16px] leading-[1.75] text-ink">
                <p>
                  Every successful brand begins with a story. Every growing business needs a
                  strategy. Every lasting impact requires execution.
                </p>
                <p>
                  At Aarachitt Ventures Pvt Ltd, we bring together all the elements of growth with
                  our solutions in branding, marketing, culture, storytelling, events, content, and
                  growth strategy — backed by end-to-end consultation across creative, business,
                  finance, legal, and startup ecosystems, delivered directly and through a partner
                  network with a combined 20 years of experience — to help businesses move from
                  visibility to credibility and from credibility to scale.
                </p>
                <p>
                  Whether you&apos;re a brand leading the market, a startup finding your voice, an
                  NGO building reach, an institution building influence, or an established
                  business seeking growth and structured advisory, we create systems that deliver
                  measurable results.
                </p>
              </div>
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
                <HeroLogoReveal />
                <p className="text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  Growth &middot; Consultation &middot; Impact
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SNAPSHOTS */}
      <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-12">
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {snapshots.map((s) => (
            <Link
              key={s.eyebrow}
              href={s.href}
              className="group flex flex-col rounded-card border border-ivory-border bg-ivory-card p-8 transition-all duration-[350ms] hover:-translate-y-2 hover:shadow-card"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
                {s.eyebrow}
              </p>
              <p className="mb-6 flex-1 text-sm leading-[1.7] text-ink">{s.body}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-charcoal group-hover:text-gold">
                {s.cta.replace(" →", "")}
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="px-6 py-24 text-center text-ivory md:px-12"
        style={{ background: "#23201C" }}
      >
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-light">
          Your Next Growth Story Starts Here
        </p>
        <p className="mx-auto mb-9 max-w-2xl text-[15px] leading-[1.9] text-[#DED4C0]">
          Every successful brand was once an idea. Every thriving business was once a challenge.
          Every impactful movement began with a conversation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-pill px-8 py-4 text-base font-bold text-charcoal shadow-cta-gold"
          style={{ background: "linear-gradient(120deg, #B8862E, #D9BD7A)" }}
        >
          Come, build <span aria-hidden="true">|</span> Grow <span aria-hidden="true">|</span> Disrupt
          with us
        </Link>
      </section>

      <Footer />
    </>
  );
}
