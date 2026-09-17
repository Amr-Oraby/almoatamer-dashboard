"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTimingDayValues, addTimingDaySchema } from "../schemas";
import { useAddTimingDay } from "../hooks";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { Loader2, Plus } from "lucide-react";

export function AddDayModal({ monthId, disabled }: { monthId: number, disabled?: boolean }) {
    const t = useTranslations("Timing");
    const { mutate: addDay, isPending } = useAddTimingDay();
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<AddTimingDayValues>({
        resolver: zodResolver(addTimingDaySchema),
        defaultValues: {
            timing_id: monthId,
            price: "",
            app_tax: "",
            is_open: true,
        }
    });

    const isOpenValue = watch("is_open");

    useEffect(() => {
        if (open) {
            setValue("timing_id", monthId);
        }
    }, [monthId, open, setValue]);

    const onSubmit = (data: AddTimingDayValues) => {
        const formData = new FormData();
        formData.append("timing_id", data.timing_id.toString());
        formData.append("price", data.price.toString());
        formData.append("app_tax", data.app_tax.toString());
        formData.append("is_open", data.is_open ? "1" : "0");
        
        addDay(formData, {
            onSuccess: () => {
                setOpen(false);
                reset();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) reset();
        }}>
            <DialogTrigger render={
                <Button variant="outline" size="sm" disabled={disabled} className="gap-1 h-8">
                    <Plus className="w-4 h-4" />
                    {t("add_day")}
                </Button>
            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("add_day")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as AddTimingDayValues))} className="space-y-4 mt-4">
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
                    <div className="flex items-center justify-between pt-2">
                        <label className="text-sm font-medium">{t("is_open") || "Is Open"}</label>
                        <Switch 
                            checked={isOpenValue} 
                            onChange={() => setValue("is_open", !isOpenValue)} 
                        />
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
