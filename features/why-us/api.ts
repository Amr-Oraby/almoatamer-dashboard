import { apiClient } from "@/lib/api/client";
import { WhyUsResponse, SingleWhyUsResponse } from "./types";
import { CreateWhyUsFormValues } from "./schemas";

export async function getWhyUsItems(page: number = 1): Promise<WhyUsResponse> {
    return apiClient<WhyUsResponse>(`/api/why-us?page=${page}`);
}

export async function getWhyUsItem(id: string): Promise<SingleWhyUsResponse> {
    return apiClient<SingleWhyUsResponse>(`/api/why-us/${id}`);
}

function buildWhyUsFormData(data: CreateWhyUsFormValues): FormData {
    const formData = new FormData();

    if (data.icon) {
        formData.append("icon", data.icon);
    }

    const locales = ["ar", "en", "fa", "ms", "tr", "iid"] as const;
    for (const locale of locales) {
        const localeData = data[locale];
        if (localeData) {
            if (localeData.title) formData.append(`${locale}[title]`, localeData.title);
            if (localeData.description) formData.append(`${locale}[description]`, localeData.description);
        }
    }

    return formData;
}

export async function createWhyUsItem(data: CreateWhyUsFormValues): Promise<{status: string, message: string}> {
    const formData = buildWhyUsFormData(data);
    return apiClient<{status: string, message: string}>("/api/create-why-us", {
        method: "POST",
        body: formData,
    });
}

export async function updateWhyUsItem(id: string, data: CreateWhyUsFormValues): Promise<{status: string, message: string}> {
    const formData = buildWhyUsFormData(data);
    return apiClient<{status: string, message: string}>(`/api/update-why-us/${id}`, {
        method: "POST",
        body: formData,
    });
}

export async function deleteWhyUsItem(id: string): Promise<{status: string, message: string, data: null}> {
    return apiClient<{status: string, message: string, data: null}>(`/api/why-us/${id}`, { method: "DELETE" });
}
