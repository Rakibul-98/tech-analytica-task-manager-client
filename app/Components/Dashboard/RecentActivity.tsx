/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  FileText,
  RefreshCw,
  PlusCircle,
  User,
  Clock,
  Loader2,
  Trash2,
} from "lucide-react";
import { useGetAuditLogsQuery } from "../../../redux/features/audit/auditApi";
import { formatDateTime } from "../../utils/task.utils";

export default function RecentActivity() {
  const { data, isLoading, isError } = useGetAuditLogsQuery({
    page: 1,
    limit: 3,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load activities
      </div>
    );
  }

  const activities = data?.data || [];


  const getActionIcon = (type: string) => {
    switch (type) {
      case "TASK_CREATED":
        return <PlusCircle size={16} className="text-green-600" />;
      case "STATUS_UPDATED":
        return <RefreshCw size={16} className="text-blue-600" />;
      case "ASSIGNMENT_UPDATED":
        return <User size={16} className="text-purple-600" />;
      case "TASK_DELETED":
        return <Trash2 size={16} className="text-red-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case "TASK_CREATED":
        return "bg-green-100 text-green-800";
      case "STATUS_UPDATED":
        return "bg-blue-100 text-blue-800";
      case "ASSIGNMENT_UPDATED":
        return "bg-purple-100 text-purple-800";
      case "TASK_DELETED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case "DONE":
        return "bg-green-100 text-green-800";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatActionType = (type: string) => {
    return type.replaceAll("_", " ");
  };


  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Activity
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Changes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity: any) => (
              <tr
                key={activity.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* ACTION */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getActionIcon(activity.actionType)}
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(
                        activity.actionType
                      )}`}
                    >
                      {formatActionType(activity.actionType)}
                    </span>
                  </div>
                </td>

                {/* TASK */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {activity.task?.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {activity.task?.id?.slice(0, 6)}...
                  </div>
                </td>

                {/* CHANGES */}
                <td className="px-6 py-4">
                  {activity.actionType === "STATUS_UPDATED" ? (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeColor(
                          activity.beforeData?.status
                        )}`}
                      >
                        {activity.beforeData?.status}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeColor(
                          activity.afterData?.status
                        )}`}
                      >
                        {activity.afterData?.status}
                      </span>
                    </div>
                  ) : activity.actionType === "ASSIGNMENT_UPDATED" ? (
                    <div className="text-sm text-gray-600">
                      {activity.beforeData?.assignedUser?.name ||
                        "Unassigned"}{" "}
                      → {activity.afterData?.assignedUser?.name}
                    </div>
                  ) : activity.actionType === "TASK_CREATED" ? (
                    <div className="text-sm text-gray-600">
                      Created &quot;{activity.afterData?.title}&quot;
                    </div>
                  ) : activity.actionType === "TASK_DELETED" ? (
                    <div className="text-sm text-red-500">
                      Task deleted
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>

                {/* ACTOR */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {activity.actor?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.actor?.role}
                      </div>
                    </div>
                  </div>
                </td>

                {/* TIME */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" />
                    <div className="text-sm text-gray-500">
                      {formatDateTime(activity.createdAt)}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No recent activities</p>
        </div>
      )}
    </div>
  );
}