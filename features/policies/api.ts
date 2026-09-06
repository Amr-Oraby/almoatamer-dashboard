import { apiClient } from "@/lib/api/client";
import { PoliciesResponse, SinglePolicyResponse } from "./types";

export async function getPolicies(page: number = 1): Promise<PoliciesResponse> {
    return apiClient<PoliciesResponse>(`/api/policies?page=${page}`);
}

export async function getPolicy(id: string): Promise<SinglePolicyResponse> {
    return apiClient<SinglePolicyResponse>(`/api/policy/${id}`);
}
