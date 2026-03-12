"use server";
import { API_GENERAL_SECTOR } from "@/lib/api";
import http from "@/lib/http";

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const get_general_sector = async () => {
  try {
    const request = await http.get(API_GENERAL_SECTOR);

    return request.data?.data;
  } catch (error) {
    return error;
  }
};
