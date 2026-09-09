import { z } from "zod";

export const createReferralLinkSchema = z.object({
    name: z.string().min(1, "Name is required"),
    city_id: z.union([z.string(), z.number()]).refine(val => val !== "", "City ID is required"),
    type: z.string().min(1, "Type is required"),
    value: z.union([z.string(), z.number()]).refine(val => val !== "", "Value is required"),
    identifier: z.string().min(1, "Identifier is required"),
});

export type CreateReferralLinkFormValues = z.infer<typeof createReferralLinkSchema>;

export const updateReferralLinkSchema = createReferralLinkSchema;
export type UpdateReferralLinkFormValues = z.infer<typeof updateReferralLinkSchema>;
