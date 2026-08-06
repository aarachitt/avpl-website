// Services page FAQ — verbatim from AVPL_Website_Development_Brief.docx
// §3 PAGE 3, "FAQ Section". Also drives the FAQPage JSON-LD, which
// must match this visible content exactly (see app/services/page.tsx).

export type FaqEntry = { question: string; answer: string };

export const servicesFaq: FaqEntry[] = [
  {
    question: "What is a ground activation agency?",
    answer:
      "A ground activation agency plans and executes on-ground, experiential brand campaigns — vendor sampling, street activations, retail engagement — that build direct consumer contact rather than relying only on digital reach.",
  },
  {
    question: "Which agency handles on-ground brand activations in Gujarat?",
    answer:
      "Aarachitt Ventures runs on-ground activation, vendor mapping, and distribution campaigns across Gujarat, including experiential FMCG activations such as its Ching's Schezwan street-vendor sampling campaign.",
  },
  {
    question:
      "How do I start a new business in India — who can help with company formation and branding together?",
    answer:
      "Aarachitt Ventures combines Startup & New Venture Development (company formation, business consulting) with Branding and Digital Marketing under one roof, so a founder doesn't need to coordinate separate agencies for identity, structure, and go-to-market.",
  },
  {
    question: "What is investor connect consulting?",
    answer:
      "Investor connect consulting helps founders prepare for and access funding — positioning, pitch readiness, and introductions to relevant investors. Aarachitt offers this as part of its Consultation and Startup Development pillars, delivered directly and through partner professionals.",
  },
  {
    question: "Does Aarachitt Ventures have experience with performing arts and cultural brands?",
    answer:
      "Yes — Aarachitt's approach to storytelling, events, and audience engagement draws on performing-arts craft, which informs how it runs Events, Content Production, and Training work for all clients.",
  },
];
