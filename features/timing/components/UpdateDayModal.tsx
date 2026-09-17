"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTimingDayValues, updateTimingDaySchema } from "../schemas";
import { useUpdateTimingDay } from "../hooks";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Edit, Loader2 } from "lucide-react";
import { TimingDay } from "../types";

export function UpdateDayModal({ day }: { day: TimingDay }) {
    const t = useTranslations("Timing");
    const { mutate: updateDay, isPending } = useUpdateTimingDay(day.id);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UpdateTimingDayValues>({
        resolver: zodResolver(updateTimingDaySchema),
        defaultValues: {
            price: day.price.toString(),
            app_tax: day.app_tax.toString(),
        }
    });

    useEffect(() => {
        if (open) {
            setValue("price", day.price.toString());
            setValue("app_tax", day.app_tax.toString());
        }
    }, [day, open, setValue]);

    const onSubmit = (data: UpdateTimingDayValues) => {
        const formData = new FormData();
        formData.append("price", data.price.toString());
        formData.append("app_tax", data.app_tax.toString());
        
        updateDay(formData, {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) reset();
        }}>
            <DialogTrigger render={
                <button className="text-zinc-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Edit className="w-4 h-4" />
                </button>
            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("update_day") || "Update Day"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateTimingDayValues))} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("price")}</label>
                        <input type="number" step="any" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("price")} />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("app_tax")}</label>
                        <input type="number" step="any" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("app_tax")} />
                        {errors.app_tax && <span className="text-red-500 text-sm">{errors.app_tax.message}</span>}
                    </div>
                    <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {t("cancel")}
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {t("save")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
