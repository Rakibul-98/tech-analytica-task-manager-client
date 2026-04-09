/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, Edit, UserCircle } from 'lucide-react';
import { TaskStatus } from '../../../redux/features/task/task.type';
import { formatDateTime, getStatusColor } from '../../utils/task.utils';
import { useGetUsersQuery } from '../../../redux/features/user/userApi';
import { useUpdateTaskMutation } from '../../../redux/features/task/taskApi';
import { toast } from 'sonner';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useAppSelector } from '../../../redux/hooks';

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
  onEdit,

}: TaskTableRowProps) {

  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'ADMIN';

  const { data: usersData } = useGetUsersQuery(undefined, {
    skip: !isAdmin,
  });
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const handleAssignUser = async (userId: string) => {
    try {
      await updateTask({
        taskId: task.id,
        data: { assignedUserId: userId },
      }).unwrap();

      toast.success("User assigned successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to assign user");
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-5 py-3.5">
        <span className="text-sm font-semibold text-slate-800">{task.title}</span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500 max-w-50 truncate block">{task.description || '—'}</div>
      </td>
      <td className="px-5 py-3.5">
        <select
          value={task.status}
          disabled={isLoading}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className={`text-xs text-center font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-indigo-500/30 focus:outline-none appearance-none ${getStatusColor(task.status)}`}
        >
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="DONE">Done</option>
        </select>
      </td>
      <td className="px-5 py-3.5">
        {task.assignedUser ? (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <UserCircle size={14} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800 leading-tight">{task.assignedUser.name}</p>
              <p className="text-xs text-slate-400">{task.assignedUser.email}</p>
            </div>
          </div>
        ) : isAdmin ? (
          <select
            onChange={(e) => handleAssignUser(e.target.value)}
            defaultValue=""
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-slate-600 bg-white"
          >
            <option value="" disabled>Assign user</option>
            {usersData?.data?.map((u: any) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        ) : (
          <span className="text-xs text-slate-400 italic">Unassigned</span>
        )}
      </td>
      <td className="px-5 py-3.5">
        <span className="text-xs text-slate-500">{formatDateTime(task.createdAt)}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex justify-center gap-2">
          {onView && (
            <button
              onClick={() => onView(task)}
              className="cursor-pointer"
              title="View Details"
            >
              <Eye size={18} />
            </button>
          )}
          {isAdmin && (
            <>
              {onEdit && (
                <button
                  onClick={() => onEdit(task)}
                  className=" cursor-pointer"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
              )}
              <DeleteConfirmationModal onDelete={onDelete} taskId={task.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}