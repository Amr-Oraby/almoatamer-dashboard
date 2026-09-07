"use client";

import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useHowToStart, useUpdateHowToStart } from "../hooks";
import { Loader2, Plus, Trash2, Info, ListOrdered } from "lucide-react";

interface FormValues {
  main: {
    en: { title: string; description: string };
    ar: { title: string; description: string };
  };
  contents: {
    en: { title: string; description: string };
    ar: { title: string; description: string };
  }[];
}

export function HowToStartForm() {
  const t = useTranslations("HowToStart");
  const { data: response, isLoading } = useHowToStart();
  const { mutate: updateHowToStart, isPending } = useUpdateHowToStart();

  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      main: {
        en: { title: "", description: "" },
        ar: { title: "", description: "" },
      },
      contents: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  });

  useEffect(() => {
    if (response?.data) {
      const data = response.data;
      reset({
        main: {
          en: { 
            title: data.how_to_start.en?.title || "", 
            description: data.how_to_start.en?.description || "" 
          },
          ar: { 
            title: data.how_to_start.ar?.title || "", 
            description: data.how_to_start.ar?.description || "" 
          },
        },
        contents: data.contents?.map((c) => ({
          en: { title: c.en?.title || "", description: c.en?.description || "" },
          ar: { title: c.ar?.title || "", description: c.ar?.description || "" },
        })) || [],
      });
    }
  }, [response, reset]);

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    
    formData.append("en[title]", values.main.en.title);
    formData.append("en[description]", values.main.en.description);
    formData.append("ar[title]", values.main.ar.title);
    formData.append("ar[description]", values.main.ar.description);

    values.contents.forEach((content, index) => {
      formData.append(`content[${index}][en][title]`, content.en.title);
      formData.append(`content[${index}][en][description]`, content.en.description);
      formData.append(`content[${index}][ar][title]`, content.ar.title);
      formData.append(`content[${index}][ar][description]`, content.ar.description);
    });

    updateHowToStart(formData);
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto">
      
      {/* Main Info Card */}
      <div className="w-full bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/60 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {t("main_info", { fallback: "Main Information" })}
              </h2>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {t("english_title", { fallback: "Title (English)" })}
              </label>
              <input
                type="text"
                className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                {...register("main.en.title")}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {t("arabic_title", { fallback: "Title (Arabic)" })}
              </label>
              <input
                type="text"
                className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right"
                dir="rtl"
                {...register("main.ar.title")}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {t("english_desc", { fallback: "Description (English)" })}
              </label>
              <textarea
                className="w-full min-h-[100px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
                {...register("main.en.description")}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {t("arabic_desc", { fallback: "Description (Arabic)" })}
              </label>
              <textarea
                className="w-full min-h-[100px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y text-right"
                dir="rtl"
                {...register("main.ar.description")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Steps List Card */}
      <div className="w-full bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/40 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300">
              <ListOrdered className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {t("steps", { fallback: "Steps" })}
            </h2>
          </div>
          <Button 
            type="button" 
            variant="outline"
            className="rounded-xl border-dashed border-2"
            onClick={() => append({ en: { title: "", description: "" }, ar: { title: "", description: "" } })}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("add_step", { fallback: "Add Step" })}
          </Button>
        </div>
        
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {fields.map((field, index) => (
            <div key={field.id} className="relative p-6 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-zinc-400 dark:text-zinc-500">
                  {t("step", { fallback: "Step" })} {index + 1}
                </span>
                <Button 
                  type="button" 
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                  onClick={() => remove(index)}
                  title={t("remove_step", { fallback: "Remove Step" })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {t("english_title", { fallback: "Title (English)" })}
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    {...register(`contents.${index}.en.title` as const)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {t("arabic_title", { fallback: "Title (Arabic)" })}
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right"
                    dir="rtl"
                    {...register(`contents.${index}.ar.title` as const)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {t("english_desc", { fallback: "Description (English)" })}
                  </label>
                  <textarea
                    className="w-full min-h-[100px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
                    {...register(`contents.${index}.en.description` as const)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {t("arabic_desc", { fallback: "Description (Arabic)" })}
                  </label>
                  <textarea
                    className="w-full min-h-[100px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y text-right"
                    dir="rtl"
                    {...register(`contents.${index}.ar.description` as const)}
                  />
                </div>
              </div>
            </div>
          ))}
          
          {fields.length === 0 && (
            <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
              No steps added yet. Click "Add Step" to begin.
            </div>
          )}

          <div className="pt-8 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button type="submit" disabled={isPending} className="w-full md:w-auto min-w-[160px] h-12 rounded-xl text-base font-medium transition-all shadow-sm">
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {t("update", { fallback: "Save Changes" })}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
