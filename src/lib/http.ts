import axios from "axios";
import Cookies from "js-cookie";
import { cookies, headers } from "next/headers";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL_API_GATEWAY}`,
});

// Add a request interceptor
http.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("token");
    if (Cookies.get("token") || accessToken?.value) {
      config.headers["Authorization"] =
        "Bearer " + (Cookies.get("token") ?? accessToken?.value);
    }

    // Set Origin for Log API kibana
    const reqHeaders = await headers();
    const referer = reqHeaders.get("referer"); // Mendapatkan URL penuh

    config.headers["Origin"] = referer;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Tangani respons sukses di sini jika diperlukan
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Tangani error 401 di sini, misalnya, redirect atau tampilkan pesan
      if (typeof window !== "undefined") {
        window.location.replace("/auth/logout");
      }
    }
    return Promise.reject(error);
  }
);

export default http;
