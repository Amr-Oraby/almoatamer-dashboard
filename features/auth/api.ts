import { apiClient } from "@/lib/api/client";
import { LoginPayload } from "./types";

export const logout = () => apiClient("/api/auth/logout", { method: "POST" });

export const login = (credentials: LoginPayload) => 
  apiClient("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) });