"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { useUpdateWhyUs, useWhyUsItem } from "../hooks";
import { updateWhyUsSchema, UpdateWhyUsFormValues } from "../schemas";

const LOCALES = [
    { key: "ar", label: "العربية" },
    { key: "en", label: "English" },
    { key: "fa", label: "فارسی" },
    { key: "ms", label: "Melayu" },
    { key: "tr", label: "Türkçe" },
    { key: "iid", label: "Indonesian" },
];

interface UpdateWhyUsModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemId: string | null;
}

export function UpdateWhyUsModal({ isOpen, onClose, itemId }: UpdateWhyUsModalProps) {
    const t = useTranslations("WhyUs");
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("ar");

    const { mutateAsync: updateWhyUs, isPending } = useUpdateWhyUs(itemId || "");
    const { data: itemData, isLoading } = useWhyUsItem(itemId || "");

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UpdateWhyUsFormValues>({
        resolver: zodResolver(updateWhyUsSchema),
        defaultValues: {
            ar: { title: "", description: "" },
            en: { title: "", description: "" },
            fa: { title: "", description: "" },
            ms: { title: "", description: "" },
            tr: { title: "", description: "" },
            iid: { title: "", description: "" },
        }
    });

    useEffect(() => {
        if (itemData?.data && isOpen) {
            const item = itemData.data;
            reset({
                ar: { title: item.ar?.title || "", description: item.ar?.description || "" },
                en: { title: item.en?.title || "", description: item.en?.description || "" },
                fa: { title: item.fa?.title || "", description: item.fa?.description || "" },
                ms: { title: item.ms?.title || "", description: item.ms?.description || "" },
                tr: { title: item.tr?.title || "", description: item.tr?.description || "" },
                iid: { title: item.iid?.title || "", description: item.iid?.description || "" },
            });
            if (item.icon) setIconPreview(item.icon);
        }
    }, [itemData, isOpen, reset]);

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("icon", file);
            setIconPreview(URL.createObjectURL(file));
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            onClose();
            setTimeout(() => {
                reset();
                setIconPreview(null);
                setActiveTab("ar");
            }, 300);
        }
    };

    const onSubmit = async (values: UpdateWhyUsFormValues) => {
        if (!itemId) return;
        try {
            await updateWhyUs(values);
            handleOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] overflow-y-auto" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{t("update_title", { fallback: "تعديل السبب" })}</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateWhyUsFormValues))} className="space-y-5 mt-4">
                        {/* Icon Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {t("icon", { fallback: "الأيقونة" })}
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden relative hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors flex-shrink-0 group">
                                    {iconPreview ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={iconPreview} alt="Icon" className="w-full h-full object-contain p-2" />
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Upload className="w-4 h-4 text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <Upload className="h-6 w-6 text-zinc-400" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleIconChange}
                                    />
                                </div>
                                <p className="text-xs text-zinc-500">{t("icon_hint", { fallback: "اختر ملف صورة للأيقونة (PNG, SVG, JPG)" })}</p>
                            </div>
                        </div>

                        {/* Locale Tabs */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {LOCALES.map(locale => (
                                    <button
                                        key={locale.key}
                                        type="button"
                                        onClick={() => setActiveTab(locale.key)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                            activeTab === locale.key
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                        }`}
                                    >
                                        {locale.label}
                                    </button>
                                ))}
                            </div>

                            {LOCALES.map(locale => (
                                <div key={locale.key} className={activeTab === locale.key ? "space-y-4" : "hidden"}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {t("title", { fallback: "العنوان" })}
                                            {(locale.key === "ar" || locale.key === "en") && <span className="text-red-500 ms-1">*</span>}
                                        </label>
                                        <input
                                            {...register(`${locale.key as "ar" | "en" | "fa" | "ms" | "tr" | "iid"}.title`)}
                                            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                                            placeholder={`${t("title", { fallback: "العنوان" })} (${locale.label})`}
                                        />
                                        {(errors as any)?.[locale.key]?.title && (
                                            <p className="text-xs text-red-500">{(errors as any)[locale.key].title.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {t("description", { fallback: "الوصف" })}
                                            {(locale.key === "ar" || locale.key === "en") && <span className="text-red-500 ms-1">*</span>}
                                        </label>
                                        <textarea
                                            {...register(`${locale.key as "ar" | "en" | "fa" | "ms" | "tr" | "iid"}.description`)}
                                            rows={4}
                                            className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                                            placeholder={`${t("description", { fallback: "الوصف" })} (${locale.label})`}
                                        />
                                        {(errors as any)?.[locale.key]?.description && (
                                            <p className="text-xs text-red-500">{(errors as any)[locale.key].description.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800 gap-3">
                            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="h-11 px-8 rounded-xl">
                                {t("cancel", { fallback: "إلغاء" })}
                            </Button>
                            <Button type="submit" disabled={isPending} className="h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md">
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {t("save", { fallback: "حفظ" })}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
