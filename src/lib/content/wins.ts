// PAGE 4 — Our Impact content. Organisation names and the Gujarat/
// experience statement are verbatim from
// AVPL_Website_Development_Brief.docx §3. Per-item "story" lines are
// carried over from the previously approved design (the brief doesn't
// resupply them, and its own gamification spec called for exactly
// this "hover reveals a short story" pattern).

export type WinItem = {
  abbr: string;
  name: string;
  story: string;
};

export type WinCategory = {
  title: string;
  items: WinItem[];
};

export const winsCategories: WinCategory[] = [
  {
    title: "Brands",
    items: [
      {
        abbr: "CH",
        name: "Ching's",
        story: "National FMCG brand — campaign strategy & activation.",
      },
      {
        abbr: "CP",
        name: "The Container's Park",
        story: "Hospitality & F&B — brand experience and marketing.",
      },
      {
        abbr: "TOI",
        name: "The Times of India",
        story: "India's largest English daily — collaborative initiatives.",
      },
    ],
  },
  {
    title: "Educational Institutions",
    items: [
      {
        abbr: "MV",
        name: "Maharashi Vidyalaya",
        story: "Institutional branding & communication strategy.",
      },
      {
        abbr: "NV",
        name: "Navrachana Vidyalaya",
        story: "Marketing and outreach programs.",
      },
      {
        abbr: "AV",
        name: "Amrit Vidyalaya",
        story: "Brand positioning and community engagement.",
      },
    ],
  },
  {
    title: "Ventures & Communities",
    items: [
      {
        abbr: "SA",
        name: "Samarthyam",
        story: "Social empowerment venture — built and grown.",
      },
      {
        abbr: "TT",
        name: "The Thespian's Tribe",
        story: "Performing arts platform — culture in motion.",
      },
      {
        abbr: "AT",
        name: "Aniradichita Theatre & Films",
        story: "Theatre and cinema production.",
      },
    ],
  },
];

export const impactStats = [
  { value: 3, label: "National Brands" },
  { value: 3, label: "Institutions" },
  { value: 3, label: "Ventures Built" },
  { value: 1, label: "Shared Mission" },
];

export const gujaratStatement =
  "Aarachitt Ventures is based in Gujarat and delivers services directly and through partner organisations with a cumulative 20 years of experience across marketing, consultation, and business advisory.";

/**
 * Ching's Schezwan on-ground activation case study — explicitly
 * pending per brief §4/§7. No metrics, results, testimonials,
 * photos, ROI, reach, or conversion figures exist yet and none are
 * fabricated here. This object is the single place to populate once
 * the real case study is approved — the CaseStudyPlaceholder
 * component on /impact renders directly from it with no page
 * restructuring required.
 */
export const chingsSchezwanCaseStudy = {
  client: "Ching's Schezwan",
  campaignType: "On-ground activation — street-vendor sampling campaign",
  status: "pending" as const,
  // Populate once approved: summary, metrics: {reach, conversions, ...}, photos: [...], testimonial: "..."
};
