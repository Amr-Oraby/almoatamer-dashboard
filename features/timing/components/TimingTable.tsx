"use client";

import { useState } from "react";
import { useTimings, useToggleTimingDay } from "../hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Loader2, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { BulkUpdateModal } from "./BulkUpdateModal";
import { UpdateDayModal } from "./UpdateDayModal";
import { AddDayModal } from "./AddDayModal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";

const MAX_DAYS_PER_MONTH: Record<number, number> = {
    1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
};

export function TimingTable() {
    const t = useTranslations("Timing");
    const { data: response, isLoading, isError } = useTimings();
    const { mutate: toggleDay, isPending: isToggling } = useToggleTimingDay();
    const [selectedDays, setSelectedDays] = useState<Set<number>>(new Set());
    
    // Accordion state
    const [openMonth, setOpenMonth] = useState<number | null>(null);

    // Confirm Modal state
    const [dayToToggle, setDayToToggle] = useState<number | null>(null);

    const toggleSelection = (id: number) => {
        const newSet = new Set(selectedDays);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedDays(newSet);
    };

    const clearSelection = () => {
        setSelectedDays(new Set());
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    if (isError || !response?.data) {
        return (
            <div className="text-center py-10 text-zinc-500">
                {t("failed_to_load") || "Failed to load timing data."}
            </div>
        );
    }

    const months = response.data;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t("months")}</h2>
                <BulkUpdateModal 
                    selectedDayIds={Array.from(selectedDays)} 
                    onClearSelection={clearSelection} 
                />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                {months.map((month) => (
                    <Collapsible 
                        key={month.id} 
                        open={openMonth === month.id} 
                        onOpenChange={(isOpen) => setOpenMonth(isOpen ? month.id : null)}
                    >
                        <Card className="border border-zinc-200 dark:border-zinc-800">
                            <CollapsibleTrigger 
                                nativeButton={false}
                                render={<CardHeader className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 flex flex-row items-center justify-between p-4 transition-colors" />}
                            >
                                <div className="flex items-center gap-4">
                                    <CardTitle className="text-lg">
                                        {t("month")} {month.month}
                                    </CardTitle>
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                        ({month.days.length} / {MAX_DAYS_PER_MONTH[month.month] || 31} {t("days")})
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <AddDayModal 
                                            monthId={month.id} 
                                            disabled={month.days.length >= (MAX_DAYS_PER_MONTH[month.month] || 31)} 
                                        />
                                    </div>
                                    <ChevronDown className={cn("h-5 w-5 text-zinc-500 transition-transform", openMonth === month.id && "rotate-180")} />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="p-4 pt-0 border-t border-zinc-100 dark:border-zinc-800">
                                    {month.days.length === 0 ? (
                                        <div className="py-8 text-center text-zinc-500 text-sm">
                                            {t("no_days") || "No days configured."}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                            {month.days.map((day) => (
                                                <div 
                                                    key={day.id} 
                                                    className={cn(
                                                        "border rounded-lg p-4 transition-colors",
                                                        selectedDays.has(day.id) 
                                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
                                                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <input 
                                                                type="checkbox" 
                                                                className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                                                                checked={selectedDays.has(day.id)}
                                                                onChange={() => toggleSelection(day.id)}
                                                            />
                                                            <span className="font-semibold text-lg">{t("day")} {day.day}</span>
                                                            <UpdateDayModal day={day} />
                                                        </div>
                                                        <Switch 
                                                            checked={day.is_open} 
                                                            onChange={() => setDayToToggle(day.id)} 
                                                        />
                                                    </div>
                                                    
                                                    <div className="space-y-1 text-sm mt-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-zinc-500">{t("price")}:</span>
                                                            <span className="font-medium">{day.price}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-zinc-500">{t("app_tax")}:</span>
                                                            <span className="font-medium">{day.app_tax}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-zinc-500">{t("vat")}:</span>
                                                            <span className="font-medium">{day.vat}%</span>
                                                        </div>
                                                        <div className="flex justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800 mt-1">
                                                            <span className="text-zinc-600 font-medium">{t("total")}:</span>
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">{Number(day.total_price).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>
                ))}
            </div>

            <ConfirmDialog 
                isOpen={dayToToggle !== null}
                onClose={() => setDayToToggle(null)}
                onConfirm={() => {
                    if (dayToToggle !== null) {
                        toggleDay(dayToToggle, {
                            onSuccess: () => {
                                setDayToToggle(null);
                            }
                        });
                    }
                }}
                isLoading={isToggling}
                title={t("confirm_toggle")}
                description={t("confirm_toggle_desc")}
                confirmText={t("save")}
                cancelText={t("cancel")}
            />
        </div>
    );
}
