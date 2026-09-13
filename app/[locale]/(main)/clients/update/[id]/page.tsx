import { getTranslations } from "next-intl/server";
import { PermissionGuard } from "@/components/permissions-provider";
import { UpdateClientForm } from "@/features/clients/components/UpdateClientForm";

export default async function UpdateClientPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await getTranslations("Dashboard");

    return (
        <PermissionGuard permission="update-client">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <UpdateClientForm clientId={id} />
            </div>
        </PermissionGuard>
    );
}
