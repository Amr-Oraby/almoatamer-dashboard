"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Upload, X } from "lucide-react";
import { useCreateHomeBanner } from "../hooks";
import { createHomeBannerSchema, CreateHomeBannerFormValues } from "../schemas";

export function CreateHomeBannerModal() {
    const t = useTranslations("HomeBanners");
    const commonT = useTranslations("Common");
    const [open, setOpen] = useState(false);
    const [previewImages, setPreviewImages] = useState<{ url: string; file: File }[]>([]);
    const { mutateAsync: createHomeBanner, isPending } = useCreateHomeBanner();

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<CreateHomeBannerFormValues>({
        resolver: zodResolver(createHomeBannerSchema),
        defaultValues: {
            is_active: true,
            images: [],
        }
    });

    const isActive = watch("is_active");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newPreviewImages = files.map(file => ({
                url: URL.createObjectURL(file),
                file
            }));
            const updatedPreviewImages = [...previewImages, ...newPreviewImages];
            setPreviewImages(updatedPreviewImages);
            setValue("images", updatedPreviewImages.map(p => p.file), { shouldValidate: true });
        }
    };

    const removeImage = (index: number) => {
        const updatedPreviewImages = [...previewImages];
        updatedPreviewImages.splice(index, 1);
        setPreviewImages(updatedPreviewImages);
        setValue("images", updatedPreviewImages.map(p => p.file), { shouldValidate: true });
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            reset();
            setPreviewImages([]);
        }
    };

    const onSubmit = async (values: CreateHomeBannerFormValues) => {
        try {
            await createHomeBanner(values);
            handleOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center gap-2" />}>
                <Plus className="h-4 w-4" />
                {commonT("add", { fallback: "Add" })}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px] w-[95vw]" showCloseButton={false}>
                <DialogHeader className="flex flex-row items-center justify-between pr-8">
                    <DialogTitle>{t("create_new", { fallback: "Create New Banner" })}</DialogTitle>
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer" onClick={() => setValue("is_active", !isActive)}>
                            {t("is_active", { fallback: "Active Status" })}
                        </label>
                        <Switch
                            checked={isActive}
                            onChange={() => setValue("is_active", !isActive)}
                        />
                    </div>
                </DialogHeader>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {t("images", { fallback: "Images" })} <span className="text-red-500">*</span>
                        </label>
                        
                        <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors relative">
                            {previewImages.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {previewImages.map((image, index) => (
                                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-zinc-200 dark:border-zinc-800">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={image.url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="relative aspect-square rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
                                        <Plus className="h-6 w-6 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                                        <span className="text-xs text-zinc-500 mt-1">{t("add_more", { fallback: "Add More" })}</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Upload className="mx-auto h-8 w-8 text-zinc-400" aria-hidden="true" />
                                    <div className="mt-4 flex justify-center text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500"
                                        >
                                            <span>{t("upload_files", { fallback: "Upload files" })}</span>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-zinc-500">PNG, JPG, WEBP up to 5MB</p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            )}
                        </div>
                        {errors.images && <p className="text-xs text-red-500">{errors.images.message as string}</p>}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <Button type="submit" disabled={isPending} className="w-full sm:w-auto h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md">
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t("save", { fallback: "Save" })}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
