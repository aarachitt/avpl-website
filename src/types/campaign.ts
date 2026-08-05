export type WizardValues = {
  // Step 1 — Business Discovery (required)
  businessName: string;
  industry: string;
  oneLiner: string;
  businessStage: string;
  // Step 2 — Campaign Objective (required)
  primaryGoal: string;
  timeframe: string;
  budget: string;
  // Step 3 — Target Audience (required)
  audienceType: string;
  ageRange: string;
  geography: string;
  // Step 4 — Creative Inputs (optional)
  tone: string;
  platforms: string[];
  links: string;
  // Step 5 — Extra Context (optional)
  competitors: string;
  notes: string;
};

export const emptyWizardValues: WizardValues = {
  businessName: "",
  industry: "",
  oneLiner: "",
  businessStage: "",
  primaryGoal: "",
  timeframe: "",
  budget: "",
  audienceType: "",
  ageRange: "",
  geography: "",
  tone: "",
  platforms: [],
  links: "",
  competitors: "",
  notes: "",
};

export type CampaignBlueprint = {
  title: string;
  executiveSummary: string;
  positioning: string;
  channels: string[];
  pillars: string[];
  contentIdeas: string[];
  plan: string[];
  services: string[];
  kpis: string[];
  timeline: string;
  nextStep: string;
  source: "fallback" | "anthropic";
};
