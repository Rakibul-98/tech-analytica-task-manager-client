/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { statusOptions } from '../../utils/task.utils';

interface TaskSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  limit: number;
  setLimit: (value: number) => void;

}

export default function TaskSearchBar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  statusFilter,
  onStatusFilterChange,
  limit,
  setLimit,
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
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 cursor-pointer"
        >
          {statusOptions.map((option: any) => (
            <option className='cursor-pointer' key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div>
          <input
            id="limit"
            type="number"
            min="1"
            max="100"
            value={limit}

            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-center"
          />
          <span className="ms-2 text-gray-600">Per page</span>
        </div>
      </div>
    </div>
  );
}