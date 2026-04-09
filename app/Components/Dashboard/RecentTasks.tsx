"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} from "../../../redux/features/task/taskApi";
import { TaskStatus } from "../../../redux/features/task/task.type";
import EditTaskModal from "../Tasks/EditTaskModal";
import ViewTaskModal from "../Tasks/ViewTaskModal";
import TaskTable from "../Tasks/TaskTable";
import TasksSkeleton from "../Tasks/TasksSkeleton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecentTasks({ tasks, isLoading }: any) {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const router = useRouter();

  const recentTasks = tasks?.data
    ? [...tasks.data]
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 3)
    : [];

  const handleStatusChange = async (
    taskId: string,
    newStatus: TaskStatus
  ) => {
    await updateTaskStatus({
      taskId,
      data: { status: newStatus },
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setOpenView(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Recent Tasks</h2>
          <p className="text-xs text-slate-500 mt-0.5">Your latest tasks</p>
        </div>
        <button
          onClick={() => router.push('/tasks')}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View all <ArrowRight size={13} />
        </button>
      </div>

      {
        isLoading ? (
          <TasksSkeleton />
        ) : (
          <TaskTable
            tasks={recentTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onView={handleViewTask}
            onEdit={handleEditTask}
            emptyMessage="No tasks found"
            showPagination={false}
          />
        )
      }

      <EditTaskModal
        open={openEdit}
        setOpen={setOpenEdit}
        task={selectedTask}
      />

      <ViewTaskModal
        open={openView}
        setOpen={setOpenView}
        task={selectedTask}
      />
    </div>
  );
}