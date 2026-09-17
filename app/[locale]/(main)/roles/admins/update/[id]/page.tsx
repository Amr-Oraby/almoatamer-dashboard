import { PageContainer } from "@/components/layout/PageContainer";
import { getTranslations } from "next-intl/server";
import { UpdateAdminForm } from "@/features/admins/components/UpdateAdminForm";
import { PermissionGuard } from "@/components/permissions-provider";

export default async function UpdateAdminPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const t = await getTranslations("Dashboard");
  const { id } = await params;

  return (
    <PermissionGuard permission="update-admin">
      <PageContainer>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{t("edit_admin", { fallback: "تعديل بيانات المشرف" })}</h1>
          </div>
        </div>
        <UpdateAdminForm adminId={id} />
      </PageContainer>
    </PermissionGuard>
  );
}
