import { z } from "zod";

export const createCouponCodeSchema = z.object({
    name: z.string().min(1, "مطلوب"),
    phone_code: z.string().min(1, "مطلوب"),
    phone_number: z.string().min(1, "مطلوب"),
    number_of_recipients: z.union([z.string(), z.number()]).refine(val => val !== "", "مطلوب"),
});

export type CreateCouponCodeFormValues = z.infer<typeof createCouponCodeSchema>;
