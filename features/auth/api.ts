import { apiClient } from "@/lib/api/client";


export const logout = () => apiClient("/api/auth/logout", { method: "POST" });

export const login = (credentials: {
    email: string;
    password: string;
}) => apiClient("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) });