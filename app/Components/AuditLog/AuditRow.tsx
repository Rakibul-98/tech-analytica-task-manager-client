/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  getActionIcon,
  getActionColor,
  getStatusBadgeColor,
  formatDate,
  formatActionType,
} from "../../utils/audit.utils";

export default function AuditRow({ activity }: { activity: any }) {
  return (
    <tr className="hover:bg-gray-50">
      {/* ACTION */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {getActionIcon(activity.actionType)}
          <span
            className={`px-2 py-1 text-xs rounded-full ${getActionColor(
              activity.actionType
            )}`}
          >
            {formatActionType(activity.actionType)}
          </span>
        </div>
      </td>

      {/* TASK */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium">
          {activity.task?.title}
        </div>
        <div className="text-xs text-gray-500">
          {activity.task?.id?.slice(0, 6)}...
        </div>
      </td>

      {/* CHANGES */}
      <td className="px-6 py-4">
        {activity.actionType === "STATUS_UPDATED" ? (
          <div className="flex gap-2 items-center">
            <span
              className={`px-2 py-0.5 text-xs rounded ${getStatusBadgeColor(
                activity.beforeData?.status
              )}`}
            >
              {activity.beforeData?.status}
            </span>
            →
            <span
              className={`px-2 py-0.5 text-xs rounded ${getStatusBadgeColor(
                activity.afterData?.status
              )}`}
            >
              {activity.afterData?.status}
            </span>
          </div>
        ) : activity.actionType === "ASSIGNMENT_UPDATED" ? (
          <div className="text-sm">
            {activity.beforeData?.assignedUser?.name || "Unassigned"} →{" "}
            {activity.afterData?.assignedUser?.name}
          </div>
        ) : activity.actionType === "TASK_CREATED" ? (
          <span>Created</span>
        ) : activity.actionType === "TASK_DELETED" ? (
          <span className="text-red-500">Deleted</span>
        ) : (
          "-"
        )}
      </td>

      {/* ACTOR */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium">
          {activity.actor?.name}
        </div>
        <div className="text-xs text-gray-500">
          {activity.actor?.role}
        </div>
      </td>

      {/* TIME */}
      <td className="px-6 py-4 text-sm text-gray-500">
        {formatDate(activity.createdAt)}
      </td>
    </tr>
  );
}