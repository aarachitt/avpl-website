// Option lists for the AI Campaign Builder wizard, ported verbatim
// from the design source's wizard.*Options definitions.

export const stageOptions = [
  "Idea / Pre-launch",
  "Early traction",
  "Growing",
  "Established",
] as const;

export const goalOptions = [
  "Brand Awareness",
  "Lead Generation",
  "Sales / Revenue",
  "Product Launch",
  "Website Traffic",
  "Community Growth",
  "Recruitment",
  "Funding / Credibility",
  "Event Promotion",
  "CSR Awareness",
] as const;

export const timeframeOptions = [
  "2 weeks",
  "4 weeks",
  "6 weeks",
  "3 months",
  "6 months",
  "Ongoing",
] as const;

export const budgetOptions = [
  "Under ₹50k",
  "₹50k – ₹2L",
  "₹2L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
  "Not sure yet",
] as const;

export const audienceOptions = [
  "B2B",
  "B2C",
  "D2C",
  "Educational",
  "Corporate",
  "Government",
  "NGO",
] as const;

export const ageOptions = [
  "13–17",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55+",
  "All ages",
] as const;

export const toneOptions = [
  "Professional",
  "Luxury",
  "Friendly",
  "Bold",
  "Playful",
  "Minimal",
] as const;

export const platformOptions = [
  "Instagram",
  "LinkedIn",
  "Facebook",
  "YouTube",
  "Google Ads",
  "X",
  "Influencer",
] as const;

export type Stage = (typeof stageOptions)[number];
export type Goal = (typeof goalOptions)[number];
export type Timeframe = (typeof timeframeOptions)[number];
export type Budget = (typeof budgetOptions)[number];
export type AudienceType = (typeof audienceOptions)[number];
export type AgeRange = (typeof ageOptions)[number];
export type Tone = (typeof toneOptions)[number];
export type Platform = (typeof platformOptions)[number];
