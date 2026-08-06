import { z } from "zod";
import { partnershipCategoryOptions } from "@/lib/content/consultation";

export const partnershipSchema = z.object({
  organisationName: z.string().trim().min(2, "Please enter your organisation or firm name").max(160),
  category: z.enum(partnershipCategoryOptions, {
    errorMap: () => ({ message: "Please select a category" }),
  }),
  website: z
    .string()
    .trim()
    .max(300)
    .optional()
    .default("")
    .refine((v) => v === "" || /^(https?:\/\/)?[^\s]+\.[^\s]+$/.test(v), {
      message: "Please enter a valid website or portfolio link",
    }),
  contactPerson: z.string().trim().min(2, "Please enter a contact person").max(160),
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
  servicesDescription: z
    .string()
    .trim()
    .min(10, "Tell us a little about your services (10+ characters)")
    .max(2000),
  whyPartner: z
    .string()
    .trim()
    .min(10, "Tell us why you'd like to partner with us (10+ characters)")
    .max(2000),

  // Honeypot — must stay empty.
  hpField: z.string().max(0, "Spam detected").optional().default(""),
  renderedAt: z.number().optional(),
});

export type PartnershipInput = z.infer<typeof partnershipSchema>;
