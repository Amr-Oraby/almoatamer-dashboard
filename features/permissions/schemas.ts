import { z } from "zod";

export const createPermissionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    front_name: z.string().optional(),
    ar: z.object({
        title: z.string().min(1, "Arabic title is required"),
    }),
    en: z.object({
        title: z.string().min(1, "English title is required"),
    }),
});

export type CreatePermissionValues = z.infer<typeof createPermissionSchema>;
