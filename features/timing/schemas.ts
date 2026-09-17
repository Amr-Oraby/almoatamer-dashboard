import { z } from "zod";

export const bulkUpdateTimingDaysSchema = z.object({
    day_ids: z.array(z.number()).min(1),
    price: z.union([z.string(), z.number()]).refine(val => val !== "", "Required"),
    app_tax: z.union([z.string(), z.number()]).refine(val => val !== "", "Required"),
});

export type BulkUpdateTimingDaysValues = z.infer<typeof bulkUpdateTimingDaysSchema>;

export const updateTimingDaySchema = z.object({
    price: z.union([z.string(), z.number()]).refine(val => val !== "", "Required"),
    app_tax: z.union([z.string(), z.number()]).refine(val => val !== "", "Required"),
});

export type UpdateTimingDayValues = z.infer<typeof updateTimingDaySchema>;

export const addTimingDaySchema = z.object({
    timing_id: z.number(),
    price: z.union([z.string(), z.number()]).refine(val => val !== "", "Required"),
    app_tax: z.union([z.string(), z.number()]).refine(val => val !== "", "Required"),
    is_open: z.boolean(),
});

export type AddTimingDayValues = z.infer<typeof addTimingDaySchema>;
