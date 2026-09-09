import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createThankingWordSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    text: z.string().min(1, { message: "Text is required" }),
    is_active: z.boolean(),
    image: z.any()
        .refine((file) => file instanceof File, "Image is required")
        .refine((file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .webp formats are supported.")
});

export type CreateThankingWordFormValues = z.infer<typeof createThankingWordSchema>;

export const updateThankingWordSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    text: z.string().min(1, { message: "Text is required" }),
    image: z.any().optional(),
    is_active: z.boolean(),
});

export type UpdateThankingWordFormValues = z.infer<typeof updateThankingWordSchema>;
