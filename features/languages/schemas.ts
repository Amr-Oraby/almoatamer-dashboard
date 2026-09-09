import * as z from "zod";

const translationSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const createLanguageSchema = z.object({
  short_name: z.string().min(1, "Short name is required").max(5, "Short name max length is 5"),
  flag: z.any().refine((val) => typeof window !== 'undefined' && val instanceof FileList && val.length > 0, "Flag image is required"),
  en: translationSchema,
  ar: translationSchema,
  fa: translationSchema,
  ms: translationSchema,
  tr: translationSchema,
  iid: translationSchema,
});

export type CreateLanguageFormValues = z.infer<typeof createLanguageSchema>;

export const updateLanguageSchema = z.object({
  short_name: z.string().min(1, "Short name is required").max(5, "Short name max length is 5"),
  flag: z.any().optional(),
  en: translationSchema,
  ar: translationSchema,
  fa: translationSchema,
  ms: translationSchema,
  tr: translationSchema,
  iid: translationSchema,
});

export type UpdateLanguageFormValues = z.infer<typeof updateLanguageSchema>;
