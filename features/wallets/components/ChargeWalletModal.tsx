"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useChargeWallet } from "../hooks";
import { chargeWalletSchema, ChargeWalletFormValues } from "../schemas";

interface ChargeWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
    userName: string;
}

export function ChargeWalletModal({ isOpen, onClose, userId, userName }: ChargeWalletModalProps) {
    const t = useTranslations("Wallets");
    const { mutate: chargeWallet, isPending } = useChargeWallet();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChargeWalletFormValues>({
        resolver: zodResolver(chargeWalletSchema),
        defaultValues: {
            amount: "",
        }
    });

    const onSubmit = (data: ChargeWalletFormValues) => {
        const formData = new FormData();
        formData.append("moatmer_id", String(userId));
        formData.append("amount", String(data.amount));

        chargeWallet(formData, {
            onSuccess: () => {
                onClose();
                reset();
            }
        });
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            onClose();
            reset();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <DialogHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {t("charge_wallet")}
                    </DialogTitle>
                    <p className="text-sm text-zinc-500 mt-2">
                        {t("charge_for")} <span className="font-bold text-zinc-900 dark:text-zinc-100">{userName}</span>
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("charge_amount")}</label>
                        <div className="relative">
                            <input
                                type="number"
                                {...register("amount")}
                                className="w-full h-10 px-3 pr-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                                dir="ltr"
                                placeholder="0.00"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none">
                                ر.س
                            </span>
                        </div>
                        {errors.amount && <p className="text-sm text-red-500">{errors.amount.message as string}</p>}
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-md w-full"
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("charge")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
