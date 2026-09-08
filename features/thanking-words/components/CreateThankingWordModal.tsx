"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Upload } from "lucide-react";
import { useCreateThankingWord } from "../hooks";
import { createThankingWordSchema, CreateThankingWordFormValues } from "../schemas";

export function CreateThankingWordModal() {
    const t = useTranslations("ThankingWords");
    const commonT = useTranslations("Common");
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { mutateAsync: createThankingWord, isPending } = useCreateThankingWord();

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<CreateThankingWordFormValues>({
        resolver: zodResolver(createThankingWordSchema),
        defaultValues: {
            is_active: true,
            name: "",
            text: "",
        }
    });

    const isActive = watch("is_active");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            reset();
            setPreviewImage(null);
        }
    };

    const onSubmit = async (values: CreateThankingWordFormValues) => {
        try {
            await createThankingWord(values);
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
                    <DialogTitle>{t("create_new", { fallback: "Create New Thanking Word" })}</DialogTitle>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Text Inputs */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {t("name", { fallback: "Name" })} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register("name")}
                                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                                    placeholder="Thank you note"
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
                            </div>

                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {t("text", { fallback: "Text Content" })} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    {...register("text")}
                                    className="flex min-h-[160px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 resize-none"
                                    placeholder="Thanking text content"
                                />
                                {errors.text && <p className="text-xs text-red-500">{errors.text.message as string}</p>}
                            </div>
                        </div>

                        {/* Right Column: Image Upload */}
                        <div className="space-y-2 h-full flex flex-col">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {t("image", { fallback: "Image" })} <span className="text-red-500">*</span>
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
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500"
                                            >
                                                <span>Upload a file</span>
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-zinc-500">PNG, JPG, WEBP up to 5MB</p>
                                    </div>
                                )}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {errors.image && <p className="text-xs text-red-500">{errors.image.message as string}</p>}
                        </div>
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
