"use server";

import { API_COMPANIES } from "@/lib/api";
import { StockDetailResponse, StocksResponse } from "@/types/company";
import http from "@/lib/http";
import axios from "axios";

export const get_companies = async ({
  page = 1,
  limit = 10,
  search = "",
  sector = "",
}: {
  page?: string | number;
  limit?: string | number;
  search?: string;
  sector?: string;
}): Promise<StocksResponse> => {
  try {
    const request = await http.get<StocksResponse>(API_COMPANIES, {
      params: { page, limit, search, sector },
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

export const get_detail_companies = async (
  code: string
): Promise<StockDetailResponse> => {
  try {
    const request = await http.get<StockDetailResponse>(
      `${API_COMPANIES}/${code.toUpperCase()}`
    );

    return request.data;
  } catch (error) {
    let message = "Something went wrong";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? error.message;
    }

    return {
      status: false,
      message: message,
      data: {
        id: 0,
        ticker: "",
        name: "",
        logo: "",
        office_address: "",
        email: "",
        phone: "",
        fax: "",
        tin: "",
        website: "",
        listing_date: "",
        listing_board: "",
        main_business: "",
        sector: {
          id: 0,
          name: "",
        },
        subsector: {
          id: 0,
          name: "",
        },
        industry: {
          id: 0,
          name: "",
        },
        subindustry: {
          id: 0,
          name: "",
        },
        managements: [],
        shareholders: [],
        subsidiaries: [],
      },
      options: { page: 0, limit: 0, total: 0 },
    };
  }
};
