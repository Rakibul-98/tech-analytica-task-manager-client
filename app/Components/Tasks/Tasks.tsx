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
  handleSearch as handleSearchUtil
} from '../../utils/task.utils';
import TaskSearchBar from './TaskSearchBar';
import CreateTaskModal from './CreateTaskModal';
import EditTaskModal from './EditTaskModal';
import ViewTaskModal from './ViewTaskModal';
import TaskTable from './TaskTable';

export default function Tasks() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [viewTask, setViewTask] = useState<any>(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data: tasksData, isLoading, isError, refetch } = useGetAllTasksQuery({
    page,
    limit,
    sortOrder: 'asc',
    search: searchTerm || undefined,
    status: statusFilter || undefined,
  });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    handleStatusChangeUtil(taskId, newStatus, updateTaskStatus);
  };

  const handleDeleteTask = (taskId: string) => {
    handleDeleteTaskUtil(taskId, deleteTask);
  };

  const handleSearch = (e: React.FormEvent) => {
    handleSearchUtil(e, setPage);
  };

  const handleFilterChange = (value: string) => {
    const validStatus = value as TaskStatus | '';
    setStatusFilter(validStatus);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTask = (task: any) => {
    setViewTask(task);
    setOpenView(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setOpenEdit(true);
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
    <div className="">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage tasks</h1>
          <button
            onClick={() => setOpenCreate(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create New Task
          </button>

        </div>

        <TaskSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={handleFilterChange}
          limit={limit}
          setLimit={setLimit}
        />
      </div>

      <TaskTable
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteTask}
        onView={handleViewTask}
        onEdit={handleEditTask}
        isLoading={isLoading}
        showPagination={true}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalTasks}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
      />

      <CreateTaskModal open={openCreate} setOpen={setOpenCreate} />


      <ViewTaskModal
        open={openView}
        setOpen={setOpenView}
        task={viewTask}
      />

      <EditTaskModal
        open={openEdit}
        setOpen={setOpenEdit}
        task={editingTask}
      />
    </div>
  );
}