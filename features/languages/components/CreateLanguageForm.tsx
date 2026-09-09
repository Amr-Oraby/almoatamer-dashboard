"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateLanguage } from "../hooks";
import { createLanguageSchema, CreateLanguageFormValues } from "../schemas";
import { useRouter } from "next/navigation";

const LOCALES = ["en", "ar", "fa", "ms", "tr", "iid"] as const;

export function CreateLanguageForm() {
    const t = useTranslations("Dashboard");
    const router = useRouter();
    const localeCode = useLocale();
    const { mutateAsync: createLanguage, isPending } = useCreateLanguage();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateLanguageFormValues>({
        resolver: zodResolver(createLanguageSchema),
    });

    const onSubmit = async (data: CreateLanguageFormValues) => {
        try {
            const formData = new FormData();
            formData.append("short_name", data.short_name);
            
            if (data.flag && data.flag.length > 0) {
                formData.append("flag", data.flag[0]);
            }

            LOCALES.forEach(loc => {
                formData.append(`${loc}[name]`, data[loc].name);
            });

            await createLanguage(formData);
            router.push(`/${localeCode}/languages`);
        } catch (error) {
            console.error("Error creating language:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data as CreateLanguageFormValues))} className="max-w-4xl mx-auto space-y-8">
            
            {/* General Information */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("general_information")}</h2>
                    <p className="text-sm text-zinc-500 mt-1">Enter the core details and flag for the language</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("flag")}</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("flag")}
                            className="w-full h-11 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        />
                        {errors.flag && <p className="text-sm text-red-500">{errors.flag.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("short_name")}</label>
                        <input
                            type="text"
                            placeholder="e.g. AR, EN"
                            {...register("short_name")}
                            className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                            dir="ltr"
                        />
                        {errors.short_name && <p className="text-sm text-red-500">{errors.short_name.message as string}</p>}
                    </div>
                </div>
            </div>

            {/* Translations */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("translations")}</h2>
                    <p className="text-sm text-zinc-500 mt-1">Provide the language name for each locale</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {LOCALES.map((loc) => (
                        <div key={loc} className="space-y-5 p-5 border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                            <div className="flex items-center gap-3 border-b border-zinc-200/60 dark:border-zinc-800 pb-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300">
                                    {loc}
                                </div>
                                <h3 className="font-medium text-zinc-700 dark:text-zinc-300">{loc.toUpperCase()} Translation</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">{t("name")}</label>
                                    <input
                                        type="text"
                                        {...register(`${loc}.name`)}
                                        className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
