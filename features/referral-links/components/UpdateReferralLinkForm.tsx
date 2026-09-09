"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUpdateReferralLink, useReferralLink } from "../hooks";
import { updateReferralLinkSchema, UpdateReferralLinkFormValues } from "../schemas";
import { useRouter } from "next/navigation";

interface UpdateReferralLinkFormProps {
    linkId: string;
}

export function UpdateReferralLinkForm({ linkId }: UpdateReferralLinkFormProps) {
    const t = useTranslations("Dashboard");
    const router = useRouter();
    const localeCode = useLocale();
    
    const { mutateAsync: updateReferralLink, isPending } = useUpdateReferralLink(linkId);
    const { data: linkData, isLoading } = useReferralLink(linkId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateReferralLinkFormValues>({
        resolver: zodResolver(updateReferralLinkSchema),
        defaultValues: {
            name: "",
            city_id: 2,
            type: "",
            value: 0,
            identifier: "id",
        }
    });

    useEffect(() => {
        if (linkData?.data) {
            const item = linkData.data;
            reset({
                name: item.name || "",
                city_id: item.city_id || 2,
                type: item.type || "",
                value: item.value || 0,
                identifier: item.identifier || "id",
            });
        }
    }, [linkData, reset]);

    const onSubmit = async (data: UpdateReferralLinkFormValues) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("city_id", String(data.city_id));
            formData.append("type", data.type);
            formData.append("value", String(data.value));
            formData.append("identifier", data.identifier);
            // Include PUT method spoofing just in case, though apiClient has method: "PUT"
            formData.append("_method", "PUT");

            await updateReferralLink(formData);
            router.push(`/${localeCode}/referral-links`);
        } catch (error) {
            console.error("Error updating referral link:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data as UpdateReferralLinkFormValues))} className="w-full space-y-6">
            
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("general_information", { fallback: "General Information" })}</h2>
                    <p className="text-sm text-zinc-500 mt-1">Update the details for the referral link</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("name", { fallback: "Name" })}</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("type", { fallback: "Type" })}</label>
                        <select
                            {...register("type")}
                            className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        >
                            <option value="">Select a type...</option>
                            <option value="percentage">Percentage</option>
                            <option value="amount">Amount</option>
                        </select>
                        {errors.type && <p className="text-sm text-red-500">{errors.type.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("value", { fallback: "Value" })}</label>
                        <input
                            type="number"
                            {...register("value")}
                            className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                            dir="ltr"
                        />
                        {errors.value && <p className="text-sm text-red-500">{errors.value.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("city_id", { fallback: "City ID" })}</label>
                        <input
                            type="number"
                            {...register("city_id")}
                            disabled
                            className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm cursor-not-allowed text-zinc-500"
                            dir="ltr"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("identifier", { fallback: "Identifier" })}</label>
                        <input
                            type="text"
                            {...register("identifier")}
                            disabled
                            className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm cursor-not-allowed text-zinc-500"
                            dir="ltr"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 pb-12">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="rounded-xl px-8 h-12"
                >
                    {t("cancel", { fallback: "Cancel" })}
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-12 shadow-lg shadow-primary/20 font-medium"
                >
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : t("save", { fallback: "Save" })}
                </Button>
            </div>
        </form>
    );
}
