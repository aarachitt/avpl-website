import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { ChatInterface } from "@/components/ai-assistant/ChatInterface";

export const metadata: Metadata = {
  title: "AI Assistant — Meet Your Growth Co-Pilot",
  description:
    "A genuine, LLM-backed growth co-pilot trained on AVPL's philosophy, services, and expertise — built to reason through your business challenges, not just answer FAQs.",
  alternates: { canonical: "/ai-assistant" },
};

export default function AiAssistantPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto max-w-[880px] px-6 pb-10 pt-20 text-center md:px-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
            Your Marketing Co-Pilot
          </p>
          <h1 className="mb-[18px] font-display text-[clamp(28px,3.2vw,42px)] font-semibold leading-tight">
            Meet Your Growth Co-Pilot
          </h1>
          <p className="mb-4 text-[15px] leading-[1.8] text-ink">
            This isn&apos;t a scripted chatbot with canned replies. The Aarachitt AI Assistant is
            being built as a genuine growth co-pilot — trained on our philosophy, services, and
            expertise — to have real conversations about your business.
          </p>
          <p className="text-[15px] leading-[1.8] text-ink">
            Ask it to think through a campaign idea, explore positioning options, understand which
            of our services fits your stage of growth, or simply talk through a challenge
            you&apos;re facing. It&apos;s designed to reason with you, not just respond to
            keywords.
          </p>
        </div>

        <div className="mx-auto max-w-[780px] px-6 pb-8 pt-8 md:px-12">
          <ChatInterface />
        </div>

        <p className="mx-auto mb-24 max-w-[780px] px-6 text-center text-sm text-ink md:px-12">
          Prefer a structured, step-by-step intake instead?{" "}
          <Link href="/ai-campaign-builder" className="font-bold text-gold underline underline-offset-2">
            Try the AI Campaign Builder →
          </Link>
        </p>
      </div>
      <CtaBand />
      <Footer />
    </>
  );
}
