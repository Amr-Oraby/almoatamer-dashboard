"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload } from "lucide-react";
import { useUpdateHomeBanner, useHomeBanner } from "../hooks";
import { updateHomeBannerSchema, UpdateHomeBannerFormValues } from "../schemas";

interface UpdateHomeBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    bannerId: string | null;
}

export function UpdateHomeBannerModal({ isOpen, onClose, bannerId }: UpdateHomeBannerModalProps) {
    const t = useTranslations("HomeBanners");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    
    const { mutateAsync: updateHomeBanner, isPending } = useUpdateHomeBanner(bannerId || "");
    const { data: bannerData, isLoading } = useHomeBanner(bannerId || "");

    const { handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<UpdateHomeBannerFormValues>({
        resolver: zodResolver(updateHomeBannerSchema),
        defaultValues: {
            is_active: true,
        }
    });

    const isActive = watch("is_active");

    useEffect(() => {
        if (bannerData?.data && isOpen) {
            reset({
                is_active: bannerData.data.is_active,
            });
            if (bannerData.data.image) {
                setPreviewImage(bannerData.data.image);
            }
        }
    }, [bannerData, isOpen, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            onClose();
            setTimeout(() => {
                reset();
                setPreviewImage(null);
            }, 300);
        }
    };

    const onSubmit = async (values: UpdateHomeBannerFormValues) => {
        if (!bannerId) return;
        try {
            const formData = new FormData();
            formData.append("home_banner_id", bannerId);
            formData.append("is_active", values.is_active ? "1" : "0");
            
            if (values.image) {
                formData.append("image", values.image);
            }

            await updateHomeBanner(formData);
            handleOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px] w-[95vw]" showCloseButton={false}>
                <DialogHeader className="flex flex-row items-center justify-between pr-8">
                    <DialogTitle>{t("update", { fallback: "Update Banner" })}</DialogTitle>
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

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateHomeBannerFormValues))} className="space-y-6 mt-4">
                        <div className="space-y-2 h-full flex flex-col">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {t("image", { fallback: "Image" })}
                            </label>
                            
                            <div className="mt-2 flex justify-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 px-6 py-8 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors relative overflow-hidden group">
                                {previewImage ? (
                                    <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-sm font-medium flex items-center gap-2">
                                                <Upload className="w-4 h-4" /> Change Image
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="mx-auto h-8 w-8 text-zinc-400" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                            <label
                                                htmlFor="file-upload-update"
                                                className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500"
                                            >
                                                <span>{t("upload_files", { fallback: "Upload file" })}</span>
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-zinc-500">PNG, JPG, WEBP up to 5MB</p>
                                    </div>
                                )}
                                <input
                                    id="file-upload-update"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {errors.image && <p className="text-xs text-red-500">{errors.image.message as string}</p>}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                                className="h-11 px-8 rounded-xl"
                            >
                                {t("cancel", { fallback: "Cancel" })}
                            </Button>
                            <Button type="submit" disabled={isPending} className="w-full sm:w-auto h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md">
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {t("save", { fallback: "Save" })}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
