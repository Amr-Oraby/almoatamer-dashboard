import { z } from "zod";

export const footerSchema = z.object({
  type: z.string().nullable().optional(),
  en: z.object({ info: z.string().nullable().optional() }).optional(),
  ar: z.object({ info: z.string().nullable().optional() }).optional(),
  fa: z.object({ info: z.string().nullable().optional() }).optional(),
  ms: z.object({ info: z.string().nullable().optional() }).optional(),
  tr: z.object({ info: z.string().nullable().optional() }).optional(),
  iid: z.object({ info: z.string().nullable().optional() }).optional(),
});

export type FooterFormValues = z.infer<typeof footerSchema>;
