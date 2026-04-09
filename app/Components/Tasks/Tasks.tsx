"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  useGetAllTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation
} from '../../../redux/features/task/taskApi';
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
import { useAppSelector } from '../../../redux/hooks';
import TasksSkeleton from './TasksSkeleton';
import { Plus } from 'lucide-react';

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
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'ADMIN';
  const { data: tasksData, isLoading, isError, refetch } = useGetAllTasksQuery({
    page,
    limit,
    sortOrder: 'asc',
    search: searchTerm || undefined,
    status: statusFilter || undefined,
  });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();


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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tasks</h1>
          <p className="text-sm text-slate-500 mt-0.5">{totalTasks} task{totalTasks !== 1 ? 's' : ''} total</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-200 cursor-pointer"
          >
            <Plus size={16} /> New Task
          </button>
        )}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5">
        <TaskSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={(e) => handleSearchUtil(e, setPage)}
          statusFilter={statusFilter}
          onStatusFilterChange={(v) => { setStatusFilter(v as TaskStatus | ''); setPage(1); }}
          limit={limit}
          setLimit={setLimit}
        />
      </div>


      {
        isLoading ? (
          <TasksSkeleton />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <TaskTable
              tasks={tasks}
              onStatusChange={(id, s) => handleStatusChangeUtil(id, s, updateTaskStatus)}
              onDelete={(id) => handleDeleteTaskUtil(id, deleteTask)}
              onView={(t) => { setViewTask(t); setOpenView(true); }}
              onEdit={(t) => { setEditingTask(t); setOpenEdit(true); }}
              isLoading={isLoading}
              showPagination={true}
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalTasks}
              itemsPerPage={limit}
              onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </div>
        )
      }

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