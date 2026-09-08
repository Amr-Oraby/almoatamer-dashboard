import { z } from "zod";

export const createHomeBannerSchema = z.object({
    is_active: z.boolean(),
    images: z.array(z.any()).min(1, { message: "At least one image is required" }),
});

export type CreateHomeBannerFormValues = z.infer<typeof createHomeBannerSchema>;
