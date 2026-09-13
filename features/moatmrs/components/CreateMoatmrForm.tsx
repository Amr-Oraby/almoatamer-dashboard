"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useCreateMoatmr } from "../hooks";
import { Loader2 } from "lucide-react";
import { createMoatmrSchema, CreateMoatmrValues } from "../schemas";
import { FormLayout } from "@/components/ui/FormLayout";
import { LocationPicker } from "@/components/ui/LocationPicker";
import { useCountriesWithoutPagination } from "@/features/countries/hooks";
import { useLanguagesWithoutPagination } from "@/features/languages/hooks";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "@/i18n/routing";

export function CreateMoatmrForm() {
    const t = useTranslations("Almoatamers");
    const tClients = useTranslations("Clients");
    const router = useRouter();
    const { mutateAsync: createMoatmr, isPending } = useCreateMoatmr();
    const { data: countriesRes, isLoading: isLoadingCountries } = useCountriesWithoutPagination();
    const { data: languagesRes, isLoading: isLoadingLanguages } = useLanguagesWithoutPagination();

    const countries = countriesRes?.data || [];
    const languages = languagesRes?.data || [];
    
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [locationName, setLocationName] = useState<string>("");

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CreateMoatmrValues>({
        resolver: zodResolver(createMoatmrSchema),
        defaultValues: {
            is_active: true,
            is_available: true,
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    async function onSubmit(values: CreateMoatmrValues) {
        const formData = new FormData();
        formData.append("name", values.name || "");
        formData.append("email", values.email || "");
        formData.append("password", values.password || "");
        formData.append("password_confirmation", values.password_confirmation || "");
        formData.append("phone", values.phone || "");
        formData.append("phone_code", values.phone_code || "");
        formData.append("gender", values.gender || "");
        formData.append("country_id", values.country_id ? values.country_id.toString() : "");
        formData.append("language_id", values.language_id ? values.language_id.toString() : "");
        formData.append("latitude", values.latitude ? values.latitude.toString() : "");
        formData.append("longitude", values.longitude ? values.longitude.toString() : "");
        formData.append("from_price", values.from_price ? values.from_price.toString() : "");
        formData.append("to_price", values.to_price ? values.to_price.toString() : "");
        formData.append("is_active", values.is_active ? "1" : "0");
        formData.append("is_available", values.is_available ? "1" : "0");
        
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            await createMoatmr(formData);
            router.push('/almoatamers/show-all');
        } catch (error) {
            console.error(error);
        }
    }

    if (isLoadingCountries || isLoadingLanguages) {
        return (
            <div className="w-full flex justify-center items-center h-64 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const isActive = watch("is_active");
    const isAvailable = watch("is_available");

    return (
        <FormLayout 
            title={t("create_new", { fallback: "Create Moatamer" })}
            description={t("create_desc", { fallback: "Add a new moatamer to the system" })}
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
                                    <span className="text-white text-xs font-semibold">{tClients("change_image", { fallback: "Change Image" })}</span>
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
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tClients("name", { fallback: "Name" })}</label>
                                <input 
                                    {...register("name")}
                                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                    placeholder={tClients("name", { fallback: "Name" })}
                                />
                                {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tClients("email", { fallback: "Email" })}</label>
                                <input 
                                    {...register("email")}
                                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                    placeholder={tClients("email", { fallback: "Email" })}
                                    type="email"
                                />
                                {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("password", { fallback: "Password" })}</label>
                                <input 
                                    {...register("password")}
                                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                    placeholder="•••••••••••"
                                    type="password"
                                />
                                {errors.password && <span className="text-xs text-red-500 font-medium">{errors.password.message}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("password_confirmation", { fallback: "Confirm Password" })}</label>
                                <input 
                                    {...register("password_confirmation")}
                                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                    placeholder="•••••••••••"
                                    type="password"
                                />
                                {errors.password_confirmation && <span className="text-xs text-red-500 font-medium">{errors.password_confirmation.message}</span>}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-2 col-span-1">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tClients("phone_code", { fallback: "Code" })}</label>
                                    <input 
                                        {...register("phone_code")}
                                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                        placeholder="+966"
                                    />
                                    {errors.phone_code && <span className="text-xs text-red-500 font-medium">{errors.phone_code.message}</span>}
                                </div>
                                <div className="flex flex-col gap-2 col-span-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tClients("phone", { fallback: "Phone Number" })}</label>
                                    <input 
                                        {...register("phone")}
                                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                        placeholder={tClients("phone", { fallback: "Phone Number" })}
                                    />
                                    {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone.message}</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tClients("gender", { fallback: "Gender" })}</label>
                                    <select 
                                        {...register("gender")}
                                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                    >
                                        <option value="">{tClients("select", { fallback: "Select" })}</option>
                                        <option value="male">{tClients("male", { fallback: "Male" })}</option>
                                        <option value="female">{tClients("female", { fallback: "Female" })}</option>
                                    </select>
                                    {errors.gender && <span className="text-xs text-red-500 font-medium">{errors.gender.message}</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tClients("language", { fallback: "Language" })}</label>
                                    <select 
                                        {...register("language_id")}
                                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                    >
                                        <option value="">{tClients("select", { fallback: "Select" })}</option>
                                        {languages.map((lang: any) => (
                                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                                        ))}
                                    </select>
                                    {errors.language_id && <span className="text-xs text-red-500 font-medium">{errors.language_id.message}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tClients("country", { fallback: "Country" })}</label>
                                <select 
                                    {...register("country_id")}
                                    className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                >
                                    <option value="">{tClients("select", { fallback: "Select" })}</option>
                                    {countries.map((country: any) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-2">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{t("active", { fallback: "Active" })}</span>
                                </div>
                                <Switch 
                                    checked={!!isActive} 
                                    onChange={() => setValue("is_active", !isActive)} 
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-2">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{t("available", { fallback: "Available" })}</span>
                                </div>
                                <Switch 
                                    checked={!!isAvailable} 
                                    onChange={() => setValue("is_available", !isAvailable)} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Location Map & Pricing */}
                    <div className="xl:col-span-8 lg:col-span-7 flex flex-col gap-6">
                        <div className="bg-zinc-50 dark:bg-zinc-900/30 p-5 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 flex flex-col">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">💰</span>
                                {t("pricing", { fallback: "Pricing" })}
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("price_from", { fallback: "From Price" })}</label>
                                    <input 
                                        {...register("from_price")}
                                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                        placeholder="0"
                                        type="number"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t("price_to", { fallback: "To Price" })}</label>
                                    <input 
                                        {...register("to_price")}
                                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-primary transition-all"
                                        placeholder="0"
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-900/30 p-5 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 h-full flex flex-col min-h-[400px]">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">📍</span>
                                {tClients("location", { fallback: "Location" })}
                            </h4>
                            
                            <div className="flex-grow w-full flex flex-col rounded-xl overflow-hidden shadow-inner border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-200/50 dark:bg-zinc-800/20">
                                <LocationPicker 
                                    latitude={watch("latitude")?.toString() || "21.420847"} 
                                    longitude={watch("longitude")?.toString() || "39.826869"} 
                                    locationName={locationName}
                                    onLocationChange={(lat, lng, name) => {
                                        setValue("latitude", parseFloat(lat));
                                        setValue("longitude", parseFloat(lng));
                                        setLocationName(name);
                                    }}
                                    locale={"ar"}
                                />
                            </div>
                            
                            {/* Hidden fields just in case we need standard inputs to submit */}
                            <input type="hidden" {...register("latitude")} />
                            <input type="hidden" {...register("longitude")} />
                        </div>
                    </div>
                    
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                    <Button type="submit" disabled={isPending} className="w-full sm:w-auto min-w-[200px] h-12 rounded-xl text-base font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        {tClients("save", { fallback: "Save" })}
                    </Button>
                </div>
            </form>
        </FormLayout>
    );
}
