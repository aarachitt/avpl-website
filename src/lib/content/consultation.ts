// PAGE 6 — Consultation, verbatim from
// AVPL_Website_Development_Brief.docx §3.

export const consultationIntro = "Delivered directly and through a curated partner network.";

export const consultationCategories = [
  "Creative & Arts Consultation",
  "Business & Finance Advisory",
  "Family Trust & Will Management",
  "Income Tax & All Types of Taxation",
  "New Company Formation",
  "SME and Main Board IPO Advisory",
  "Legal Consultation",
  "Startup & Business Consultation",
  "Marketing, Training, Event & Activation Consultation",
  "Film Production Consultation",
  "Investor Relations & Business Merger Advisory",
] as const;

export type PartnerCategory = {
  title: string;
  body: string;
};

export const partnerNetwork: PartnerCategory[] = [
  {
    title: "Creative & Performing Arts Partners",
    body: "Theatrical branding, live and on-ground marketing experiences, experiential training, CSR-linked cultural programming, and event production — extending our Events, Content Production, and Training offerings with performing-arts craft.",
  },
  {
    title: "Legal Partners",
    body: "Legal drafting, counselling, representation, and auditing, including contracts and NDAs, investor–startup negotiation, investor risk analysis, business structuring, and immigration advisory — supporting our Legal and Investor Connect consultation.",
  },
  {
    title: "Financial & Taxation Partners",
    body: "Income tax and all forms of taxation, statutory auditing, new company formation, and IPO advisory (SME and main board) — supporting our Business Finance and Company Formation consultation.",
  },
  {
    title: "IT & Technology Partners",
    body: "Software and product development, AI integration, website and digital platform build-out — supporting our Prototype/MVP Development, AI-Integrated Product Development, and Website & Digital Presence offerings.",
  },
  {
    title: "Startup & Business Partners",
    body: "Incubation support, business structuring, and go-to-market guidance for early-stage founders — supporting our Startup & New Venture Development pillar.",
  },
  {
    title: "Other Specialised Partners",
    body: "Additional domain experts engaged as client needs require, ensuring every consultation is backed by qualified, relevant expertise.",
  },
];

export const partnerNetworkDisclaimer =
  "These are independent partner organisations engaged as needed. Aarachitt Ventures facilitates access to their services as part of its Consultation offering; it does not itself hold statutory legal, tax, or financial licenses.";

export const partnerWithUsIntro =
  "We're always looking to expand our network of legal, financial, creative, technology, and startup partners. If your organisation offers specialised services that complement our Consultation ecosystem, we'd like to hear from you.";

export const partnershipCategoryOptions = [
  "Legal",
  "Financial & Taxation",
  "Creative & Performing Arts",
  "IT & Technology",
  "Startup & Business",
  "Other",
] as const;
