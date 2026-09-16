import { z } from "zod";

const baseAdminSchema = {
    name: z.string().min(1, "الاسم مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صالح").or(z.literal("")),
    phone: z.string().min(1, "رقم الهاتف مطلوب"),
    phone_code: z.string(),
    gender: z.enum(["male", "female"], { message: "النوع مطلوب" }),
    role_id: z.union([z.string(), z.number()]).refine(val => val !== "" && Number(val) > 0, "الدور مطلوب"),
    is_active: z.union([z.number(), z.boolean()]),
};

export const createAdminSchema = z.object({
    ...baseAdminSchema,
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    password_confirmation: z.string(),
    image: z.any().refine((file) => file instanceof File, "الصورة مطلوبة"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "كلمات المرور غير متطابقة",
    path: ["password_confirmation"],
});

export const updateAdminSchema = z.object({
    ...baseAdminSchema,
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").optional().or(z.literal("")),
    password_confirmation: z.string().optional().or(z.literal("")),
    image: z.any().optional(),
}).refine((data) => {
    if (data.password && data.password.length > 0) {
        return data.password === data.password_confirmation;
    }
    return true;
}, {
    message: "كلمات المرور غير متطابقة",
    path: ["password_confirmation"],
});

export type CreateAdminFormValues = z.infer<typeof createAdminSchema>;
export type UpdateAdminFormValues = z.infer<typeof updateAdminSchema>;
