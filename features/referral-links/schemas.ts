import { z } from "zod";

export const createReferralLinkSchema = z.object({
    name: z.string().min(1, "Name is required"),
    city_id: z.coerce.number().default(2),
    type: z.string().min(1, "Type is required"),
    value: z.coerce.number().min(0, "Value must be positive"),
    identifier: z.string().default("id"),
});

export type CreateReferralLinkFormValues = z.infer<typeof createReferralLinkSchema>;
