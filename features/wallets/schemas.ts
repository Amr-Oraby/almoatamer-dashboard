import * as z from "zod";

export const chargeWalletSchema = z.object({
  amount: z.union([z.string(), z.number()]).refine(val => val !== "" && Number(val) > 0, "قيمة الشحن مطلوبة وصحيحة"),
});

export type ChargeWalletFormValues = z.infer<typeof chargeWalletSchema>;
