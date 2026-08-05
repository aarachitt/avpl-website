// The 10 approved AVPL service verticals, ported verbatim from the
// design source (Aarachitt Ventures Website.dc.html → servicesData).
// This is the single source of truth — used by the Services page,
// the Home teaser, the Contact form's service dropdown, and the
// Campaign Builder's "AVPL Services To Activate" recommendations.

export type Service = {
  slug: string;
  name: string;
  line: string;
  bullets: string[];
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
  },
  {
    slug: "pr",
    name: "PR",
    line: "Stories that earn attention, not just buy it",
    bullets: [
      "Media Outreach",
      "Press Coverage",
      "Brand Story Development",
      "Reputation Management",
      "Thought Leadership",
    ],
  },
  {
    slug: "event-marketing",
    name: "Event Marketing",
    line: "Experiences that move people",
    bullets: [
      "Event Design",
      "Event Strategy",
      "Promotions",
      "Audience Engagement",
      "End-to-End Event Marketing",
    ],
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
  },
  {
    slug: "content-production",
    name: "Content Production",
    line: "Visual, written and audio content at scale",
    bullets: [
      "Video Production",
      "Photography",
      "Copywriting",
      "Podcast Content",
      "Creative Assets",
    ],
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
  },
];

export const featuredServiceSlugs = [
  "branding",
  "marketing-strategy",
  "digital-marketing",
];

/** Service names for the Contact form dropdown — matches the design 1:1, plus "Other". */
export const contactServiceOptions = [...services.map((s) => s.name), "Other"];
