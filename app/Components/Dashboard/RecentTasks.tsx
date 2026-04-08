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

export default function RecentTasks({ tasks, isLoading }: any) {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Tasks
        </h2>
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