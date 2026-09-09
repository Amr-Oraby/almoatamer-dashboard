"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useProfile, useUpdateProfile } from "../hooks";
import { Loader2 } from "lucide-react";
import { updateProfileSchema, UpdateProfileValues } from "../schemas";

import { FormLayout } from "@/components/ui/FormLayout";
import { LocationPicker } from "@/components/ui/LocationPicker";
import { Link } from "@/i18n/routing";

export function ProfileForm() {
  const t = useTranslations("Dashboard");
  const { data: response, isLoading } = useProfile();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (response?.data) {
      const p = response.data;
      reset({
        name: p.name || "",
        email: p.email || "",
        phone: p.phone || "",
        phone_code: p.phone_code || "",
        gender: p.gender || "",
        locale: p.locale || "ar",
        latitude: p.latitude || "",
        longitude: p.longitude || ""
      });
      if (p.image) {
        setPreviewImage(p.image);
      }
    }
  }, [response, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: UpdateProfileValues) {
    const formData = new FormData();
    
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (values.phone_code) formData.append("phone_code", values.phone_code);
    if (values.gender) formData.append("gender", values.gender);
    if (values.locale) formData.append("locale", values.locale);
    if (values.latitude) formData.append("latitude", values.latitude.toString());
    if (values.longitude) formData.append("longitude", values.longitude.toString());
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateProfile(formData);
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
      title={t("view_profile", { fallback: "Profile" })}
      description={t("edit_profile_desc", { fallback: "Manage your profile information." })}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column - Personal Info */}
          <div className="xl:col-span-4 lg:col-span-5 flex flex-col gap-6">
            <div className="flex justify-center mb-2">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-zinc-950 shadow-md group cursor-pointer bg-zinc-100 dark:bg-zinc-800">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl text-zinc-400">👤</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <span className="text-white text-xs font-semibold">{t("change_image", { fallback: "Change Image" })}</span>
                </div>
                
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/30 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("name", { fallback: "Name" })}</label>
                <input 
                  {...register("name")}
                  className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                  placeholder={t("name", { fallback: "Name" })}
                />
                {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("email", { fallback: "Email" })}</label>
                <input 
                  {...register("email")}
                  className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                  placeholder={t("email", { fallback: "Email" })}
                  type="email"
                />
                {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 col-span-1">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("phone_code", { fallback: "Code" })}</label>
                  <input 
                    {...register("phone_code")}
                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                    placeholder="20"
                  />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("phone", { fallback: "Phone Number" })}</label>
                  <input 
                    {...register("phone")}
                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                    placeholder={t("phone", { fallback: "Phone Number" })}
                  />
                  {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("gender", { fallback: "Gender" })}</label>
                  <select 
                    {...register("gender")}
                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("language", { fallback: "Locale" })}</label>
                  <select 
                    {...register("locale")}
                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                  >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Location Map */}
          <div className="xl:col-span-8 lg:col-span-7 flex flex-col h-full">
            <div className="bg-zinc-50 dark:bg-zinc-900/30 p-5 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 h-full flex flex-col">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">📍</span>
                {t("location", { fallback: "Location" })}
              </h4>
              
              <div className="flex-grow w-full flex flex-col">
                <LocationPicker 
                  latitude={watch("latitude")?.toString() || "21.420847"} 
                  longitude={watch("longitude")?.toString() || "39.826869"} 
                  locationName={locationName}
                  onLocationChange={(lat, lng, name) => {
                    setValue("latitude", parseFloat(lat));
                    setValue("longitude", parseFloat(lng));
                    setLocationName(name);
                  }}
                  locale={watch("locale") || "ar"}
                />
              </div>
              
              {/* Hidden fields just in case we need standard inputs to submit */}
              <input type="hidden" {...register("latitude")} />
              <input type="hidden" {...register("longitude")} />
            </div>
          </div>
          
        </div>

        <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <Link href="/profile/change-password">
            <Button type="button" variant="outline" className="h-12 rounded-xl text-base font-semibold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {t("change_password", { fallback: "Change Password" })}
            </Button>
          </Link>
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto min-w-[200px] h-12 rounded-xl text-base font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {t("save", { fallback: "Save" })}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
