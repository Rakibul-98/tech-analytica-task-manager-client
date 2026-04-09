/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useGetAuditLogsQuery } from "../../../redux/features/audit/auditApi";
import AuditTable from "./AuditTable";
import TasksSkeleton from "../Tasks/TasksSkeleton";
import { ShieldCheck } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <ShieldCheck size={40} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Audit Log</h1>
            <p className="text-sm text-slate-500 mt-0.5">{total} event{total !== 1 ? 's' : ''} recorded</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <span className="text-xs text-slate-500">Show</span>
          <select
            value={limit}
            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            className="text-sm font-medium text-slate-700 focus:outline-none bg-transparent cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {
        isLoading ? (
          <>
            <TasksSkeleton />
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
          </div>
        )
      }


    </div>
  );
}