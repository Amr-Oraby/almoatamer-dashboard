"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Plus, Loader2, Image as ImageIcon, X } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createAdminSchema, CreateAdminFormValues } from "../schemas";
import { useCreateAdmin } from "../hooks";
import { useRolesList } from "@/features/roles/hooks";
import Image from "next/image";

export function CreateAdminModal() {
  const t = useTranslations("Dashboard");
  const tCommon = useTranslations("Common");
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: rolesData, isLoading: isLoadingRoles } = useRolesList();
  const { mutate: createAdmin, isPending } = useCreateAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateAdminFormValues>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      phone_code: "+966",
      password: "",
      password_confirmation: "",
      gender: "male",
      is_active: 1,
    },
  });

  const isActive = watch("is_active");

  const onSubmit = (data: CreateAdminFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.phone_code) formData.append("phone_code", data.phone_code);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("gender", data.gender);
    formData.append("role_id", String(data.role_id));
    formData.append("is_active", String(data.is_active));
    
    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    createAdmin(formData, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
        setImagePreview(null);
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("image", undefined as any, { shouldValidate: true });
    setImagePreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {t("add_admin", { fallback: "إضافة مشرف" })}
          </Button>
        }
      />
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <DialogTitle className="text-xl font-bold">
            {t("add_admin", { fallback: "إضافة مشرف" })}
          </DialogTitle>
          <DialogClose render={<Button variant="ghost" size="icon"><X className="w-4 h-4" /></Button>} />
        </div>

        <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as CreateAdminFormValues))} className="space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900">
              {imagePreview ? (
                <>
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button type="button" variant="destructive" size="sm" onClick={removeImage}>
                      {tCommon("remove", { fallback: "إزالة" })}
                    </Button>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <ImageIcon className="w-8 h-8 text-zinc-400 mb-2" />
                  <span className="text-xs text-zinc-500">{tCommon("upload_image", { fallback: "رفع صورة" })}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
            {errors.image && <p className="text-sm text-red-500">{errors.image.message as string}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("name", { fallback: "الاسم" })}</label>
              <input className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" {...register("name")} placeholder={t("name", { fallback: "الاسم" })} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("email", { fallback: "البريد الإلكتروني" })}</label>
              <input className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" type="email" {...register("email")} placeholder="admin@example.com" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("phone", { fallback: "رقم الهاتف" })}</label>
              <div className="flex gap-2">
                <input className="flex h-10 w-24 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" dir="ltr" {...register("phone_code")} placeholder="+966" />
                <input className="flex h-10 flex-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" {...register("phone")} placeholder="501234567" />
              </div>
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("gender", { fallback: "النوع" })}</label>
              <select
                {...register("gender")}
                className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              >
                <option value="male">{t("male", { fallback: "ذكر" })}</option>
                <option value="female">{t("female", { fallback: "أنثى" })}</option>
              </select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("password", { fallback: "كلمة المرور" })}</label>
              <input className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" type="password" {...register("password")} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Password Confirmation */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("password_confirmation", { fallback: "تأكيد كلمة المرور" })}</label>
              <input className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" type="password" {...register("password_confirmation")} />
              {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("role", { fallback: "الدور" })}</label>
              <select
                {...register("role_id")}
                className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
                disabled={isLoadingRoles}
              >
                <option value="">{tCommon("select", { fallback: "اختر..." })}</option>
                {rolesData?.data?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title || role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && <p className="text-sm text-red-500">{errors.role_id.message}</p>}
            </div>

            {/* Is Active */}
            <div className="space-y-2 flex flex-col justify-center pt-6">
              <div className="flex items-center gap-3">
                <Switch
                  checked={!!isActive}
                  onChange={() => setValue("is_active", isActive ? 0 : 1)}
                />
                <label className="text-sm font-medium cursor-pointer" onClick={() => setValue("is_active", isActive ? 0 : 1)}>
                  {t("is_active", { fallback: "نشط" })}
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <DialogClose render={<Button type="button" variant="outline">{tCommon("cancel", { fallback: "إلغاء" })}</Button>} />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
              {tCommon("save", { fallback: "حفظ" })}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
