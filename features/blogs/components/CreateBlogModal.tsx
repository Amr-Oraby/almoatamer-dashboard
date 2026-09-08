"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Upload, X } from "lucide-react";
import { useCreateBlog } from "../hooks";
import { createBlogSchema, CreateBlogFormValues } from "../schemas";

export function CreateBlogModal() {
    const t = useTranslations("Blogs");
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"ar" | "en">("ar");
    const [previewImage, setPreviewImage] = useState<{ url: string; file: File } | null>(null);
    const { mutateAsync: createBlog, isPending } = useCreateBlog();

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<CreateBlogFormValues>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            is_active: true,
            ar: { title: "", description: "", alt: "", slug: "", canonical: "", short_desc: "", keywords: "" },
            en: { title: "", description: "", alt: "", slug: "", canonical: "", short_desc: "", keywords: "" },
        }
    });

    const isActive = watch("is_active");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage({ url: URL.createObjectURL(file), file });
            setValue("image", [file], { shouldValidate: true });
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setValue("image", [], { shouldValidate: true });
    };

    const onSubmit = async (data: CreateBlogFormValues) => {
        try {
            const formData = new FormData();
            formData.append("is_active", data.is_active ? "1" : "0");

            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            Object.entries(data.ar).forEach(([key, value]) => {
                formData.append(`ar[${key}]`, (value as string) || "");
            });

            Object.entries(data.en).forEach(([key, value]) => {
                formData.append(`en[${key}]`, (value as string) || "");
            });

            await createBlog(formData);
            setOpen(false);
            reset();
            setPreviewImage(null);
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            reset();
            setPreviewImage(null);
            setActiveTab("ar");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm"><Plus className="w-4 h-4" /> {t("create_new")}</Button>} />
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-900 sticky top-0 bg-white dark:bg-zinc-950 z-10">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {t("create_new")}
                        </DialogTitle>
                        <Switch
                            checked={isActive}
                            onChange={() => setValue("is_active", !isActive)}
                        />
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as CreateBlogFormValues))} className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {t("upload_files")}
                        </label>
                        <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors relative">
                            {previewImage ? (
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
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
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("upload_files")}</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                        {errors.image && <p className="text-sm text-red-500">{errors.image.message as string}</p>}
                    </div>

                    {/* Language Tabs */}
                    <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab("ar")}
                            className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === "ar" ? "text-primary border-b-2 border-primary" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                        >
                            {t("arabic")}
                            {errors.ar && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("en")}
                            className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === "en" ? "text-primary border-b-2 border-primary" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                        >
                            {t("english")}
                            {errors.en && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
                        </button>
                    </div>

                    {/* Dynamic Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">{t("title")}</label>
                            <input
                                {...register(`${activeTab}.title`)}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            {errors[activeTab]?.title && <p className="text-sm text-red-500">{errors[activeTab]?.title?.message as string}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">{t("description")}</label>
                            <textarea
                                {...register(`${activeTab}.description`)}
                                rows={4}
                                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                            {errors[activeTab]?.description && <p className="text-sm text-red-500">{errors[activeTab]?.description?.message as string}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">{t("short_desc")}</label>
                            <textarea
                                {...register(`${activeTab}.short_desc`)}
                                rows={2}
                                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                            {errors[activeTab]?.short_desc && <p className="text-sm text-red-500">{errors[activeTab]?.short_desc?.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("alt")}</label>
                            <input
                                {...register(`${activeTab}.alt`)}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            {errors[activeTab]?.alt && <p className="text-sm text-red-500">{errors[activeTab]?.alt?.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("slug")}</label>
                            <input
                                {...register(`${activeTab}.slug`)}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                                dir="ltr"
                            />
                            {errors[activeTab]?.slug && <p className="text-sm text-red-500">{errors[activeTab]?.slug?.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("canonical")}</label>
                            <input
                                {...register(`${activeTab}.canonical`)}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                                dir="ltr"
                            />
                            {errors[activeTab]?.canonical && <p className="text-sm text-red-500">{errors[activeTab]?.canonical?.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("keywords")}</label>
                            <input
                                {...register(`${activeTab}.keywords`)}
                                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="keyword1, keyword2..."
                            />
                            {errors[activeTab]?.keywords && <p className="text-sm text-red-500">{errors[activeTab]?.keywords?.message as string}</p>}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-md"
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("save")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
