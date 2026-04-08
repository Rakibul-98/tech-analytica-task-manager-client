"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  useGetAllTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation
} from '../../../redux/features/task/taskApi';
import { Loader2 } from 'lucide-react';
import { TaskStatus } from '../../../redux/features/task/task.type';
import {
  handleStatusChange as handleStatusChangeUtil,
  handleDeleteTask as handleDeleteTaskUtil,
  handleSearch as handleSearchUtil,
  handleFilterChange as handleFilterChangeUtil
} from '../../utils/task.utils';
import TaskSearchBar from './TaskSearchBar';
import TaskTableRow from './TaskTableRow';
import Pagination from '../shared/Pagination';

export default function Tasks() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: tasksData, isLoading, isError, refetch } = useGetAllTasksQuery({
    page,
    search: searchTerm || undefined,
  });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    handleStatusChangeUtil(taskId, newStatus, updateTaskStatus, refetch);
  };

  const handleDeleteTask = (taskId: string) => {
    handleDeleteTaskUtil(taskId, deleteTask, refetch);
  };

  const handleSearch = (e: React.FormEvent) => {
    handleSearchUtil(e, setPage, refetch);
  };

  const handleFilterChange = (value: string) => {
    handleFilterChangeUtil(value, setStatusFilter, setPage);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTask = (task: any) => {
    console.log('View task:', task);
  };

  const handleEditTask = (task: any) => {
    console.log('Edit task:', task);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load tasks. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }


  const tasks = tasksData?.data || [];
  const totalTasks = tasksData?.meta?.total || 0;
  const totalPages = Math.ceil(totalTasks / limit);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Tasks Management</h1>

        <TaskSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={handleFilterChange}
          onRefresh={() => refetch()}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.length > 0 ? (
                tasks.map((task: any) => (
                  <TaskTableRow
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                    onView={handleViewTask}
                    onEdit={handleEditTask}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalTasks > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalTasks}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}