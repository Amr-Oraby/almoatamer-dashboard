import { apiClient } from "@/lib/api/client";
import { CountriesResponse, SingleCountryResponse } from "./types";

export async function getCountries(page: number = 1): Promise<CountriesResponse> {
    return apiClient<CountriesResponse>(`/api/countries?page=${page}`);
}

export async function getCountry(id: string): Promise<SingleCountryResponse> {
    return apiClient<SingleCountryResponse>(`/api/countries/${id}`);
}
