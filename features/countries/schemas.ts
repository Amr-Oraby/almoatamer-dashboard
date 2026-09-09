import * as z from "zod";

const translationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nationality_name: z.string().min(1, "Nationality name is required"),
});

export const createCountrySchema = z.object({
  code: z.string().min(1, "Code is required").max(4, "Code max length is 4"),
  short_name: z.string().min(1, "Short name is required").max(5, "Short name max length is 5"),
  flag: z.any().refine((val) => typeof window !== 'undefined' && val instanceof FileList && val.length > 0, "Flag image is required"),
  phone_length: z.union([z.string(), z.number()]).refine(val => val !== "" && Number(val) > 0, "Phone length is required and must be numeric"),
  en: translationSchema,
  ar: translationSchema,
  fa: translationSchema,
  ms: translationSchema,
  tr: translationSchema,
  iid: translationSchema,
});

export const updateCountrySchema = z.object({
  code: z.string().min(1, "Code is required").max(4, "Code max length is 4"),
  short_name: z.string().min(1, "Short name is required").max(5, "Short name max length is 5"),
  flag: z.any().optional(),
  phone_length: z.union([z.string(), z.number()]).refine(val => val !== "" && Number(val) > 0, "Phone length is required and must be numeric"),
  en: translationSchema,
  ar: translationSchema,
  fa: translationSchema,
  ms: translationSchema,
  tr: translationSchema,
  iid: translationSchema,
});

export type CreateCountryFormValues = z.infer<typeof createCountrySchema>;
export type UpdateCountryFormValues = z.infer<typeof updateCountrySchema>;
