
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShieldCheck, User } from 'lucide-react';
import { formatDateTime } from '../../utils/task.utils';

interface UserTableRowProps {
  user: any;
}

export default function UserTableRow({
  user,
}: UserTableRowProps) {

  const isAdmin = user.role === 'ADMIN';
  const initials = user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isAdmin ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
            }`}>
            {initials}
          </div>
          <p className="text-sm font-semibold text-slate-800">{user.name}</p>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="px-5 py-3.5">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${isAdmin
            ? 'bg-indigo-50 text-indigo-700'
            : 'bg-slate-100 text-slate-600'
          }`}>
          {isAdmin ? <ShieldCheck size={11} /> : <User size={11} />}
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {formatDateTime(user.createdAt)}
        </div>
      </td>
    </tr>
  );
}