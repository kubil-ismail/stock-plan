"use server";
import { API_AUTH_PROFILE } from "@/lib/api";
import http from "@/lib/http";

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const get_auth_profile = async () => {
  try {
    const request = await http.get(API_AUTH_PROFILE);

    return request.data?.data;
  } catch (error) {
    return error;
  }
};
