/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AuditRow from "./AuditRow";
import Pagination from "../shared/Pagination";
import { ShieldCheck } from "lucide-react";

export default function AuditTable({ activities, meta, showPagination, onPageChange, totalPages }: any) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Task</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Changes</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actor</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((item: any) => (
                <AuditRow key={item.id} activity={item} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <ShieldCheck size={36} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-400 text-sm font-medium">No audit logs found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {
        showPagination && (
          <Pagination
            currentPage={meta.page}
            totalPages={totalPages}
            totalItems={meta.total}
            itemsPerPage={meta.limit}
            onPageChange={onPageChange!}
          />
        )
      }
    </div>
  );
}