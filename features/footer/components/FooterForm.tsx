"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useFooterInfo, useUpdateFooterInfo } from "../hooks";
import { Loader2 } from "lucide-react";
import { footerSchema, FooterFormValues } from "../schemas";

import { FormLayout } from "@/components/ui/FormLayout";
import { LocalizedTextareas } from "@/components/ui/LocalizedTextareas";

export function FooterForm() {
  const t = useTranslations("Dashboard");
  const tSettings = useTranslations("Settings");
  const { data: response, isLoading } = useFooterInfo();
  const { mutateAsync: updateFooter, isPending } = useUpdateFooterInfo();

  const { register, handleSubmit, reset } = useForm<FooterFormValues>({
    resolver: zodResolver(footerSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (response?.data) {
      reset({
        en: { info: response.data.en?.info || "" },
        ar: { info: response.data.ar?.info || "" },
        fa: { info: response.data.fa?.info || "" },
        ms: { info: response.data.ms?.info || "" },
        tr: { info: response.data.tr?.info || "" },
        iid: { info: response.data.iid?.info || "" },
      });
    }
  }, [response, reset]);

  async function onSubmit(values: FooterFormValues) {
    const formData = new FormData();
    const type = response?.data?.type || "home_footer";
    formData.append("type", type);

    const langs = ["en", "ar", "fa", "ms", "tr", "iid"] as const;
    langs.forEach((lang) => {
      const info = values[lang]?.info;
      if (info !== undefined && info !== null) {
        const key = lang === "iid" ? "id" : lang;
        formData.append(`${key}[info]`, info);
      }
    });

    try {
      await updateFooter(formData);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <FormLayout 
      title={t("footer", { fallback: "Footer Info" })}
      description={tSettings("footer_desc", { fallback: "Manage the footer information text." })}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-2">
          <div className="flex flex-col gap-1 mb-8">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 tracking-tight">
              Localized Information
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">Multilingual</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Update the footer text content for each supported language below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LocalizedTextareas register={register} />
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <Button type="submit" disabled={isPending} className="w-full md:w-auto min-w-[200px] h-12 rounded-xl text-base font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {tSettings("update", { fallback: "Update Settings" })}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
