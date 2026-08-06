import type { CampaignBlueprint } from "@/types/campaign";
import type { WizardInput } from "@/lib/validation/campaign";

/**
 * Deterministic, zero-cost blueprint generator. This is a direct,
 * faithful port of `buildBlueprint()` from the approved design
 * prototype (Aarachitt Ventures Website.dc.html), extended with the
 * additional sections the production spec calls for (executive
 * summary, content ideas, next-step CTA).
 *
 * This is the default/dev-fallback AI_PROVIDER — it never calls an
 * external API, costs nothing, and is always available, which is why
 * it's what ships live until a real provider key is supplied.
 */

const GOAL_PHRASES: Record<string, string> = {
  "Brand Awareness": "put your brand in front of the right audience, consistently",
  "Lead Generation": "build a reliable pipeline of qualified leads",
  "Sales / Revenue": "convert attention into revenue",
  "Product Launch": "launch with maximum impact",
  "Website Traffic": "drive qualified traffic that converts",
  "Community Growth": "grow an engaged, loyal community",
  Recruitment: "attract the right talent",
  "Funding / Credibility": "build the credibility investors look for",
  "Event Promotion": "fill the room and build buzz",
  "CSR Awareness": "build awareness for the cause that matters",
};

const DEFAULT_CHANNELS: Record<string, string[]> = {
  "Brand Awareness": ["Content-led social", "PR & media outreach", "Influencer seeding"],
  "Lead Generation": [
    "Performance ads (Meta/Google)",
    "Conversion-optimised landing + retargeting",
    "Email nurture",
  ],
  "Sales / Revenue": ["Performance ads (Meta/Google)", "Retargeting", "Influencer-led promotions"],
  "Product Launch": ["PR & media outreach", "Influencer seeding", "Launch event / activation"],
  "Community Growth": ["Instagram + Reels", "Community management", "Creator-led UGC"],
  "Funding / Credibility": ["PR & thought leadership", "LinkedIn presence", "Case study content"],
};

const SERVICES_MAP: Record<string, string[]> = {
  "Brand Awareness": ["Branding", "Public Relations", "Content Production", "Influencer Marketing"],
  "Lead Generation": [
    "Digital Marketing",
    "Marketing Strategy",
    "Social Media Marketing",
    "Content Production",
  ],
  "Sales / Revenue": ["Digital Marketing", "Marketing Strategy", "Social Media Marketing"],
  "Product Launch": ["Branding", "Events", "Public Relations", "Digital Marketing"],
  "Community Growth": ["Social Media Marketing", "Influencer Marketing", "Content Production"],
  "Funding / Credibility": ["Public Relations", "Branding", "Marketing Strategy"],
  "Event Promotion": ["Events", "Public Relations", "Social Media Marketing"],
  "CSR Awareness": ["CSR Campaigns", "Public Relations", "Content Production"],
  Recruitment: ["Branding", "Content Production", "Corporate Training"],
  "Website Traffic": ["Digital Marketing", "Content Production"],
};

const KPIS_MAP: Record<string, string[]> = {
  "Brand Awareness": ["Reach & impressions", "Share of voice", "Engagement rate"],
  "Lead Generation": ["Qualified leads / month", "Cost per lead", "Landing page conversion rate"],
  "Sales / Revenue": ["Revenue growth", "ROAS", "Repeat purchase rate"],
  "Product Launch": ["Launch-week reach", "Press mentions", "Waitlist / pre-orders"],
  "Community Growth": ["Follower growth", "Engagement rate", "Community retention"],
};

const CONTENT_IDEAS_MAP: Record<string, string[]> = {
  "Brand Awareness": [
    "A founder/behind-the-scenes story series",
    "A visual brand manifesto reel",
    "User-generated \"why I chose us\" testimonials",
  ],
  "Lead Generation": [
    "A free downloadable guide gated behind an email capture",
    "A comparison/explainer carousel addressing objections",
    "A short case-study video with a clear CTA",
  ],
  "Sales / Revenue": [
    "A limited-time offer campaign with countdown creative",
    "Bundle/upsell content for existing customers",
    "Retargeting creative built around cart/interest drop-off",
  ],
  "Product Launch": [
    "A teaser countdown series across social",
    "A launch-day press kit and media list",
    "Early-access / waitlist incentive content",
  ],
  "Community Growth": [
    "A recurring community spotlight series",
    "User-generated content challenges with a branded hashtag",
    "Behind-the-scenes livestreams / AMAs",
  ],
};

export function generateFallbackBlueprint(v: WizardInput): CampaignBlueprint {
  const goalPhrase = GOAL_PHRASES[v.primaryGoal] || "drive measurable growth";
  const audienceLabel = (v.audienceType || "your audience").toLowerCase();

  const positioning = `${v.businessName || "Your brand"} helps ${audienceLabel} in ${
    v.geography || "your market"
  } choose it for one reason: ${v.oneLiner || "what makes it different"}. The strategy below is built to ${goalPhrase} within ${
    v.timeframe || "the next few weeks"
  }.`;

  const channels = (v.platforms && v.platforms.length
    ? v.platforms
    : DEFAULT_CHANNELS[v.primaryGoal] || ["Social media", "Content production", "Performance marketing"]
  )
    .concat(["Creator-led UGC"])
    .slice(0, 5);

  const pillars = [
    "Lead with the outcome, not the feature",
    `Make ${v.industry || "this"} feel personal`,
    "Proof over promises — show, don't tell",
    v.tone ? `A ${v.tone.toLowerCase()} voice, consistently` : "A confident voice, consistently",
  ];

  const plan = [
    `Weeks 1–2 — Foundation: sharpen positioning, message house and visual identity for ${
      v.industry || "the brand"
    }.`,
    `Weeks 3–4 — Launch: roll out hero creative across ${channels.slice(0, 2).join(" and ")}.`,
    `Weeks 5–6 — Amplify: layer in ${channels[2] || "performance channels"}, capture proof and double down on what converts.`,
    `Ongoing — Optimise: weekly readouts against ${v.primaryGoal || "the goal"}, reallocating budget (${
      v.budget || "as agreed"
    }) to winners.`,
  ];

  const services = SERVICES_MAP[v.primaryGoal] || ["Marketing Strategy", "Digital Marketing", "Branding"];
  const kpis = KPIS_MAP[v.primaryGoal] || ["Engagement rate", "Conversion rate", "Growth in leads / followers"];
  const contentIdeas =
    CONTENT_IDEAS_MAP[v.primaryGoal] || [
      "A brand story piece for your top channel",
      "A short-form video series tied to your core offer",
      "A proof-point/testimonial content push",
    ];

  const executiveSummary = `A ${v.timeframe || "multi-week"} growth plan for ${
    v.businessName || "your brand"
  }, built around ${(v.primaryGoal || "growth").toLowerCase()} for ${audienceLabel} in ${
    v.geography || "your target market"
  }. Grounded in AVPL's ${services.length} core service tracks, this blueprint prioritises fast, visible wins in the first two weeks and compounding channel performance after that.`;

  const nextStep = `Ready to put this into motion? AVPL's team can turn this blueprint into a live campaign — starting with ${
    services[0] || "a strategy sprint"
  }.`;

  return {
    title: `${v.businessName || "Your Brand"}'s Growth Blueprint`,
    executiveSummary,
    positioning,
    channels,
    pillars,
    contentIdeas,
    plan,
    services,
    kpis,
    timeline: v.timeframe || "4–6 weeks",
    nextStep,
    source: "fallback",
  };
}
