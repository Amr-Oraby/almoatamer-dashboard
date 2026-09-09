"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload, X } from "lucide-react";
import { useUpdateNews, useNewsItem } from "../hooks";
import { updateNewsSchema, UpdateNewsFormValues } from "../schemas";

interface UpdateNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsId: string | null;
}

export function UpdateNewsModal({ isOpen, onClose, newsId }: UpdateNewsModalProps) {
    const t = useTranslations("News");
    const [activeTab, setActiveTab] = useState<"ar" | "en">("ar");
    const [previewImage, setPreviewImage] = useState<{ url: string; file?: File } | null>(null);

    const { mutateAsync: updateNews, isPending } = useUpdateNews(newsId || "");
    const { data: newsData, isLoading } = useNewsItem(newsId || "");

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
        if (newsData?.data && isOpen) {
            const item = newsData.data;
            reset({
                is_active: item.is_active,
                ar: {
                    title: item.title || "",
                    description: item.description || "",
                    alt: item.alt || "",
                    slug: item.slug || "",
                    canonical: item.canonical || "",
                    short_desc: item.short_desc || "",
                    keywords: item.keywords || "",
                },
                en: {
                    title: item.title || "",
                    description: item.description || "",
                    alt: item.alt || "",
                    slug: item.slug || "",
                    canonical: item.canonical || "",
                    short_desc: item.short_desc || "",
                    keywords: item.keywords || "",
                },
            });
            if (item.images?.image) {
                setPreviewImage({ url: item.images.image });
            }
        }
    }, [newsData, isOpen, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage({ url: URL.createObjectURL(file), file });
            setValue("image", file);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setValue("image", undefined);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            onClose();
            setTimeout(() => {
                reset();
                setPreviewImage(null);
                setActiveTab("ar");
            }, 300);
        }
    };

    const onSubmit = async (values: UpdateNewsFormValues) => {
        if (!newsId) return;
        try {
            const formData = new FormData();
            formData.append("is_active", values.is_active ? "1" : "0");

            if (values.image) {
                formData.append("image", values.image);
            }

            // Append AR fields
            Object.entries(values.ar).forEach(([key, value]) => {
                formData.append(`ar[${key}]`, (value as string) || "");
            });

            // Append EN fields
            Object.entries(values.en).forEach(([key, value]) => {
                formData.append(`en[${key}]`, (value as string) || "");
            });

            await updateNews(formData);
            handleOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-900 sticky top-0 bg-white dark:bg-zinc-950 z-10">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {t("edit", { fallback: "تعديل الخبر" })}
                        </DialogTitle>
                        <Switch
                            checked={isActive}
                            onChange={() => setValue("is_active", !isActive)}
                        />
                    </div>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateNewsFormValues))} className="p-6 space-y-6">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {t("upload_files", { fallback: "الصورة" })}
                            </label>
                            <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors relative">
                                {previewImage ? (
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={previewImage.url} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-3 text-center cursor-pointer">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Upload className="w-6 h-6 text-primary" />
                                        </div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("upload_files", { fallback: "رفع صورة" })}</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Language Tabs */}
                        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab("ar")}
                                className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === "ar" ? "text-primary border-b-2 border-primary" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                            >
                                {t("arabic", { fallback: "العربية" })}
                                {errors.ar && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("en")}
                                className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === "en" ? "text-primary border-b-2 border-primary" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                            >
                                {t("english", { fallback: "English" })}
                                {errors.en && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
                            </button>
                        </div>

                        {/* Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">{t("title", { fallback: "العنوان" })}</label>
                                <input
                                    {...register(`${activeTab}.title`)}
                                    className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                                {errors[activeTab]?.title && <p className="text-sm text-red-500">{errors[activeTab]?.title?.message as string}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">{t("description", { fallback: "الوصف" })}</label>
                                <textarea
                                    {...register(`${activeTab}.description`)}
                                    rows={4}
                                    className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                />
                                {errors[activeTab]?.description && <p className="text-sm text-red-500">{errors[activeTab]?.description?.message as string}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">{t("short_desc", { fallback: "وصف قصير" })}</label>
                                <textarea
                                    {...register(`${activeTab}.short_desc`)}
                                    rows={2}
                                    className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("alt", { fallback: "Alt" })}</label>
                                <input
                                    {...register(`${activeTab}.alt`)}
                                    className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("slug", { fallback: "Slug" })}</label>
                                <input
                                    {...register(`${activeTab}.slug`)}
                                    className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("canonical", { fallback: "Canonical" })}</label>
                                <input
                                    {...register(`${activeTab}.canonical`)}
                                    className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("keywords", { fallback: "Keywords" })}</label>
                                <input
                                    {...register(`${activeTab}.keywords`)}
                                    className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="keyword1, keyword2..."
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="rounded-xl px-8">
                                {t("cancel", { fallback: "إلغاء" })}
                            </Button>
                            <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-md">
                                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("save", { fallback: "حفظ" })}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
