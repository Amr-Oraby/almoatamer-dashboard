import * as z from "zod";

export const updateClientSchema = z.object({
    name: z.string().nullable().optional(),
    email: z.string().email("البريد الإلكتروني غير صالح").or(z.literal("")).nullable().optional(),
    phone: z.string().nullable().optional(),
    phone_code: z.string().nullable().optional(),
    gender: z.enum(["male", "female", ""]).nullable().optional(),
    country_id: z.union([z.string(), z.number()]).nullable().optional(),
    language_id: z.union([z.string(), z.number()]).nullable().optional(),
    latitude: z.union([z.string(), z.number()]).nullable().optional(),
    longitude: z.union([z.string(), z.number()]).nullable().optional(),
    is_active: z.union([z.boolean(), z.number(), z.string()]).nullable().optional(),
});

export type UpdateClientValues = z.infer<typeof updateClientSchema>;
