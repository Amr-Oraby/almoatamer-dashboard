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

export const updateNewsSchema = z.object({
  title: z.string().min(1, "هذا الحقل مطلوب"),
  description: z.string().min(1, "هذا الحقل مطلوب"),
  is_active: z.boolean(),
});

export type UpdateNewsFormValues = z.infer<typeof updateNewsSchema>;
