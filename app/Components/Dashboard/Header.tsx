/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react';
import { useGetAllTasksQuery } from '../../../redux/features/task/taskApi';
import EditTaskModal from '../Tasks/EditTaskModal';
import { Search, X } from 'lucide-react';

export default function Header({ user }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: searchData, isLoading } = useGetAllTasksQuery(
    debouncedSearch
      ? { search: debouncedSearch, limit: 5 }
      : undefined,
    {
      skip: !debouncedSearch,
    }
  );

  const searchTasks = searchData?.data || [];

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task);
    setOpenModal(true);
    setSearchTerm("");
    setDebouncedSearch("");
  };

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";


  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
      <div>
        <p className="text-xs font-medium text-indigo-500 uppercase tracking-wider mb-0.5">{greeting}</p>
        <h2 className="text-2xl font-bold text-slate-900">
          {user?.name || 'Guest'} 👋
        </h2>
        <p className="text-slate-500 text-sm mt-0.5">Here&apos;s what&apos;s happening with your tasks today.</p>
      </div>

      <div className="relative w-full sm:w-72">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all shadow-sm"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={14} />
          </button>
        )}

        {debouncedSearch && !isLoading && searchTasks.length === 0 && (
          <div className="absolute mt-2 w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-500 shadow-lg z-50 text-center">
            No tasks found
          </div>
        )}
        {debouncedSearch && searchTasks.length > 0 && (
          <div className="absolute mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            {searchTasks.map((task: any) => (
              <div
                key={task.id}
                onClick={() => handleTaskSelect(task)}
                className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
              >
                <div className="font-medium text-sm text-slate-800">{task.title}</div>
                <div className="text-xs text-slate-400 truncate mt-0.5">{task.description || "No description"}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditTaskModal open={openModal} setOpen={() => { setOpenModal(false); setSelectedTask(null); }} task={selectedTask} />
    </div>
  );
}