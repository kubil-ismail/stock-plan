"use server";
import http from "@/lib/http";
import axios from "axios";
import {
  API_AUTH_PROFILE,
  API_AUTH_BROKER,
  API_AUTH_TRADING_PLAN,
} from "@/lib/api";
import {
  MyBrokerResponse,
  ProfileResponse,
  DeleteBrokerResponse,
  MyTradingPlanResponse,
  AddTradingPlanResponse,
  EditTradingPlanResponse,
} from "@/types/auth";

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const get_auth_profile = async (): Promise<ProfileResponse> => {
  try {
    const request = await http.get<ProfileResponse>(API_AUTH_PROFILE);

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
        username: "",
        email: "",
        fullname: "",
      },
    };
  }
};

export const update_auth_profile = async (payload: {
  fullname: string;
  email: string;
  username: string;
}): Promise<ProfileResponse> => {
  try {
    const request = await http.patch<ProfileResponse>(
      API_AUTH_PROFILE,
      payload
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
        username: "",
        email: "",
        fullname: "",
      },
    };
  }
};

export const get_auth_brokers = async (): Promise<MyBrokerResponse> => {
  try {
    const request = await http.get<MyBrokerResponse>(API_AUTH_BROKER);

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
      options: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  }
};

export const add_auth_brokers = async (payload: {
  broker_id: number | string;
  account_number: number | string;
  notes: string;
}): Promise<DeleteBrokerResponse> => {
  try {
    const request = await http.post<DeleteBrokerResponse>(
      API_AUTH_BROKER,
      payload
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
      data: 0,
    };
  }
};

export const delete_auth_brokers = async (
  id: string | number
): Promise<DeleteBrokerResponse> => {
  try {
    const request = await http.delete<DeleteBrokerResponse>(
      `${API_AUTH_BROKER}/${id}`
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
      data: 0,
    };
  }
};

export const get_auth_trading_plan = async ({
  page = 1,
  limit = 48,
  search = "",
  sector = "",
}: {
  page?: string | number;
  limit?: string | number;
  search?: string;
  sector?: string;
}): Promise<MyTradingPlanResponse> => {
  try {
    const request = await http.get<MyTradingPlanResponse>(
      API_AUTH_TRADING_PLAN,
      {
        params: { page, limit, search, sector },
      }
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
      data: [],
      options: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  }
};

export const add_auth_trading_plan = async (payload: {
  ticker: string;
  order_type: string;
  broker_id: number | string;
  price: number | string;
  lot: number | string;
  expiry: string;
}): Promise<AddTradingPlanResponse> => {
  try {
    const request = await http.post<AddTradingPlanResponse>(
      API_AUTH_TRADING_PLAN,
      payload
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
        order_type: "",
        price: 0,
        lot: 0,
        expiry: "",
        status: "",
        user_broker: {
          id: 0,
          account_number: 0,
          notes: "",
          broker: {
            name: "",
            ticker: "",
            type: [],
          },
        },
      },
    };
  }
};

export const edit_auth_trading_plan = async (payload: {
  id: string | number;
  ticker: string;
  order_type: string;
  broker_id: number | string;
  price: number | string;
  lot: number | string;
  expiry: string;
}): Promise<EditTradingPlanResponse> => {
  try {
    const request = await http.patch<EditTradingPlanResponse>(
      `${API_AUTH_TRADING_PLAN}/${payload.id}`,
      payload
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
      data: [0],
    };
  }
};
