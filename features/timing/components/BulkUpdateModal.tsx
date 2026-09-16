"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BulkUpdateTimingDaysValues, bulkUpdateTimingDaysSchema } from "../schemas";
import { useBulkUpdateTimingDays } from "../hooks";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function BulkUpdateModal({ selectedDayIds, onClearSelection }: { selectedDayIds: number[], onClearSelection: () => void }) {
    const t = useTranslations("Timing");
    const { mutate: bulkUpdate, isPending } = useBulkUpdateTimingDays();
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<BulkUpdateTimingDaysValues>({
        resolver: zodResolver(bulkUpdateTimingDaysSchema),
        defaultValues: {
            day_ids: selectedDayIds,
            price: "",
            app_tax: "",
        }
    });

    useEffect(() => {
        setValue("day_ids", selectedDayIds);
    }, [selectedDayIds, setValue]);

    const onSubmit = (data: BulkUpdateTimingDaysValues) => {
        const formData = new FormData();
        selectedDayIds.forEach(id => formData.append("day_ids[]", id.toString()));
        formData.append("price", data.price.toString());
        formData.append("app_tax", data.app_tax.toString());
        
        bulkUpdate(formData, {
            onSuccess: () => {
                setOpen(false);
                reset();
                onClearSelection();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) reset();
        }}>
            <DialogTrigger render={<Button disabled={selectedDayIds.length === 0} variant="default">{t("bulk_update")} ({selectedDayIds.length})</Button>} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("bulk_update_days")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4 mt-4">
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
                    <DialogFooter className="mt-6">
                        <DialogClose render={<Button variant="outline" type="button">{t("cancel")}</Button>} />
                        <Button type="submit" disabled={isPending}>{t("save")}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
