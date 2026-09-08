import { z } from "zod";

export const whoIsAlmuatamerSchema = z.object({
  type: z.string().nullable().optional(),
  en: z.object({ info: z.string().nullable().optional() }).optional(),
  ar: z.object({ info: z.string().nullable().optional() }).optional(),
  fa: z.object({ info: z.string().nullable().optional() }).optional(),
  ms: z.object({ info: z.string().nullable().optional() }).optional(),
  tr: z.object({ info: z.string().nullable().optional() }).optional(),
  iid: z.object({ info: z.string().nullable().optional() }).optional(),
});

export type WhoIsAlmuatamerFormValues = z.infer<typeof whoIsAlmuatamerSchema>;
