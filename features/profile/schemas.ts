import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone is required"),
  phone_code: z.string().optional(),
  gender: z.string().optional(),
  locale: z.string().optional(),
  image: z.any().optional(),
  latitude: z.union([z.number(), z.string()]).optional(),
  longitude: z.union([z.number(), z.string()]).optional(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z.object({
  old_password: z.string().min(1, "Old password is required"),
  new_password: z.string().min(8, "Password must be at least 8 characters"),
  new_password_confirmation: z.string().min(1, "Please confirm your password")
}).refine((data) => data.new_password === data.new_password_confirmation, {
  message: "Passwords do not match",
  path: ["new_password_confirmation"]
});

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
