import { CreateMoatmrForm } from "@/features/moatmrs/components/CreateMoatmrForm";
import { PermissionGuard } from "@/components/permissions-provider";

export default function CreateAlmoatamerPage() {
    return (
        <PermissionGuard permission="create-moatmer">
            <div className="p-6">
                <CreateMoatmrForm />
            </div>
        </PermissionGuard>
    );
}
