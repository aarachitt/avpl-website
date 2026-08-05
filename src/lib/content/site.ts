// Centralized company/brand configuration. Anything that repeats
// across pages (nav, footer, contact details, socials) lives here
// so it never has to be hardcoded twice.

export const siteConfig = {
  name: "Aarachitt Ventures Pvt Ltd",
  shortName: "AVPL",
  tagline: "Build Brands. Generate Growth. Create Impact.",
  description:
    "India's 360° Growth & Solutions Company. Branding, marketing strategy, digital marketing, PR, events, influencer marketing, content production, CSR campaigns and corporate training — under one growth roof.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.aarachittventures.com",
  email: "hello@aarachittventures.com",
  location: "Ahmedabad, India",
  founded: 2026,
} as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/aarachittventures" },
  { label: "LinkedIn", href: "https://linkedin.com/company/aarachittventures" },
] as const;

export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/services", label: "Services" },
  { href: "/wins", label: "Our Wins" },
  { href: "/ai-campaign-builder", label: "AI Assistant" },
  { href: "/contact", label: "Contact" },
];

export const industries = [
  "Startups",
  "SMEs",
  "Educational Institutions",
  "Corporates",
  "NGOs",
  "Government Bodies",
];

export const whyCards = [
  {
    num: "01",
    title: "Strategy-Led",
    body: "Every campaign, every creative decision starts with a clear strategic foundation — not guesswork.",
  },
  {
    num: "02",
    title: "Culture-Rooted",
    body: "We build marketing that reflects real people, real context, and real culture — not borrowed trends.",
  },
  {
    num: "03",
    title: "Impact-First",
    body: "Growth that matters is growth with meaning — for the business, the community, and the story it tells.",
  },
] as const;
