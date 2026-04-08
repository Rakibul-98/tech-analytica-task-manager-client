
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDateTime } from '../../utils/task.utils';

interface UserTableRowProps {
  user: any;
}

export default function UserTableRow({
  user,
}: UserTableRowProps) {

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.role}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {formatDateTime(user.createdAt)}
        </div>
      </td>
    </tr>
  );
}