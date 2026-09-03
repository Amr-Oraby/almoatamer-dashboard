import { apiClient } from "@/lib/api/client";
import { AdminContactsResponse, AdminContactsData } from "@/app/types/AdminContactsType";

export async function getAdminContacts(): Promise<AdminContactsResponse> {
  const url = `/api/admin-contacts`;
  return apiClient<AdminContactsResponse>(url);
}

export async function updateAdminContacts(data: AdminContactsData): Promise<AdminContactsResponse> {
  const url = `/api/admin-contacts`;
  return apiClient<AdminContactsResponse>(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
