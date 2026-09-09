import * as z from "zod";

const localizedNewsSchema = z.object({
  title: z.string().min(1, "هذا الحقل مطلوب"),
  description: z.string().min(1, "هذا الحقل مطلوب"),
  alt: z.string().min(1, "هذا الحقل مطلوب"),
  slug: z.string().min(1, "هذا الحقل مطلوب"),
  canonical: z.string().min(1, "هذا الحقل مطلوب"),
  short_desc: z.string().min(1, "هذا الحقل مطلوب"),
  keywords: z.string().min(1, "هذا الحقل مطلوب"),
});

export const createNewsSchema = z.object({
  ar: localizedNewsSchema,
  en: localizedNewsSchema,
  is_active: z.boolean(),
  image: z
    .any()
    .refine((files) => files?.length > 0, "الصورة مطلوبة"),
});

export type CreateNewsFormValues = z.infer<typeof createNewsSchema>;

const localizedNewsUpdateSchema = z.object({
  title: z.string().min(1, "هذا الحقل مطلوب"),
  description: z.string().min(1, "هذا الحقل مطلوب"),
  alt: z.string().optional(),
  slug: z.string().optional(),
  canonical: z.string().optional(),
  short_desc: z.string().optional(),
  keywords: z.string().optional(),
});

export const updateNewsSchema = z.object({
  ar: localizedNewsUpdateSchema,
  en: localizedNewsUpdateSchema,
  is_active: z.boolean(),
  image: z.any().optional(),
});

export type UpdateNewsFormValues = z.infer<typeof updateNewsSchema>;
