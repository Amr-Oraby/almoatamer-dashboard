"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettings, useUpdateSetting, useDeleteSetting } from "../hooks";
import { Loader2, Settings, X, Plus, KeySquare, AlignLeft } from "lucide-react";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { SettingData } from "../types";

function CreateSettingCard() {
  const t = useTranslations("Settings");
  const { mutateAsync: updateSetting } = useUpdateSetting();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { isSubmitting }
  } = useForm<{ key: string; value: string }>();

  async function onSubmit(values: { key: string; value: string }) {
    if (!values.key.trim() || !values.value.trim()) {
      toast.error(t("error_update_message", { fallback: "Key and Value are required" }));
      return;
    }
    
    try {
      const parsedValue = !isNaN(Number(values.value)) && values.value !== "" ? Number(values.value) : values.value;
      await updateSetting({ [values.key]: parsedValue });
      toast.success(t("success_update_message", { fallback: "Setting created successfully" }));
      reset();
    } catch (error) {
      // Error handled by hook
    }
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/60 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {t("create_setting", { fallback: "Create New Setting" })}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {t("create_description", { fallback: "Add a new custom setting to the application." })}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 w-full space-y-3">
            <label htmlFor="new_key" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <KeySquare className="w-4 h-4 text-zinc-500" />
              {t("setting_key", { fallback: "Setting Key" })}
            </label>
            <input
              id="new_key"
              type="text"
              placeholder="e.g. app_theme_mode"
              className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
              {...register("key", { required: true })}
            />
          </div>
          
          <div className="flex-1 w-full space-y-3">
            <label htmlFor="new_value" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <AlignLeft className="w-4 h-4 text-zinc-500" />
              {t("setting_value", { fallback: "Setting Value" })}
            </label>
            <input
              id="new_value"
              type="text"
              placeholder="e.g. dark"
              className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
              {...register("value", { required: true })}
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto h-12 px-8 rounded-xl font-medium shadow-sm transition-all hover:shadow text-base">
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {t("add_setting", { fallback: "Add Setting" })}
          </Button>
        </form>
      </div>
    </div>
  );
}

function ExistingSettingsCard({ settings, isLoading }: { settings: SettingData[] | undefined, isLoading: boolean }) {
  const t = useTranslations("Settings");
  const { mutateAsync: updateSetting, isPending } = useUpdateSetting();
  const { mutate: deleteSetting, isPending: isDeleting } = useDeleteSetting();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<Record<string, string | number>>({});

  useEffect(() => {
    if (settings) {
      const defaultValues: Record<string, string | number> = {};
      settings.forEach((setting) => {
        if (setting.key !== "font_colors" && setting.key !== "discount_cards") {
          defaultValues[setting.key] = setting.value;
        }
      });
      reset(defaultValues);
    }
  }, [settings, reset]);

  async function onSubmit(values: Record<string, string | number>) {
    if (!settings) return;
    try {
      const promises = settings.map(async (setting) => {
        if (setting.key === "font_colors" || setting.key === "discount_cards") return;
        const newValue = values[setting.key];
        const parsedValue = !isNaN(Number(newValue)) && newValue !== "" ? Number(newValue) : newValue;
        
        if (String(newValue) !== String(setting.value)) {
          return updateSetting({ [setting.key]: parsedValue });
        }
      });
      await Promise.all(promises);
      toast.success(t("success_update_message", { fallback: "Updated successfully" }));
    } catch (error) {
      // Error handled by hook
    }
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const displaySettings = settings
    ? settings.filter(setting => setting.key !== "font_colors" && setting.key !== "discount_cards")
    : [];

  return (
    <div className="w-full bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {t("existing_settings", { fallback: "Existing Settings" })}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {t("description", { fallback: "Manage general app settings, pricing, and taxes." })}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySettings.map((setting) => (
              <div key={setting.key} className="flex flex-col gap-3 group">
                <label htmlFor={setting.key} className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 capitalize">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-blue-500 transition-colors" />
                  {setting.key.replace(/_/g, " ")}
                </label>
                <div className="flex gap-2 items-center relative">
                  <input
                    id={setting.key}
                    type="text"
                    className="w-full h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    {...register(setting.key)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors rounded-lg h-10 w-10"
                    onClick={() => setDeleteId(setting.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button type="submit" disabled={isPending} className="w-full md:w-auto min-w-[160px] h-12 rounded-xl text-base font-medium transition-all shadow-sm">
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {t("update", { fallback: "Update Settings" })}
            </Button>
          </div>
        </form>
      </div>

      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteSetting(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export function SettingsForm() {
  const { data: settingsResponse, isLoading } = useSettings();

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto">
      <CreateSettingCard />
      <ExistingSettingsCard settings={settingsResponse?.data} isLoading={isLoading} />
    </div>
  );
}
