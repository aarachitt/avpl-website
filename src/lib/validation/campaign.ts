import { z } from "zod";

// Server-side mirror of the client wizard validation. Required fields
// match requiredFor(step) in the original design's JS class exactly:
// step 1 → businessName/industry/oneLiner/businessStage
// step 2 → primaryGoal/timeframe/budget
// step 3 → audienceType/ageRange/geography
// steps 4–5 are optional.
export const wizardSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(120),
  industry: z.string().trim().min(1, "Industry is required").max(120),
  oneLiner: z.string().trim().min(1, "One-liner is required").max(240),
  businessStage: z.string().trim().min(1, "Business stage is required").max(60),

  primaryGoal: z.string().trim().min(1, "Primary goal is required").max(60),
  timeframe: z.string().trim().min(1, "Timeframe is required").max(40),
  budget: z.string().trim().min(1, "Budget band is required").max(40),

  audienceType: z.string().trim().min(1, "Audience type is required").max(40),
  ageRange: z.string().trim().min(1, "Age range is required").max(20),
  geography: z.string().trim().min(1, "Geography is required").max(160),

  tone: z.string().trim().max(60).optional().default(""),
  platforms: z.array(z.string().trim().max(40)).max(10).optional().default([]),
  links: z.string().trim().max(300).optional().default(""),

  competitors: z.string().trim().max(300).optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),

  // Honeypot — real users never fill this in. Bots that auto-fill
  // every field will trip it.
  website: z.string().max(0, "Spam detected").optional().default(""),
  // Timestamp (ms) the form was rendered client-side, used for a
  // minimum-fill-time heuristic against scripted submissions.
  renderedAt: z.number().optional(),
});

export type WizardInput = z.infer<typeof wizardSchema>;
