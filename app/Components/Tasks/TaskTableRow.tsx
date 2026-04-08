/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, Edit } from 'lucide-react';
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
          disabled={isLoading}
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
          isAdmin && (
            <select
              onChange={(e) => handleAssignUser(e.target.value)}
              defaultValue=""
              className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Assign user
              </option>
              {usersData?.data?.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          )
        )}
        {!task.assignedUser && !isAdmin && (
          <div className="text-sm text-gray-500">Not assigned</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDateTime(task.createdAt)}</div>
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