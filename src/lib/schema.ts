import { siteConfig, contact, socialLinks } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { servicesFaq } from "@/lib/content/faq";

/**
 * Structured data builders (brief §15 / §6.2). Every function here
 * reads from the site's own content modules — never a separate copy
 * — and only includes a field when real data exists. Placeholder or
 * fabricated business data (address, phone, sameAs) is never emitted;
 * see lib/content/site.ts for why those fields are currently null.
 */

export function organizationJsonLd() {
  const sameAs = socialLinks.map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    // logo: intentionally omitted — final logo asset not yet supplied (brief §7).
  };
}

/**
 * LocalBusiness JSON-LD — only emitted once real address/phone exist.
 * Returns null until then (brief §15: "Once real location/contact
 * details are provided"). Call sites must handle the null case.
 */
export function localBusinessJsonLd() {
  if (!contact.address || !contact.phone) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: contact.phone,
    email: contact.email ?? undefined,
    address: contact.address,
  };
}

/** One Service schema entry per AVPL service category (brief §15). */
export function serviceListJsonLd() {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.line,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    areaServed: "IN",
    serviceType: s.name,
  }));
}

/** FAQPage schema for the Services page — must match the visible FaqAccordion exactly. */
export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
