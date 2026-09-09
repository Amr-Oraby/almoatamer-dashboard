"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateFaq } from "../hooks";
import { createFaqSchema, CreateFaqFormValues } from "../schemas";
import { useRouter } from "next/navigation";

const LOCALES = ["en", "ar", "fa", "ms", "tr", "iid"] as const;

export function CreateFaqForm() {
    const t = useTranslations("Dashboard");
    const router = useRouter();
    const localeCode = useLocale();
    const { mutateAsync: createFaq, isPending } = useCreateFaq();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFaqFormValues>({
        resolver: zodResolver(createFaqSchema),
    });

    const onSubmit = async (data: CreateFaqFormValues) => {
        try {
            const formData = new FormData();
            
            LOCALES.forEach(loc => {
                formData.append(`${loc}[question]`, data[loc].question);
                formData.append(`${loc}[answer]`, data[loc].answer);
            });

            await createFaq(formData);
            router.push(`/${localeCode}/public-pages/faq`);
        } catch (error) {
            console.error("Error creating faq:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data as CreateFaqFormValues))} className="w-full space-y-6">
            
            {/* Translations */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("translations")}</h2>
                    <p className="text-sm text-zinc-500 mt-1">Provide the question and answer for each locale</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("question")}</label>
                                    <input
                                        type="text"
                                        {...register(`${loc}.question`)}
                                        className="w-full h-10 px-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    {errors[loc]?.question && (
                                        <p className="text-xs text-red-500 font-medium">{errors[loc]?.question?.message as string}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("answer")}</label>
                                    <textarea
                                        {...register(`${loc}.answer`)}
                                        className="w-full h-24 p-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    />
                                    {errors[loc]?.answer && (
                                        <p className="text-xs text-red-500 font-medium">{errors[loc]?.answer?.message as string}</p>
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
