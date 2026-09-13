import { UpdateMoatmrForm } from "@/features/moatmrs/components/UpdateMoatmrForm";
import { PermissionGuard } from "@/components/permissions-provider";

export default async function UpdateAlmoatamerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    return (
        <PermissionGuard permission="update-moatmer">
            <div className="p-6">
                <UpdateMoatmrForm moatmrId={id} />
            </div>
        </PermissionGuard>
    );
}
