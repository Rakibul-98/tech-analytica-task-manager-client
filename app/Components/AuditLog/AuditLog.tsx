/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useGetAuditLogsQuery } from "../../../redux/features/audit/auditApi";
import AuditTable from "./AuditTable";
import TasksSkeleton from "../Tasks/TasksSkeleton";

export default function AuditLog() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, refetch } = useGetAuditLogsQuery({
    page,
    limit,
  });

  const activities = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);


  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load audit logs
        <button
          onClick={() => refetch()}
          className="block mt-3 mx-auto px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }


  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Audit Logs
        </h1>

        <div className="flex items-center gap-2">
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border px-3 py-2 rounded-md text-sm cursor-pointer"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>
      </div>

      {
        isLoading ? (
          <>
            <TasksSkeleton />
            <TasksSkeleton />
          </>
        ) : (
          <AuditTable
            activities={activities}
            meta={data?.meta}
            totalPages={totalPages}
            showPagination={true}
            onPageChange={(newPage: any) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )
      }


    </div>
  );
}