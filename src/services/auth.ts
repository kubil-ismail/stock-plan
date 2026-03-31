"use server";
import { API_AUTH_PROFILE } from "@/lib/api";
import http from "@/lib/http";
import axios from "axios";
import { ProfileResponse } from "@/types/auth";

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
