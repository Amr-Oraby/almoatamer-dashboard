"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateReportReason } from "../hooks";
import { createReportReasonSchema, CreateReportReasonFormValues } from "../schemas";
import { useRouter } from "next/navigation";

const LOCALES = ["en", "ar", "fa", "ms", "tr", "iid"] as const;

export function CreateReportReasonForm() {
    const t = useTranslations("Dashboard");
    const router = useRouter();
    const localeCode = useLocale();
    const { mutateAsync: createReportReason, isPending } = useCreateReportReason();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateReportReasonFormValues>({
        resolver: zodResolver(createReportReasonSchema),
    });

    const onSubmit = async (data: CreateReportReasonFormValues) => {
        try {
            const formData = new FormData();
            
            LOCALES.forEach(loc => {
                formData.append(`${loc}[name]`, data[loc].name);
            });

            await createReportReason(formData);
            router.push(`/${localeCode}/report-reason`);
        } catch (error) {
            console.error("Error creating report reason:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data as CreateReportReasonFormValues))} className="w-full space-y-6">
            
            {/* Translations */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("translations")}</h2>
                    <p className="text-sm text-zinc-500 mt-1">Provide the name of the report reason for each locale</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {LOCALES.map((loc) => (
                        <div key={loc} className="space-y-5 p-4 md:p-5 border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                            <div className="flex items-center gap-3 border-b border-zinc-200/60 dark:border-zinc-800 pb-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300">
                                    {loc}
                                </div>
                                <h3 className="font-medium text-zinc-700 dark:text-zinc-300">{loc.toUpperCase()} Translation</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("name")}</label>
                                    <input
                                        type="text"
                                        {...register(`${loc}.name`)}
                                        className="w-full h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    {errors[loc]?.name && (
                                        <p className="text-xs text-red-500 font-medium">{errors[loc]?.name?.message as string}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 pb-12">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="rounded-xl px-8 h-12"
                >
                    {t("cancel")}
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-12 shadow-lg shadow-primary/20 font-medium"
                >
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : t("save")}
                </Button>
            </div>
        </form>
    );
}
