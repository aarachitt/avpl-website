import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .default("")
    .refine((v) => v === "" || /^[+()\-\s0-9]{6,30}$/.test(v), {
      message: "Please enter a valid phone number",
    }),
  service: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(4000),

  // Optional context carried over from the AI Campaign Builder so the
  // user never has to re-type what they already told the wizard.
  campaignContext: z
    .object({
      businessName: z.string().optional(),
      industry: z.string().optional(),
      primaryGoal: z.string().optional(),
      timeframe: z.string().optional(),
      budget: z.string().optional(),
      blueprintTitle: z.string().optional(),
    })
    .optional(),

  // Honeypot field — must stay empty.
  website: z.string().max(0, "Spam detected").optional().default(""),
  // Client render timestamp for the timing heuristic.
  renderedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
