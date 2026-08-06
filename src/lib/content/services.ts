// The 15 approved AVPL service verticals, per
// AVPL_Website_Development_Brief.docx §3 (PAGE 3 — SERVICES).
// Titles and the 5 sub-points per service are verbatim from the brief.
// One-liners: reused verbatim from the previously approved design for
// the 10 legacy categories; the 5 new categories (marked `newInBrief`)
// get a short, neutral, non-promotional descriptor grounded directly
// in their own sub-points — no invented claims, metrics or results.
//
// Single source of truth — used by the Services page, the Home
// teaser, the Contact form's service dropdown, and the Campaign
// Builder's "AVPL Services To Activate" recommendations.

export type Service = {
  slug: string;
  name: string;
  line: string;
  bullets: string[];
  /** Set for the Consultation tile, which links through to the full page. */
  linksTo?: { href: string; label: string };
  /**
   * Nearest match among the Contact form's fixed 7-option service
   * dropdown (per brief §3 PAGE 7) — used to preselect the dropdown
   * when a visitor clicks "Get this built by AVPL" from a service
   * card that isn't itself one of the 7 dropdown options.
   */
  contactCategory: (typeof contactServiceOptions)[number];
};

export const services: Service[] = [
  {
    slug: "branding",
    name: "Branding",
    line: "We build identities that outlast trends",
    bullets: [
      "Brand Strategy",
      "Brand Positioning",
      "Visual Identity Design",
      "Messaging Framework",
      "Brand Guidelines",
    ],
    contactCategory: "Branding",
  },
  {
    slug: "marketing-strategy",
    name: "Marketing Strategy",
    line: "Data-informed. Culture-led. Result-driven.",
    bullets: [
      "Market Research",
      "Growth Strategy",
      "Campaign Planning",
      "Audience Mapping",
      "Marketing Roadmaps",
    ],
    contactCategory: "Other",
  },
  {
    slug: "consultation",
    name: "Consultation",
    line: "End-to-end advisory — business, legal, financial and startup — delivered directly and through our partner network.",
    bullets: [
      "Business & Finance Advisory",
      "Legal Consultation",
      "Income Tax & All Types of Taxation",
      "New Company Formation & IPO Advisory",
      "Investor Relations & Business Merger Advisory",
    ],
    linksTo: { href: "/consultation", label: "View Full Consultation Services →" },
    contactCategory: "Consultation",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    line: "Full-funnel digital — visibility to conversion",
    bullets: [
      "Performance Marketing",
      "Lead Generation",
      "Search Marketing",
      "Analytics & Reporting",
      "Funnel Optimization",
    ],
    contactCategory: "Digital Marketing",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    line: "Scroll-stopping content that builds communities",
    bullets: [
      "Content Planning",
      "Social Media Management",
      "Reels & Shorts Strategy",
      "Community Building",
      "Platform Growth",
    ],
    contactCategory: "Digital Marketing",
  },
  {
    slug: "public-relations",
    name: "Public Relations",
    line: "Stories that earn attention, not just buy it",
    bullets: [
      "Media Outreach",
      "Press Coverage",
      "Brand Story Development",
      "Reputation Management",
      "Thought Leadership Positioning",
    ],
    contactCategory: "Other",
  },
  {
    slug: "events",
    name: "Events",
    line: "Experiences that move people",
    bullets: [
      "Event Design & Strategy",
      "Promotions",
      "Audience Engagement",
      "Partnerships",
      "End-to-End Event Marketing",
    ],
    contactCategory: "Events",
  },
  {
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    line: "Real voices. Real reach. Real results.",
    bullets: [
      "Influencer Discovery",
      "Campaign Design",
      "Creator Partnerships",
      "Content Collaboration",
      "Performance Tracking",
    ],
    contactCategory: "Digital Marketing",
  },
  {
    slug: "content-production",
    name: "Content Production",
    line: "Visual, written and audio content at scale",
    bullets: ["Video Production", "Photography", "Copywriting", "Podcast Content", "Creative Assets"],
    contactCategory: "Other",
  },
  {
    slug: "csr-campaigns",
    name: "CSR Campaigns",
    line: "Purpose-driven marketing that matters",
    bullets: [
      "CSR Strategy",
      "Awareness Campaigns",
      "Community Engagement",
      "Impact Storytelling",
      "Reporting Support",
    ],
    contactCategory: "Other",
  },
  {
    slug: "corporate-training",
    name: "Corporate Training",
    line: "Upskill teams in marketing, communication & culture",
    bullets: [
      "Workshops",
      "Leadership Training",
      "Communication Programs",
      "Marketing Education",
      "Team Development",
    ],
    contactCategory: "Training",
  },
  {
    slug: "prototype-mvp-development",
    name: "Prototype & MVP Development",
    line: "From idea to a testable product, step by step.",
    bullets: [
      "Idea Validation & Feasibility",
      "Rapid Prototyping",
      "MVP Design & Development",
      "User Testing & Iteration",
      "Product Roadmap Planning",
    ],
    contactCategory: "Startup Support",
  },
  {
    slug: "ai-integrated-product-development",
    name: "AI-Integrated Product Development",
    line: "Practical AI — strategy, tools and workflow automation.",
    bullets: [
      "AI Strategy Consulting",
      "Custom AI Tool Development",
      "Workflow Automation",
      "AI-Powered Content & Chatbot Solutions",
      "Integration & Deployment Support",
    ],
    contactCategory: "Startup Support",
  },
  {
    slug: "website-digital-presence",
    name: "Website & Digital Presence",
    line: "Websites and digital platforms built to perform.",
    bullets: [
      "Website Design & Development",
      "UX/UI Design",
      "E-commerce Setup",
      "SEO-Ready Architecture",
      "Website Maintenance & Support",
    ],
    contactCategory: "Digital Marketing",
  },
  {
    slug: "on-ground-activation",
    name: "On-Ground Activation",
    line: "Street, vendor and experiential campaigns that build direct consumer contact.",
    bullets: [
      "Street & Retail Activations",
      "Vendor & Distribution Campaigns",
      "Sampling & Experiential Marketing",
      "Event-Based Brand Activation",
      "Activation Reporting & Analytics",
    ],
    contactCategory: "Events",
  },
];

/** Service names for the Contact form dropdown — per brief §3 PAGE 7. */
export const contactServiceOptions = [
  "Branding",
  "Digital Marketing",
  "Consultation",
  "Events",
  "Training",
  "Startup Support",
  "Other",
] as const;
