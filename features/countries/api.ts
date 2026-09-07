import { apiClient } from "@/lib/api/client";
import { CountriesResponse, SingleCountryResponse } from "./types";

export async function getCountries(page: number = 1): Promise<CountriesResponse> {
    return apiClient<CountriesResponse>(`/api/countries?page=${page}`);
}

export async function getCountry(id: string): Promise<SingleCountryResponse> {
    return apiClient<SingleCountryResponse>(`/api/country/${id}`);
}

export async function deleteCountry(id: string): Promise<any> {
    return apiClient<any>(`/api/delete_country/${id}`, { method: 'DELETE' });
}
