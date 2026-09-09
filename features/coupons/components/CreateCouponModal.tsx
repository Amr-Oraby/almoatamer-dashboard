"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus } from "lucide-react";
import { useCreateCoupon } from "../hooks";
import { createCouponSchema, CreateCouponFormValues } from "../schemas";

export function CreateCouponModal() {
    const t = useTranslations("Coupons");
    const [open, setOpen] = useState(false);
    const { mutateAsync: createCoupon, isPending } = useCreateCoupon();

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<CreateCouponFormValues>({
        resolver: zodResolver(createCouponSchema),
        defaultValues: {
            status: true,
            type: "amount",
            value: "",
            start_date: new Date().toISOString().split('T')[0],
            expiry_date: new Date().toISOString().split('T')[0],
            usage_limit: "",
        }
    });

    const status = watch("status");

    const onSubmit = async (data: CreateCouponFormValues) => {
        try {
            const formData = new FormData();
            formData.append("status", data.status ? "1" : "0");
            formData.append("type", data.type);
            formData.append("value", String(data.value));
            formData.append("start_date", data.start_date);
            formData.append("expiry_date", data.expiry_date);
            
            if (data.usage_limit) {
                formData.append("usage_limit", String(data.usage_limit));
            }

            await createCoupon(formData);
            setOpen(false);
            reset();
        } catch (error) {
            console.error("Error creating coupon:", error);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm"><Plus className="w-4 h-4" /> {t("create_new")}</Button>} />
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-900 sticky top-0 bg-white dark:bg-zinc-950 z-10">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {t("create_new")}
                        </DialogTitle>
                        <Switch
                            checked={status}
                            onChange={() => setValue("status", !status)}
                        />
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as CreateCouponFormValues))} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("coupon_type")}</label>
                            <select
                                {...register("type")}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            >
                                <option value="amount">{t("amount")}</option>
                                <option value="percentage">{t("percentage")}</option>
                            </select>
                            {errors.type && <p className="text-sm text-red-500">{errors.type.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("coupon_value")}</label>
                            <input
                                type="number"
                                {...register("value")}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                                dir="ltr"
                            />
                            {errors.value && <p className="text-sm text-red-500">{errors.value.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("start_date")}</label>
                            <input
                                type="date"
                                {...register("start_date")}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            {errors.start_date && <p className="text-sm text-red-500">{errors.start_date.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("expiry_date")}</label>
                            <input
                                type="date"
                                {...register("expiry_date")}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            {errors.expiry_date && <p className="text-sm text-red-500">{errors.expiry_date.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("usage_limit")}</label>
                            <input
                                type="number"
                                {...register("usage_limit")}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                                dir="ltr"
                            />
                            {errors.usage_limit && <p className="text-sm text-red-500">{errors.usage_limit.message as string}</p>}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-md"
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("save")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
