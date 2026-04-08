import { baseApi } from "../../api/baseApi";

// userApi.ts
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
