import { z } from "zod";

export const updateRoleSchema = z.object({
    ar: z.object({
        name: z.string().min(1, "Arabic name is required"),
    }),
    en: z.object({
        name: z.string().min(1, "English name is required"),
    }),
    is_active: z.number().int().min(0).max(1),
    permissions: z.array(z.number()),
});

export type UpdateRoleValues = z.infer<typeof updateRoleSchema>;
