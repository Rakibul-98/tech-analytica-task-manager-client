/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { statusOptions } from '../../utils/task.utils';

interface TaskSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onRefresh: () => void;
}

export default function TaskSearchBar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  statusFilter,
  onStatusFilterChange,
  onRefresh
}: TaskSearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <form onSubmit={onSearchSubmit} className="flex gap-2 flex-1">
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
        />
      </form>

      <div className="flex gap-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
}