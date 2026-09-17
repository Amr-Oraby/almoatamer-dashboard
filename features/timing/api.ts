import { apiClient } from "@/lib/api/client";
import { TimingsResponse } from "./types";

export const getTimings = () => {
    return apiClient<TimingsResponse>('/api/timing');
};

export const bulkUpdateTimingDays = (data: FormData) => {
    return apiClient<{status: string | boolean | number, message?: string}>('/api/timing/bulk-update-days', {
        method: 'POST',
        body: data,
    });
};

export const toggleTimingDay = (dayId: number) => {
    return apiClient<{status: string | boolean | number, message?: string}>(`/api/timing/day/${dayId}/toggle`, {
        method: 'PUT',
    });
};

export const updateTimingDay = (dayId: number, data: FormData) => {
    return apiClient<{status: string | boolean | number, message?: string}>(`/api/timing/day/${dayId}`, {
        method: 'POST',
        body: data,
    });
};

export const addTimingDay = (data: FormData) => {
    return apiClient<{status: string | boolean | number, message?: string}>('/api/timing/add-day', {
        method: 'POST',
        body: data,
    });
};
