import { apiClient } from "@/lib/api/client";
import { AdminContactResponse, AdminContactUpdateResponse, AdminContactUpdateRequest } from "./types";

export async function getAdminContacts(): Promise<AdminContactResponse> {
    return apiClient<AdminContactResponse>("/api/admin-contacts");
}

export async function updateAdminContacts(data: AdminContactUpdateRequest): Promise<AdminContactUpdateResponse> {
    return apiClient<AdminContactUpdateResponse>("/api/update-admin-contact", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
