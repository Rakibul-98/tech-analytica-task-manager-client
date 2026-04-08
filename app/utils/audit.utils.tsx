import {
  FileText,
  RefreshCw,
  PlusCircle,
  User,
  Trash2,
} from "lucide-react";

export const getActionIcon = (type: string) => {
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

export const getActionColor = (type: string) => {
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

export const getStatusBadgeColor = (status?: string) => {
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

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatActionType = (type: string) =>
  type.replaceAll("_", " ");