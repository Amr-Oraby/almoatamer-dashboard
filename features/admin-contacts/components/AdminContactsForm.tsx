"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAdminContacts, useUpdateAdminContacts } from "../hooks";
import { Loader2, Phone, Mail, Link as LinkIcon } from "lucide-react";
import { AdminContactUpdateRequest } from "../types";

export function AdminContactsForm() {
  const t = useTranslations("AdminContacts");
  const { data: contactsData, isLoading } = useAdminContacts();
  const { mutate: updateContacts, isPending } = useUpdateAdminContacts();

  const { register, handleSubmit, reset } = useForm<AdminContactUpdateRequest>({
    defaultValues: {
      phone: "",
      phone_code: "",
      gmail: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      behance: "",
      youtube: "",
      google_play: "",
      app_store: "",
      tiktok: "",
      snapchat: "",
      insta_pay: "",
    },
  });

  useEffect(() => {
    if (contactsData?.data) {
      reset({
        phone: contactsData.data.phone || "",
        phone_code: contactsData.data.phone_code || "",
        gmail: contactsData.data.gmail || "",
        facebook: contactsData.data.facebook || "",
        twitter: contactsData.data.twitter || "",
        linkedin: contactsData.data.linkedin || "",
        instagram: contactsData.data.instagram || "",
        behance: contactsData.data.behance || "",
        youtube: contactsData.data.youtube || "",
        google_play: contactsData.data.google_play || "",
        app_store: contactsData.data.app_store || "",
        tiktok: contactsData.data.tiktok || "",
        snapchat: contactsData.data.snapchat || "",
        insta_pay: contactsData.data.insta_pay || "",
      });
    }
  }, [contactsData, reset]);

  function onSubmit(values: AdminContactUpdateRequest) {
    updateContacts(values);
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
          {t("title", { fallback: "Contact Information" })}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {t("description", { fallback: "Manage all social links and contact details." })}
        </p>
      </div>
      
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Phone Group */}
            <div className="flex flex-col gap-3">
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Phone className="w-4 h-4 text-blue-500" />
                {t("phone", { fallback: "Phone Number" })}
              </label>
              <div className="flex gap-2">
                <input
                  id="phone_code"
                  type="text"
                  placeholder="Code"
                  className="w-24 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  {...register("phone_code")}
                />
                <input
                  id="phone"
                  type="text"
                  className="flex-1 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Gmail */}
            <div className="flex flex-col gap-3">
              <label htmlFor="gmail" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Mail className="w-4 h-4 text-red-500" />
                {t("gmail", { fallback: "Gmail" })}
              </label>
              <input
                id="gmail"
                type="email"
                className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                {...register("gmail")}
              />
            </div>

            {/* Social Links */}
            {[
              "facebook",
              "twitter",
              "linkedin",
              "instagram",
              "behance",
              "youtube",
              "google_play",
              "app_store",
              "tiktok",
              "snapchat",
              "insta_pay"
            ].map((field) => (
              <div key={field} className="flex flex-col gap-3">
                <label htmlFor={field} className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 capitalize">
                  <LinkIcon className="w-4 h-4 text-zinc-500" />
                  {t(field, { fallback: field.replace("_", " ") })}
                </label>
                <input
                  id={field}
                  type="text"
                  className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  {...register(field as keyof AdminContactUpdateRequest)}
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button type="submit" disabled={isPending} className="w-full md:w-auto min-w-[140px] h-11 text-base">
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {t("update", { fallback: "Update Contacts" })}
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
