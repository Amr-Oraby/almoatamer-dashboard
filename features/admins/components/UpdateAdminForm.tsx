"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { updateAdminSchema, UpdateAdminFormValues } from "../schemas";
import { useAdmin, useUpdateAdmin } from "../hooks";
import { useRolesList } from "@/features/roles/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UpdateAdminFormProps {
  adminId: string;
}

export function UpdateAdminForm({ adminId }: UpdateAdminFormProps) {
  const t = useTranslations("Dashboard");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: adminData, isLoading: isLoadingAdmin } = useAdmin(adminId);
  const { data: rolesData, isLoading: isLoadingRoles } = useRolesList();
  const { mutate: updateAdmin, isPending } = useUpdateAdmin(adminId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UpdateAdminFormValues>({
    resolver: zodResolver(updateAdminSchema),
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

  useEffect(() => {
    if (adminData?.data) {
      const admin = adminData.data;
      reset({
        name: admin.name,
        email: admin.email || "",
        phone: admin.phone || "",
        phone_code: admin.phone_code || "+966",
        gender: admin.gender as any || "male",
        is_active: admin.is_active ? 1 : 0,
        role_id: admin.role?.id || undefined,
        password: "",
        password_confirmation: "",
      });
      if (admin.image) {
        setImagePreview(admin.image);
      }
    }
  }, [adminData, reset]);

  const onSubmit = (data: UpdateAdminFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.phone_code) formData.append("phone_code", data.phone_code);
    
    // Only send password if it was filled
    if (data.password && data.password.length > 0) {
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation || "");
    }
    
    formData.append("gender", data.gender);
    formData.append("role_id", String(data.role_id));
    formData.append("is_active", String(data.is_active));
    
    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    updateAdmin(formData, {
      onSuccess: () => {
        router.push("/ar/roles/admins");
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

  if (isLoadingAdmin) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as UpdateAdminFormValues))} className="space-y-6 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
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
          <input className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" type="password" {...register("password")} placeholder={tCommon("leave_blank_to_keep", { fallback: "اتركه فارغاً لعدم التغيير" })} />
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

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push("/ar/roles/admins")}>
          {tCommon("cancel", { fallback: "إلغاء" })}
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
          {tCommon("save", { fallback: "حفظ" })}
        </Button>
      </div>
    </form>
  );
}
