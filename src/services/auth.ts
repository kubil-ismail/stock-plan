// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Response, Profile } from "@/types/index";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    credentials: "include", // penting kalau pakai cookie
  }),
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
