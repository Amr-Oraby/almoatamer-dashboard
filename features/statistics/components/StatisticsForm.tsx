"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useStatistics, useUpdateStatistics } from "../hooks";
import { Loader2, TrendingUp, Award } from "lucide-react";
import { StatisticsUpdateRequest } from "../types";

export function StatisticsForm() {
  const t = useTranslations("Statistics");
  const { data: statisticsData, isLoading } = useStatistics();
  const { mutate: updateStatistics, isPending } = useUpdateStatistics();

  const { register, handleSubmit, reset } = useForm<StatisticsUpdateRequest>({
    defaultValues: {
      experience_years: 0,
      prizes: 0,
    },
  });

  useEffect(() => {
    if (statisticsData?.data) {
      reset({
        experience_years: statisticsData.data.experience_years,
        prizes: statisticsData.data.prizes,
      });
    }
  }, [statisticsData, reset]);

  function onSubmit(values: StatisticsUpdateRequest) {
    updateStatistics({
      experience_years: Number(values.experience_years),
      prizes: Number(values.prizes),
    });
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {t("title", { fallback: "Statistics" })}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {t("description", { fallback: "Manage website statistics." })}
        </p>
      </div>
      
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Years Input */}
            <div className="flex flex-col gap-3">
              <label htmlFor="experience_years" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                {t("experience_years", { fallback: "Experience Years" })}
              </label>
              <input
                id="experience_years"
                type="number"
                className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                {...register("experience_years", { valueAsNumber: true })}
              />
            </div>

            {/* Prizes Input */}
            <div className="flex flex-col gap-3">
              <label htmlFor="prizes" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Award className="w-4 h-4 text-amber-500" />
                {t("prizes", { fallback: "Prizes" })}
              </label>
              <input
                id="prizes"
                type="number"
                className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                {...register("prizes", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button type="submit" disabled={isPending} className="w-full md:w-auto min-w-[140px] h-11 text-base">
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {t("update", { fallback: "Update" })}
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
