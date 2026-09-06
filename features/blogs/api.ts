import { apiClient } from "@/lib/api/client";
import { BlogsResponse, SingleBlogResponse } from "./types";

export async function getBlogsList(page: number = 1): Promise<BlogsResponse> {
    return apiClient<BlogsResponse>(`/api/blogs?page=${page}`);
}

export async function getBlogItem(id: string): Promise<SingleBlogResponse> {
    return apiClient<SingleBlogResponse>(`/api/blogs/${id}`);
}
