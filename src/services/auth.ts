"use server";
import http from "@/lib/http";
import axios from "axios";
import { API_AUTH_PROFILE, API_AUTH_BROKER } from "@/lib/api";
import {
  MyBrokerResponse,
  ProfileResponse,
  DeleteBrokerResponse,
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
