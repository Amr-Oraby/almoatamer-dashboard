"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useUpdateCoupon, useCoupon } from "../hooks";
import { updateCouponSchema, UpdateCouponFormValues } from "../schemas";
import { useRouter } from "@/i18n/routing";

interface UpdateCouponFormProps {
    couponId: string;
}

export function UpdateCouponForm({ couponId }: UpdateCouponFormProps) {
    const t = useTranslations("Coupons");
    const router = useRouter();
    
    const { data: couponData, isLoading: isFetching } = useCoupon(couponId);
    const { mutate: updateCoupon, isPending } = useUpdateCoupon(couponId);

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<UpdateCouponFormValues>({
        resolver: zodResolver(updateCouponSchema),
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

    useEffect(() => {
        if (couponData?.data) {
            const coupon = couponData.data;
            reset({
                status: !!coupon.status,
                type: coupon.type as "amount" | "percentage",
                value: String(coupon.discount_amount),
                start_date: coupon.start_date,
                expiry_date: coupon.expiry_date,
                usage_limit: coupon.usage_limit ? String(coupon.usage_limit) : "",
            });
        }
    }, [couponData, reset]);

    const onSubmit = (data: UpdateCouponFormValues) => {
        const formData = new FormData();
        formData.append("status", data.status ? "1" : "0");
        formData.append("type", data.type);
        formData.append("value", String(data.value));
        formData.append("start_date", data.start_date);
        formData.append("expiry_date", data.expiry_date);
        
        if (data.usage_limit) {
            formData.append("usage_limit", String(data.usage_limit));
        }

        updateCoupon(formData, {
            onSuccess: () => {
                router.push('/discount-coupons/show-all');
            }
        });
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateCouponFormValues))} className="space-y-6">
            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-4">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {t("update")}
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{t("is_active")}</span>
                        <Switch
                            checked={status}
                            onChange={() => setValue("status", !status)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/discount-coupons/show-all')}
                        className="rounded-xl px-8"
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-md"
                    >
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("save")}
                    </Button>
                </div>
            </div>
        </form>
    );
}
