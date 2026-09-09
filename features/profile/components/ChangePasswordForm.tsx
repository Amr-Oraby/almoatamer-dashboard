"use client";

import { useTranslations } from "next-intl";
import { FormLayout } from "@/components/ui/FormLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff, Lock, Key, ShieldCheck, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, ChangePasswordValues } from "../schemas";
import { useChangePassword } from "../hooks";

export function ChangePasswordForm() {
  const t = useTranslations("Dashboard");
  const { mutateAsync: changePassword, isPending } = useChangePassword();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <FormLayout
      title={t("change_password", { fallback: "Change Password" })}
      description={t("change_password_desc", { fallback: "Update your account password securely." })}
    >
      <form className="space-y-8" onSubmit={handleSubmit(async (values) => {
        try {
          await changePassword(values);
          reset();
        } catch (error) {
          // Error is handled in the hook
        }
      })}>
        <div className="bg-white dark:bg-zinc-950 p-6 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-3xl mx-auto flex flex-col gap-8">

          {/* Header Info */}
          <div className="flex items-center gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {t("security_details", { fallback: "Security Details" })}
              </h3>
              <p className="text-sm text-zinc-500">
                {t("security_details_desc", { fallback: "Ensure your account is using a long, random password to stay secure." })}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Old Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ms-1">
                {t("old_password", { fallback: "Old Password" })}
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute start-4 w-5 h-5 text-zinc-400" />
                <input
                  {...register("old_password")}
                  type={showOld ? "text" : "password"}
                  className="flex h-14 w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50/50 px-12 text-base placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:bg-white dark:border-zinc-800 dark:bg-zinc-900/30 dark:focus:border-primary dark:focus:bg-zinc-950 transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute end-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  {showOld ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.old_password && <span className="text-xs text-red-500 font-medium ms-1">{errors.old_password.message}</span>}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ms-1">
                {t("new_password", { fallback: "New Password" })}
              </label>
              <div className="relative flex items-center">
                <Key className="absolute start-4 w-5 h-5 text-zinc-400" />
                <input
                  {...register("new_password")}
                  type={showNew ? "text" : "password"}
                  className="flex h-14 w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50/50 px-12 text-base placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:bg-white dark:border-zinc-800 dark:bg-zinc-900/30 dark:focus:border-primary dark:focus:bg-zinc-950 transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute end-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.new_password && <span className="text-xs text-red-500 font-medium ms-1">{errors.new_password.message}</span>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ms-1">
                {t("confirm_password", { fallback: "Confirm New Password" })}
              </label>
              <div className="relative flex items-center">
                <Key className="absolute start-4 w-5 h-5 text-zinc-400" />
                <input
                  {...register("new_password_confirmation")}
                  type={showConfirm ? "text" : "password"}
                  className="flex h-14 w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50/50 px-12 text-base placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:bg-white dark:border-zinc-800 dark:bg-zinc-900/30 dark:focus:border-primary dark:focus:bg-zinc-950 transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute end-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.new_password_confirmation && <span className="text-xs text-red-500 font-medium ms-1">{errors.new_password_confirmation.message}</span>}
            </div>
          </div>

        </div>

        <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto min-w-[200px] h-14 rounded-2xl text-base font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            {isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {t("save", { fallback: "Save" })}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
