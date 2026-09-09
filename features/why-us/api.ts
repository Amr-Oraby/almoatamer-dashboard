import { apiClient } from "@/lib/api/client";
import { WhyUsResponse, SingleWhyUsResponse } from "./types";

export async function getWhyUsItems(page: number = 1): Promise<WhyUsResponse> {
    return apiClient<WhyUsResponse>(`/api/why-us?page=${page}`);
}

export async function getWhyUsItem(id: string): Promise<SingleWhyUsResponse> {
    return apiClient<SingleWhyUsResponse>(`/api/why-us/${id}`);
}

function buildWhyUsFormData(data: Record<string, any>): FormData {
    const formData = new FormData();

    if (data.icon) {
        formData.append("icon", data.icon);
    }

    const locales = ["ar", "en", "fa", "ms", "tr", "iid"];
    for (const locale of locales) {
        if (data[locale]) {
            if (data[locale].title) formData.append(`${locale}[title]`, data[locale].title);
            if (data[locale].description) formData.append(`${locale}[description]`, data[locale].description);
        }
    }

    return formData;
}

export async function createWhyUsItem(data: Record<string, any>): Promise<any> {
    const formData = buildWhyUsFormData(data);
    return apiClient<any>("/api/create-why-us", {
        method: "POST",
        body: formData,
    });
}

export async function updateWhyUsItem(id: string, data: Record<string, any>): Promise<any> {
    const formData = buildWhyUsFormData(data);
    return apiClient<any>(`/api/update-why-us/${id}`, {
        method: "POST",
        body: formData,
    });
}

export async function deleteWhyUsItem(id: string): Promise<any> {
    return apiClient<any>(`/api/why-us/${id}`, { method: "DELETE" });
}
