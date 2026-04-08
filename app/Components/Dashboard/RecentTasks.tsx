"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} from "../../../redux/features/task/taskApi";
import { TaskStatus } from "../../../redux/features/task/task.type";
import TaskTableRow from "../Tasks/TaskTableRow";
import EditTaskModal from "../Tasks/EditTaskModal";
import ViewTaskModal from "../Tasks/ViewTaskModal";

export default function RecentTasks({ tasks }: any) {
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {recentTasks.length > 0 ? (
              recentTasks.map((task: any) => (
                <TaskTableRow
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  onView={handleViewTask}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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