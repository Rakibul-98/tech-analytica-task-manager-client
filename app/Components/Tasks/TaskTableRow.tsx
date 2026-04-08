/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { TaskStatus } from '../../../redux/features/task/task.type';
import { formatDateTime, getStatusColor } from '../../utils/task.utils';

interface TaskTableRowProps {
  task: any;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onView?: (task: any) => void;
  onEdit?: (task: any) => void;
}

export default function TaskTableRow({
  task,
  onStatusChange,
  onDelete,
  onView,
  onEdit
}: TaskTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{task.title}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500 max-w-xs truncate">{task.description || '—'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusColor(task.status)}`}
        >
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="DONE">Done</option>
        </select>
      </td>
      <td className="px-6 py-4">
        {task.assignedUser ? (
          <>
            <div className="text-sm text-gray-900">{task.assignedUser.name}</div>
            <div className="text-sm text-gray-500">{task.assignedUser.email}</div>
          </>
        ) : (
          <div className="text-sm text-gray-500">Unassigned</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDateTime(task.createdAt)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-2">
          {onView && (
            <button
              onClick={() => onView(task)}
              className="text-blue-600 hover:text-blue-900 transition-colors"
              title="View Details"
            >
              <Eye size={18} />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="text-green-600 hover:text-green-900 transition-colors"
              title="Edit"
            >
              <Edit size={18} />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-900 transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}