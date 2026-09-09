"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload, X } from "lucide-react";
import { useUpdateNews, useNewsItem } from "../hooks";
import { updateNewsSchema, UpdateNewsFormValues } from "../schemas";

const INPUT_CLASS = "w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm";
const TEXTAREA_CLASS = "w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm";

interface UpdateNewsFormProps {
    newsId: string;
}

export function UpdateNewsForm({ newsId }: UpdateNewsFormProps) {
    const t = useTranslations("News");
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"ar" | "en">("ar");
    const [previewImage, setPreviewImage] = useState<{ url: string; isExisting?: boolean } | null>(null);

    const { mutateAsync: updateNews, isPending } = useUpdateNews(newsId);
    const { data: newsData, isLoading } = useNewsItem(newsId);

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<UpdateNewsFormValues>({
        resolver: zodResolver(updateNewsSchema),
        defaultValues: {
            is_active: true,
            ar: { title: "", description: "", alt: "", slug: "", canonical: "", short_desc: "", keywords: "" },
            en: { title: "", description: "", alt: "", slug: "", canonical: "", short_desc: "", keywords: "" },
        }
    });

    const isActive = watch("is_active");

    useEffect(() => {
        if (newsData?.data) {
            const item = newsData.data;
            reset({
                is_active: item.is_active,
                ar: { title: item.title || "", description: item.description || "", alt: item.alt || "", slug: item.slug || "", canonical: item.canonical || "", short_desc: item.short_desc || "", keywords: item.keywords || "" },
                en: { title: item.title || "", description: item.description || "", alt: item.alt || "", slug: item.slug || "", canonical: item.canonical || "", short_desc: item.short_desc || "", keywords: item.keywords || "" },
            });
            if (item.images?.image) {
                setPreviewImage({ url: item.images.image, isExisting: true });
            }
        }
    }, [newsData, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage({ url: URL.createObjectURL(file) });
            setValue("image", file);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setValue("image", undefined);
    };

    const onSubmit = async (values: UpdateNewsFormValues) => {
        try {
            const formData = new FormData();
            formData.append("is_active", values.is_active ? "1" : "0");
            if (values.image) formData.append("image", values.image);
            Object.entries(values.ar).forEach(([key, value]) => formData.append(`ar[${key}]`, (value as string) || ""));
            Object.entries(values.en).forEach(([key, value]) => formData.append(`en[${key}]`, (value as string) || ""));
            await updateNews(formData);
            router.push("/news");
        } catch (error) {
            console.error(error);
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
        <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateNewsFormValues))} className="space-y-6">
            <div className="flex items-center justify-between bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("active", { fallback: "نشط" })}</label>
                    <Switch checked={isActive} onChange={() => setValue("is_active", !isActive)} />
                </div>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" className="rounded-xl" onClick={() => router.push("/news")}>
                        {t("cancel", { fallback: "إلغاء" })}
                    </Button>
                    <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-md">
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("save", { fallback: "حفظ" })}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t("upload_files", { fallback: "الصورة" })}</h3>
                        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors relative overflow-hidden group">
                            {previewImage ? (
                                <div className="relative aspect-video">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={previewImage.url} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-xs font-medium flex items-center gap-1"><Upload className="w-3 h-3" /> تغيير الصورة</p>
                                    </div>
                                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-colors opacity-0 group-hover:opacity-100">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center px-4 cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-xs text-zinc-500">{t("upload_hint", { fallback: "PNG, JPG, WEBP" })}</p>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-5">
                    <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        {(["ar", "en"] as const).map(lang => (
                            <button key={lang} type="button" onClick={() => setActiveTab(lang)}
                                className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors relative ${activeTab === lang ? "bg-primary/10 text-primary" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}>
                                {lang === "ar" ? t("arabic", { fallback: "العربية" }) : t("english", { fallback: "English" })}
                                {errors[lang] && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium">{t("title", { fallback: "العنوان" })} <span className="text-red-500">*</span></label>
                            <input {...register(`${activeTab}.title`)} className={INPUT_CLASS} />
                            {errors[activeTab]?.title && <p className="text-xs text-red-500">{errors[activeTab]?.title?.message as string}</p>}
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium">{t("description", { fallback: "الوصف" })} <span className="text-red-500">*</span></label>
                            <textarea {...register(`${activeTab}.description`)} rows={5} className={TEXTAREA_CLASS} />
                            {errors[activeTab]?.description && <p className="text-xs text-red-500">{errors[activeTab]?.description?.message as string}</p>}
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium">{t("short_desc", { fallback: "وصف قصير" })}</label>
                            <textarea {...register(`${activeTab}.short_desc`)} rows={2} className={TEXTAREA_CLASS} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">{t("alt", { fallback: "Alt" })}</label>
                            <input {...register(`${activeTab}.alt`)} className={INPUT_CLASS} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">{t("slug", { fallback: "Slug" })}</label>
                            <input {...register(`${activeTab}.slug`)} className={INPUT_CLASS + " text-left"} dir="ltr" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">{t("canonical", { fallback: "Canonical" })}</label>
                            <input {...register(`${activeTab}.canonical`)} className={INPUT_CLASS + " text-left"} dir="ltr" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">{t("keywords", { fallback: "Keywords" })}</label>
                            <input {...register(`${activeTab}.keywords`)} className={INPUT_CLASS} placeholder="keyword1, keyword2..." />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
