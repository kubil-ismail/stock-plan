"use server";

import { API_COMPANIES } from "@/lib/api";
import { StocksResponse } from "@/types/company";
import http from "@/lib/http";
import axios from "axios";

export const get_companies = async (
  page: number = 1,
  limit: number = 10
): Promise<StocksResponse> => {
  try {
    const request = await http.get<StocksResponse>(API_COMPANIES, {
      params: { page, limit },
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
