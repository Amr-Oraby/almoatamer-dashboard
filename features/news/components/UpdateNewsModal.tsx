"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useUpdateNews, useNewsItem } from "../hooks";
import { updateNewsSchema, UpdateNewsFormValues } from "../schemas";

interface UpdateNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsId: string | null;
}

export function UpdateNewsModal({ isOpen, onClose, newsId }: UpdateNewsModalProps) {
    const t = useTranslations("News");

    const { mutateAsync: updateNews, isPending } = useUpdateNews(newsId || "");
    const { data: newsData, isLoading } = useNewsItem(newsId || "");

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<UpdateNewsFormValues>({
        resolver: zodResolver(updateNewsSchema),
        defaultValues: {
            title: "",
            description: "",
            is_active: true,
        }
    });

    const isActive = watch("is_active");

    useEffect(() => {
        if (newsData?.data && isOpen) {
            const item = newsData.data;
            reset({
                title: item.title || "",
                description: item.description || "",
                is_active: item.is_active,
            });
        }
    }, [newsData, isOpen, reset]);

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            onClose();
            setTimeout(() => {
                reset();
            }, 300);
        }
    };

    const onSubmit = async (values: UpdateNewsFormValues) => {
        if (!newsId) return;
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("is_active", values.is_active ? "1" : "0");

            await updateNews(formData);
            handleOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl">
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
                    <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateNewsFormValues))} className="p-6 space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {t("title", { fallback: "العنوان" })} <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("title")}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {t("description", { fallback: "الوصف" })} <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                {...register("description")}
                                rows={5}
                                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
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
