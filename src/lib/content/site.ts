// Centralized company/brand configuration. Anything that repeats
// across pages (nav, footer, contact details, socials) lives here
// so it never has to be hardcoded twice.
//
// IMPORTANT — launch blocker: contact.address / contact.phone /
// contact.email / contact.linkedin / contact.instagram are
// genuinely unknown per AVPL_Website_Development_Brief.docx §7
// ("Open Items Before Launch"). They are intentionally left `null`
// rather than invented. The UI renders a "coming soon" state for any
// null field, and structured data (Organization/LocalBusiness JSON-LD)
// omits fields that are null rather than fabricating placeholder
// values. Fill these in — and only these — before launch. See
// LAUNCH_CHECKLIST.md at the project root.

export const siteConfig = {
  name: "Aarachitt Ventures Pvt Ltd",
  shortName: "AVPL",
  // Used in the footer, verbatim from the brief (note: different
  // grammatical form from the Home hero headline, which is
  // intentional — both are specified verbatim in their own places).
  footerTagline: "Build Brands. Generate Growth. Create Impact.",
  description:
    "Aarachitt Ventures is a Gujarat-rooted, globally minded growth and consultation partner — branding, marketing, on-ground activation, startup, investor, legal, and financial consultation, delivered directly and through a partner network with 20 years of combined experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.aarachittventures.com",
  location: "Gujarat, India",
} as const;

export type ContactField = string | null;

/** Launch-blocker contact details — see module comment above. */
export const contact: {
  address: ContactField;
  phone: ContactField;
  email: ContactField;
  linkedin: ContactField;
  instagram: ContactField;
} = {
  address: null,
  phone: null,
  email: null,
  linkedin: null,
  instagram: null,
};

/** Only real, configured social links are ever rendered or fed into schema. */
export const socialLinks = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "Instagram", href: contact.instagram },
].filter((s): s is { label: string; href: string } => Boolean(s.href));

export type NavLink = {
  href: string;
  label: string;
};

// Verbatim from the brief §1.2: "Home / Who We Are / Services / Our
// Impact / AI Assistant / Consultation / Contact" — labels intentionally
// differ from their route slugs (e.g. label "Who We Are" → /about).
export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Who We Are" },
  { href: "/services", label: "Services" },
  { href: "/impact", label: "Our Impact" },
  { href: "/ai-assistant", label: "AI Assistant" },
  { href: "/consultation", label: "Consultation" },
  { href: "/contact", label: "Contact" },
];
