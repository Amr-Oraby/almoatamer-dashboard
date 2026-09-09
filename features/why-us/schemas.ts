import { z } from "zod";

export const whyUsLocaleSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
});

export const createWhyUsSchema = z.object({
    icon: z.any().optional(),
    ar: whyUsLocaleSchema,
    en: whyUsLocaleSchema,
    fa: z.object({ title: z.string().optional(), description: z.string().optional() }),
    ms: z.object({ title: z.string().optional(), description: z.string().optional() }),
    tr: z.object({ title: z.string().optional(), description: z.string().optional() }),
    iid: z.object({ title: z.string().optional(), description: z.string().optional() }),
});

export type CreateWhyUsFormValues = z.infer<typeof createWhyUsSchema>;

export const updateWhyUsSchema = z.object({
    icon: z.any().optional(),
    ar: whyUsLocaleSchema,
    en: whyUsLocaleSchema,
    fa: z.object({ title: z.string().optional(), description: z.string().optional() }),
    ms: z.object({ title: z.string().optional(), description: z.string().optional() }),
    tr: z.object({ title: z.string().optional(), description: z.string().optional() }),
    iid: z.object({ title: z.string().optional(), description: z.string().optional() }),
});

export type UpdateWhyUsFormValues = z.infer<typeof updateWhyUsSchema>;
