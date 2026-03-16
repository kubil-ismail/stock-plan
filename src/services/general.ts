"use server";
import { API_GENERAL_SECTOR } from "@/lib/api";
import { SectorResponse } from "@/types/general";
import axios from "axios";
import http from "@/lib/http";

export const get_general_sector = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<SectorResponse> => {
  try {
    const request = await http.get<SectorResponse>(API_GENERAL_SECTOR, {
      params: { page, limit, search },
    });

    return request.data;
  } catch (error) {
    let message = "Something went wrong";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? error.message;
    }

    return {
      status: false,
      message: message,
      data: [],
      options: { page: 0, limit: 0, total: 0 },
    };
  }
};
