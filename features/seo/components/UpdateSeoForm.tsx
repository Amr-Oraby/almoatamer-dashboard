"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUpdateSeo, useSeo } from "../hooks";
import { createSeoSchema, CreateSeoFormValues } from "../schemas";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LOCALES = ["en", "ar", "fa", "ms", "tr", "iid"] as const;
const TYPES = ["blogs", "news", "terms", "policies", "abouts", "galleries", "home", "contact_us", "landing_page"] as const;

interface UpdateSeoFormProps {
    seoId: string;
}

export function UpdateSeoForm({ seoId }: UpdateSeoFormProps) {
    const t = useTranslations("Dashboard");
    const router = useRouter();
    const localeCode = useLocale();
    
    const { data: seoData, isLoading: isLoadingSeo } = useSeo(seoId);
    const { mutateAsync: updateSeo, isPending } = useUpdateSeo(seoId);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateSeoFormValues>({
        resolver: zodResolver(createSeoSchema),
    });

    useEffect(() => {
        if (seoData?.data) {
            const seo = seoData.data;
            const defaultValues: any = {
                seoable_type: seo.seoable_type
            };

            LOCALES.forEach(loc => {
                defaultValues[loc] = {
                    title: seo[loc]?.title || "",
                    description: seo[loc]?.description || "",
                    canonical: seo[loc]?.canonical || "",
                    slug: seo[loc]?.slug || "",
                    keywords: seo[loc]?.keywords || "",
                };
            });

            reset(defaultValues);
        }
    }, [seoData, reset]);

    const onSubmit = async (data: CreateSeoFormValues) => {
        try {
            const formData = new FormData();
            formData.append("seoable_type", data.seoable_type);

            LOCALES.forEach(loc => {
                formData.append(`${loc}[title]`, data[loc].title);
                formData.append(`${loc}[description]`, data[loc].description);
                if (data[loc].canonical) formData.append(`${loc}[canonical]`, data[loc].canonical);
                if (data[loc].slug) formData.append(`${loc}[slug]`, data[loc].slug);
                if (data[loc].keywords) formData.append(`${loc}[keywords]`, data[loc].keywords);
            });

            await updateSeo(formData);
            router.push(`/${localeCode}/seo`);
        } catch (error) {
            console.error("Error updating seo:", error);
        }
    };

    if (isLoadingSeo) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data as CreateSeoFormValues))} className="w-full space-y-6">
            
            {/* General Information */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("general_information")}</h2>
                    <p className="text-sm text-zinc-500 mt-1">Select the target page type for this SEO configuration</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("seoable_type")}</label>
                        <select
                            {...register("seoable_type")}
                            className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left text-sm"
                            dir="ltr"
                        >
                            <option value="">Select a type...</option>
                            {TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.seoable_type && <p className="text-sm text-red-500">{errors.seoable_type.message as string}</p>}
                    </div>
                </div>
            </div>

            {/* Translations */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("translations")}</h2>
                    <p className="text-sm text-zinc-500 mt-1">Provide the SEO metadata for each locale</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("seo_title")}</label>
                                    <input
                                        type="text"
                                        {...register(`${loc}.title` as any)}
                                        className="w-full h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    {errors[loc]?.title && (
                                        <p className="text-xs text-red-500 font-medium">{errors[loc]?.title?.message as string}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("seo_description")}</label>
                                    <textarea
                                        {...register(`${loc}.description` as any)}
                                        className="w-full h-24 p-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    />
                                    {errors[loc]?.description && (
                                        <p className="text-xs text-red-500 font-medium">{errors[loc]?.description?.message as string}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("canonical")}</label>
                                    <input
                                        type="text"
                                        {...register(`${loc}.canonical` as any)}
                                        className="w-full h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("slug")}</label>
                                    <input
                                        type="text"
                                        {...register(`${loc}.slug` as any)}
                                        className="w-full h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("keywords")}</label>
                                    <input
                                        type="text"
                                        {...register(`${loc}.keywords` as any)}
                                        placeholder="Comma separated"
                                        className="w-full h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
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
