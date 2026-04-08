import { baseApi } from "../../api/baseApi";
import { AuthResponse } from "./auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks", "Audits", "User"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
