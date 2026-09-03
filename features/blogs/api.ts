import { apiClient } from "@/lib/api/client";
import { BlogResponse, SingleBlogResponse } from "@/app/types/BlogType";

export const blogApi = {
  getBlogs: (page: number = 1) => {
    return apiClient<BlogResponse>(`/api/blogs?page=${page}`);
  },
  getBlog: (id: number) => {
    return apiClient<SingleBlogResponse>(`/api/blog/${id}`);
  },
  deleteBlog: (id: number) => {
    return apiClient<any>(`/api/blog/${id}`, { method: "DELETE" });
  }
};
