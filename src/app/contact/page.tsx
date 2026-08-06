import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { contact } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Every successful brand was once an idea. Tell us about yours — get in touch with Aarachitt Ventures.",
  alternates: { canonical: "/contact" },
};

const contactRows = [
  { icon: MapPin, label: "Address", value: contact.address },
  { icon: Phone, label: "Phone", value: contact.phone },
  { icon: Mail, label: "Email", value: contact.email },
  { icon: Linkedin, label: "LinkedIn", value: contact.linkedin },
  { icon: Instagram, label: "Instagram", value: contact.instagram },
];

export default function ContactPage() {
  return (
    <>
      <div className="pt-[84px]">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:px-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
            Let&apos;s Build Together
          </p>
          <h1 className="mb-[18px] font-display text-[clamp(30px,3.6vw,48px)] font-semibold">
            Every successful brand was once an idea.
          </h1>
          <p className="mb-12 text-[15px] leading-[1.9] text-ink">Tell us about yours.</p>

          <Suspense fallback={<div className="mx-auto h-[520px] max-w-[520px]" />}>
            <ContactForm />
          </Suspense>

          {/* Get in Touch */}
          <div className="mx-auto mt-16 max-w-[480px] text-left">
            <h2 className="mb-5 text-center font-display text-2xl font-semibold">Get in Touch</h2>
            <div className="flex flex-col gap-3 rounded-card border border-ivory-border bg-ivory-card p-6">
              {contactRows.map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <row.icon size={16} className="shrink-0 text-gold-deep" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
                    {row.label}:
                  </span>
                  {row.value ? (
                    <span className="text-sm text-charcoal">{row.value}</span>
                  ) : (
                    <span className="text-sm italic text-ink-soft">Coming soon</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
