"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { createCouponCodeSchema, CreateCouponCodeFormValues } from "../schemas";
import { useGenerateCouponCodes } from "../hooks";
import { Plus, Loader2 } from "lucide-react";
import { DialogPortal } from "@base-ui/react/dialog";

export function CreateCouponCodeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("CouponCodes");
  const tCommon = useTranslations("Common");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateCouponCodeFormValues>({
    resolver: zodResolver(createCouponCodeSchema),
    defaultValues: {
      name: "",
      phone_code: "966",
      phone_number: "",
      number_of_recipients: "",
    },
  });

  const { mutate: create, isPending } = useGenerateCouponCodes();

  const onSubmit = (data: CreateCouponCodeFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone_code", data.phone_code);
    formData.append("phone_number", data.phone_number);
    formData.append("number_of_recipients", String(data.number_of_recipients));

    create(formData, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) reset();
    }}>
      <DialogTrigger render={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("create_new", { fallback: "Create New" })}</Button>} />


        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("create_new", { fallback: "Create New" })}</DialogTitle>
            <DialogDescription className="hidden">Create a new coupon code</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("name", { fallback: "Name" })}</label>
              <input
                {...register("name")}
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("phone_code", { fallback: "Phone Code" })}</label>
                <input
                  {...register("phone_code")}
                  dir="ltr"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 text-left"
                />
                {errors.phone_code && <p className="text-sm text-red-500">{errors.phone_code.message}</p>}
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("phone_number", { fallback: "Phone Number" })}</label>
                <input
                  {...register("phone_number")}
                  dir="ltr"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 text-left"
                />
                {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("number_of_recipients", { fallback: "Number of Recipients" })}</label>
              <input
                type="number"
                {...register("number_of_recipients")}
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
              {errors.number_of_recipients && <p className="text-sm text-red-500">{errors.number_of_recipients.message}</p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                {tCommon("cancel")}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
                {tCommon("save")}
              </Button>
            </div>
          </form>
        </DialogContent>

    </Dialog>
  );
}
