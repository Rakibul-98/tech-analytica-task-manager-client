/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { statusOptions } from '../../utils/task.utils';
import { Search } from 'lucide-react';

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
    <div className="flex flex-col sm:flex-row gap-3">
      <form onSubmit={onSearchSubmit} className="flex-1 relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all bg-slate-50 focus:bg-white"
        />
      </form>
      <div className="flex gap-2.5">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-slate-50 text-slate-700 cursor-pointer"
        >
          {statusOptions.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="number" min="1" max="100" value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-16 px-2 py-2.5 text-sm text-center border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-slate-50"
          />
          <span className="text-xs text-slate-500 whitespace-nowrap">per page</span>
        </div>
      </div>
    </div>
  );
}