/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { TaskStatus } from "../../redux/features/task/task.type";

export const handleStatusChange = async (
  taskId: string,
  newStatus: TaskStatus,
  updateTaskStatus: any,
) => {
  try {
    await updateTaskStatus({ taskId, data: { status: newStatus } }).unwrap();
    toast.success("Task status updated successfully");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update task status");
  }
};

export const handleDeleteTask = async (taskId: string, deleteTask: any) => {
  try {
    await deleteTask(taskId).unwrap();
    toast.success("Task deleted successfully");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to delete task");
  }
};

export const handleSearch = (
  e: React.FormEvent,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  e.preventDefault();
  setPage(1);
};

export const handleFilterChange = (
  value: string,
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  setStatusFilter(value);
  setPage(1);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "DONE":
      return "bg-green-100 text-green-800";
    case "PROCESSING":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const statusOptions = [
  { value: "", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "DONE", label: "Done" },
];
