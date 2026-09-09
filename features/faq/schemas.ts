import * as z from "zod";

const translationSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export const createFaqSchema = z.object({
  en: translationSchema,
  ar: translationSchema,
  fa: translationSchema,
  ms: translationSchema,
  tr: translationSchema,
  iid: translationSchema,
});

export type CreateFaqFormValues = z.infer<typeof createFaqSchema>;
