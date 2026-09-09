import * as z from "zod";

const translationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  canonical: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
});

export const createSeoSchema = z.object({
  seoable_type: z.enum(["blogs", "news", "terms", "policies", "abouts", "galleries", "home", "contact_us", "landing_page"], {
    required_error: "Type is required"
  }),
  en: translationSchema,
  ar: translationSchema,
  fa: translationSchema,
  ms: translationSchema,
  tr: translationSchema,
  iid: translationSchema,
});

export type CreateSeoFormValues = z.infer<typeof createSeoSchema>;
