import * as z from "zod";

export const createCouponSchema = z.object({
  type: z.enum(["amount", "percentage"]),
  value: z.coerce.number().min(0, "القيمة مطلوبة"),
  start_date: z.string().min(1, "تاريخ البدء مطلوب"),
  expiry_date: z.string().min(1, "تاريخ الانتهاء مطلوب"),
  usage_limit: z.coerce.number().min(1).optional().or(z.literal("").transform(() => undefined)),
  status: z.boolean(),
}).refine((data) => {
  if (data.start_date && data.expiry_date) {
    return new Date(data.expiry_date) >= new Date(data.start_date);
  }
  return true;
}, {
  message: "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء",
  path: ["expiry_date"]
});

export type CreateCouponFormValues = z.infer<typeof createCouponSchema>;
