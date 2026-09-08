import { z } from "zod";

export const mainSectionSchema = z.object({
  image: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  en: z.object({ info: z.string().nullable().optional() }).optional(),
  ar: z.object({ info: z.string().nullable().optional() }).optional(),
  fa: z.object({ info: z.string().nullable().optional() }).optional(),
  ms: z.object({ info: z.string().nullable().optional() }).optional(),
  tr: z.object({ info: z.string().nullable().optional() }).optional(),
  iid: z.object({ info: z.string().nullable().optional() }).optional(),
});

export type MainSectionFormValues = z.infer<typeof mainSectionSchema>;
