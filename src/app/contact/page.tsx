import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact — Come, Build. Grow. Disrupt.",
  description:
    "Every successful brand was once an idea. Start the conversation with Aarachitt Ventures Pvt Ltd.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:px-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
            Your Next Chapter Starts Here
          </p>
          <h1 className="mb-[18px] font-display text-[clamp(30px,3.6vw,48px)] font-semibold">
            Come, Build. Grow. Disrupt.
          </h1>
          <p className="mb-12 text-[15px] leading-[1.9] text-ink">
            Every successful brand was once an idea.
            <br />
            Every thriving business was once a vision.
            <br />
            Every impactful movement began with a conversation.
          </p>

          <Suspense fallback={<div className="mx-auto h-[520px] max-w-[520px]" />}>
            <ContactForm />
          </Suspense>

          <div className="mt-14 flex flex-wrap justify-center gap-9">
            <a href={`mailto:${siteConfig.email}`} className="text-[13px] text-ink hover:text-gold">
              {siteConfig.email}
            </a>
            <span className="text-[13px] text-ink">{siteConfig.location}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
