"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useRole, useUpdateRole } from "@/features/roles/hooks"
import { useAllPermissions } from "@/features/permissions/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ShieldCheck, Shield, LockKeyhole, Save } from "lucide-react"
import { useState, useEffect } from "react"
import { PermissionItem } from "@/features/permissions/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateRoleSchema, UpdateRoleValues } from "@/features/roles/schemas"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function RoleDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: role, isLoading: isRoleLoading, isError: isRoleError } = useRole(id)
  const { data: allPermissions, isLoading: isPermsLoading, isError: isPermsError } = useAllPermissions()
  const updateMutation = useUpdateRole(id)
  const t = useTranslations("Roles")

  const [selectedPerms, setSelectedPerms] = useState<Set<number>>(new Set());

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<UpdateRoleValues>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      ar: { name: "" },
      en: { name: "" },
      is_active: 0,
      permissions: [],
    }
  });

  useEffect(() => {
    if (role) {
      const perms = role.permission ? role.permission.map(p => p.id) : [];
      setSelectedPerms(new Set(perms));
      reset({
        ar: { name: role.ar?.name || "" },
        en: { name: role.en?.name || "" },
        is_active: role.is_active ? 1 : 0,
        permissions: perms,
      });
    }
  }, [role, reset]);

  if (isRoleLoading || isPermsLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isRoleError || !role || isPermsError || !allPermissions) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-500">{t("not_found")}</p>
      </div>
    )
  }

  const togglePermission = (permId: number) => {
    const newSet = new Set(selectedPerms);
    if (newSet.has(permId)) {
      newSet.delete(permId);
    } else {
      newSet.add(permId);
    }
    setSelectedPerms(newSet);
    setValue("permissions", Array.from(newSet), { shouldDirty: true });
  };

  const toggleGroup = (perms: PermissionItem[]) => {
    const newSet = new Set(selectedPerms);
    const allSelected = perms.every(p => newSet.has(p.id));
    if (allSelected) {
      perms.forEach(p => newSet.delete(p.id));
    } else {
      perms.forEach(p => newSet.add(p.id));
    }
    setSelectedPerms(newSet);
    setValue("permissions", Array.from(newSet), { shouldDirty: true });
  };

  const onSubmit = (data: UpdateRoleValues) => {
    updateMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{t("role_details")}</h1>
        <Button type="submit" disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {t("save_changes", { fallback: "حفظ التغييرات" })}
        </Button>
      </div>

      {/* Header Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 shrink-0 border border-primary/20">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <div className="flex flex-col gap-2 flex-1 max-w-md">
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("role_name", { fallback: "الاسم" })} ({t("ar", { fallback: "العربية" })})</p>
                <input
                  {...register("ar.name")}
                  className="font-bold text-base bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-primary px-1 py-1 w-full"
                  placeholder="الاسم بالعربية"
                  dir="rtl"
                />
                {errors.ar?.name && <p className="text-red-500 text-xs mt-1">{errors.ar.name.message}</p>}
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("role_name", { fallback: "الاسم" })} ({t("en", { fallback: "الإنجليزية" })})</p>
                <input
                  {...register("en.name")}
                  className="font-bold text-base bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-primary px-1 py-1 w-full"
                  placeholder="Name in English"
                  dir="ltr"
                />
                {errors.en?.name && <p className="text-red-500 text-xs mt-1">{errors.en.name.message}</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-zinc-500">{t("is_active", { fallback: "مفعل" })}</span>
              <Switch
                checked={watch("is_active") === 1}
                onChange={() => setValue("is_active", watch("is_active") === 1 ? 0 : 1, { shouldDirty: true })}
              />
            </div>
            <span className="text-xs font-bold text-zinc-400">ID: {role.id}</span>
          </div>
        </div>
      </Card>

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(allPermissions).map(([moduleName, perms]) => {
          const allSelected = perms.every(p => selectedPerms.has(p.id));
          return (
            <Card key={moduleName} className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950 flex flex-col">
              <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold capitalize">{moduleName}</CardTitle>
                    <p className="text-[10px] text-muted-foreground">{perms.length} permissions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleGroup(perms)}>
                  <span className="text-xs font-medium text-zinc-500">{allSelected ? "Unselect" : "Select All"}</span>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer accent-primary"
                    checked={allSelected}
                    onChange={() => toggleGroup(perms)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <div className="flex flex-col space-y-2">
                  {perms.map(perm => (
                    <div
                      key={perm.id}
                      className="flex items-center justify-between p-2.5 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-lg hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => togglePermission(perm.id)}
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">{perm.title || perm.name}</h4>
                        <span className="text-[9px] font-mono font-medium text-zinc-500 flex items-center gap-1">
                          <LockKeyhole className="w-2.5 h-2.5" />
                          {perm.name}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer accent-primary shrink-0"
                        checked={selectedPerms.has(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
        {Object.keys(allPermissions).length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center h-48 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-zinc-400">
            <Shield className="w-12 h-12 mb-3 opacity-50" />
            <p className="font-medium text-lg">{t("no_permissions")}</p>
          </div>
        )}
      </div>
    </form>
  )
}
