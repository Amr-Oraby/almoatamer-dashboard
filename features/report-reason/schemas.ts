import { z } from "zod";

const localeSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export const createReportReasonSchema = z.object({
    en: localeSchema,
    ar: localeSchema,
    fa: localeSchema,
    ms: localeSchema,
    tr: localeSchema,
    iid: localeSchema,
});

export type CreateReportReasonFormValues = z.infer<typeof createReportReasonSchema>;

export const updateReportReasonSchema = createReportReasonSchema;

export type UpdateReportReasonFormValues = z.infer<typeof updateReportReasonSchema>;
