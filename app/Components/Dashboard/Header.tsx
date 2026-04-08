/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react';
import { useGetAllTasksQuery } from '../../../redux/features/task/taskApi';
import EditTaskModal from '../Tasks/EditTaskModal';
import { Search } from 'lucide-react';

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

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between gap-3 items-center lg:items-end text-center lg:text-left'>
      <div>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Welcome, <span className='text-blue-500'>{user?.name || 'Guest'}</span>
        </h2>
        <p className='text-gray-600 mt-1'>Manage tasks efficiently.</p>
      </div>

      <div className='max-w-md relative'>
        <form className='flex' onSubmit={(e) => e.preventDefault()}>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={16} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search tasks..."
              className="w-full px-4 py-2 ps-9 pr-4 text-sm border border-gray-300 rounded-lg"
            />
            {debouncedSearch && searchTasks.length === 0 && !isLoading && (
              <div className="absolute mt-1 w-full bg-white border rounded-md p-3 text-sm text-gray-500">
                No results found
              </div>
            )}
            {debouncedSearch && searchTasks.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto text-left">
                {searchTasks.map((task: any) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskSelect(task)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <div className="font-medium">{task.title}</div>
                    <div className="text-gray-500 text-xs truncate">
                      {task.description || "—"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <EditTaskModal
          open={openModal}
          setOpen={handleModalClose}
          task={selectedTask}
        />
      </div>
    </div>
  );
}