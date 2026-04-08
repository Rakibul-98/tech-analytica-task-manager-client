/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AuditRow from "./AuditRow";
import Pagination from "../shared/Pagination";

export default function AuditTable({ activities, meta, showPagination, onPageChange, totalPages }: any) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Changes
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Actor
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Time
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {activities.length > 0 ? (
              activities.map((item: any) => (
                <AuditRow key={item.id} activity={item} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No data found
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