"use server";
import { API_COMPANIES } from "@/lib/api";
import http from "@/lib/http";

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const get_companies = async () => {
  try {
    const request = await http.get(API_COMPANIES, {
      params: { limit: 10, page: 1 },
    });

    return request.data?.data;
  } catch (error) {
    return error;
  }
};
