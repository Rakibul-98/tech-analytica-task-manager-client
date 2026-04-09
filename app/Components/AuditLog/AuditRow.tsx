/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  getActionIcon,
  getActionColor,
  getStatusBadgeColor,
  formatDate,
  formatActionType,
} from "../../utils/audit.utils";
import { UserCircle } from "lucide-react";

export default function AuditRow({ activity }: { activity: any }) {
  return (
    <tr className="hover:bg-slate-50/60 transition-colors border-b border-slate-100 last:border-0">
      {/* ACTION */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center`}>
            {getActionIcon(activity.actionType)}
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getActionColor(activity.actionType)}`}>
            {formatActionType(activity.actionType)}
          </span>
        </div>
      </td>

      {/* TASK */}
      <td className="px-5 py-3.5">
        <p className="text-sm font-medium text-slate-800 leading-tight">{activity.task?.title ?? "—"}</p>
        <p className="text-xs text-slate-400 font-mono mt-0.5">{activity.task?.id?.slice(0, 8)}…</p>
      </td>

      {/* CHANGES */}
      <td className="px-5 py-3.5">
        {activity.actionType === "STATUS_UPDATED" ? (
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusBadgeColor(activity.beforeData?.status)}`}>
              {activity.beforeData?.status}
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusBadgeColor(activity.afterData?.status)}`}>
              {activity.afterData?.status}
            </span>
          </div>
        ) : activity.actionType === "ASSIGNMENT_UPDATED" ? (
          <p className="text-xs text-slate-600">
            <span className="text-slate-400">{activity.beforeData?.assignedUser?.name || "Unassigned"}</span>
            <span className="mx-1.5 text-slate-400">→</span>
            <span className="font-medium">{activity.afterData?.assignedUser?.name ?? "—"}</span>
          </p>
        ) : activity.actionType === "TASK_CREATED" ? (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Created</span>
        ) : activity.actionType === "TASK_DELETED" ? (
          <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Deleted</span>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        )}
      </td>

      {/* ACTOR */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <UserCircle size={13} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800 leading-tight">{activity.actor?.name}</p>
            <p className="text-xs text-slate-400">{activity.actor?.role}</p>
          </div>
        </div>
      </td>

      {/* TIME */}
      <td className="px-5 py-3.5">
        <p className="text-xs text-slate-500">{formatDate(activity.createdAt)}</p>
      </td>
    </tr>
  );
}