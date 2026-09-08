"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useWhoIsAlmuatamerInfo, useUpdateWhoIsAlmuatamerInfo } from "../hooks";
import { Loader2 } from "lucide-react";
import { whoIsAlmuatamerSchema, WhoIsAlmuatamerFormValues } from "../schemas";

import { FormLayout } from "@/components/ui/FormLayout";
import { ImageChanger } from "@/components/ui/ImageChanger";
import { LocalizedTextareas } from "@/components/ui/LocalizedTextareas";

export function WhoIsAlmuatamerForm() {
  const tSettings = useTranslations("Settings");
  const { data: response, isLoading } = useWhoIsAlmuatamerInfo();
  const { mutateAsync: updateWhoIsAlmuatamer, isPending } = useUpdateWhoIsAlmuatamerInfo();
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, reset } = useForm<WhoIsAlmuatamerFormValues>({
    resolver: zodResolver(whoIsAlmuatamerSchema),
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

  useEffect(() => {
    if (response?.data?.image && !previewImage) {
      setPreviewImage(response.data.image);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data?.image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: WhoIsAlmuatamerFormValues) {
    const formData = new FormData();
    const type = response?.data?.type || "moatmer_section";
    formData.append("type", type);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const langs = ["en", "ar", "fa", "ms", "tr", "iid"] as const;
    langs.forEach((lang) => {
      const info = values[lang]?.info;
      if (info !== undefined && info !== null) {
        const key = lang === "iid" ? "id" : lang;
        formData.append(`${key}[info]`, info);
      }
    });

    try {
      await updateWhoIsAlmuatamer(formData);
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
      title={tSettings("who_is_almuatamer", { fallback: "Who is Al-Muatamer" })}
      description={tSettings("who_is_almuatamer_desc", { fallback: "Manage Who is Al-Muatamer section information." })}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          
          <ImageChanger 
            previewImage={previewImage} 
            onImageChange={handleImageChange} 
          />
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-8 mt-2">
            <div className="flex flex-col gap-1 mb-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 tracking-tight">
                Localized Information
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">Multilingual</span>
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Update the text content for each supported language below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LocalizedTextareas register={register} />
            </div>
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
