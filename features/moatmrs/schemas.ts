import { z } from "zod";

export const createMoatmrSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters"),
  phone: z.string().min(1, "Phone is required"),
  phone_code: z.string().min(1, "Phone code is required"),
  is_active: z.boolean(),
  is_available: z.boolean(),
  language_id: z.union([z.string(), z.number()]).refine((val) => val !== "", "Language is required"),
  country_id: z.union([z.string(), z.number()]).optional().nullable(),
  latitude: z.union([z.string(), z.number()]).optional().nullable(),
  longitude: z.union([z.string(), z.number()]).optional().nullable(),
  from_price: z.union([z.string(), z.number()]).optional().nullable(),
  to_price: z.union([z.string(), z.number()]).optional().nullable(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export type CreateMoatmrValues = z.infer<typeof createMoatmrSchema>;

export const updateMoatmrSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female"]),
  password: z.string().optional().or(z.literal("")),
  password_confirmation: z.string().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required"),
  phone_code: z.string().min(1, "Phone code is required"),
  is_active: z.boolean(),
  is_available: z.boolean(),
  language_id: z.union([z.string(), z.number()]).refine((val) => val !== "", "Language is required"),
  country_id: z.union([z.string(), z.number()]).optional().nullable(),
  latitude: z.union([z.string(), z.number()]).optional().nullable(),
  longitude: z.union([z.string(), z.number()]).optional().nullable(),
  from_price: z.union([z.string(), z.number()]).optional().nullable(),
  to_price: z.union([z.string(), z.number()]).optional().nullable(),
}).refine((data) => {
  if (data.password || data.password_confirmation) {
    return data.password === data.password_confirmation;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export type UpdateMoatmrValues = z.infer<typeof updateMoatmrSchema>;
