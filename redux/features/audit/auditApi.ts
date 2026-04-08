import { baseApi } from "../../api/baseApi";

export const auditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/audit-logs?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Audits"],
    }),
  }),
});

export const { useGetAuditLogsQuery } = auditApi;
