import * as z from "zod";

const localizedBlogSchema = z.object({
  title: z.string().min(1, "هذا الحقل مطلوب"),
  description: z.string().min(1, "هذا الحقل مطلوب"),
  alt: z.string().min(1, "هذا الحقل مطلوب"),
  slug: z.string().min(1, "هذا الحقل مطلوب"),
  canonical: z.string().min(1, "هذا الحقل مطلوب"),
  short_desc: z.string().min(1, "هذا الحقل مطلوب"),
  keywords: z.string().min(1, "هذا الحقل مطلوب"),
});

export const createBlogSchema = z.object({
  ar: localizedBlogSchema,
  en: localizedBlogSchema,
  is_active: z.boolean(),
  image: z
    .any()
    .refine((files) => files?.length > 0, "الصورة مطلوبة"),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

const localizedBlogUpdateSchema = z.object({
  title: z.string().min(1, "هذا الحقل مطلوب"),
  description: z.string().min(1, "هذا الحقل مطلوب"),
  alt: z.string().optional(),
  slug: z.string().optional(),
  canonical: z.string().optional(),
  short_desc: z.string().optional(),
  keywords: z.string().optional(),
});

export const updateBlogSchema = z.object({
  ar: localizedBlogUpdateSchema,
  en: localizedBlogUpdateSchema,
  is_active: z.boolean(),
  image: z.any().optional(),
});

export type UpdateBlogFormValues = z.infer<typeof updateBlogSchema>;

