"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPermissionSchema, CreatePermissionValues } from "@/features/permissions/schemas";
import { useCreatePermission } from "@/features/permissions/hooks";

export function CreatePermissionModal() {
  const t = useTranslations("Permissions");
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createPermission, isPending } = useCreatePermission();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePermissionValues>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {
      name: "",
      front_name: "",
      ar: { title: "" },
      en: { title: "" },
    },
  });

  const onSubmit = (data: CreatePermissionValues) => {
    createPermission(data, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4" />
            {t("create_permission", { fallback: "إضافة صلاحية" })}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-950 p-0 overflow-hidden border-zinc-100 dark:border-zinc-800 rounded-2xl">
        <DialogHeader className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <DialogTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {t("create_permission", { fallback: "إضافة صلاحية" })}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                {t("name", { fallback: "الاسم (للنظام)" })} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="users.create"
                dir="ltr"
              />
              {errors.name && (
                <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                {t("front_name", { fallback: "الاسم في الواجهة (اختياري)" })}
              </label>
              <input
                {...register("front_name")}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="Users Management"
                dir="ltr"
              />
              {errors.front_name && (
                <span className="text-xs text-red-500 font-medium">{errors.front_name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                {t("title_ar", { fallback: "العنوان (بالعربية)" })} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("ar.title")}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="إضافة مستخدم"
                dir="rtl"
              />
              {errors.ar?.title && (
                <span className="text-xs text-red-500 font-medium">{errors.ar.title.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                {t("title_en", { fallback: "العنوان (بالإنجليزية)" })} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("en.title")}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="Create User"
                dir="ltr"
              />
              {errors.en?.title && (
                <span className="text-xs text-red-500 font-medium">{errors.en.title.message}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="submit"
              disabled={isPending}
              className="px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {t("add", { fallback: "إضافة" })}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
