// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Response, Profile } from "@/types/index";

const baseQuery = fetchBaseQuery({
  credentials: "include", // kirim cookie
});

export const baseQueryWith401Handler: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn("Session expired, logging out...");

    // // 🔥 redirect (client-side safe)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWith401Handler,
  endpoints: (build) => ({
    getProfile: build.query<Profile, void>({
      query: () => "api/auth/profile",
      transformResponse: (response: Response<Profile>) => response.data,
      keepUnusedDataFor: 60 * 60, // 1 jam
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery } = authApi;
