"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUsersQuery,
} from '../../../redux/features/user/userApi';
import { Loader2, Users2 } from 'lucide-react';
import UserTableRow from './UserTableRow';
import TasksSkeleton from '../Tasks/TasksSkeleton';

export default function Users() {

  const { data: usersData, isLoading, isError, refetch } = useGetUsersQuery(undefined);


  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load users. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const users = usersData?.data || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
      </div>

      {
        isLoading ? (
          <TasksSkeleton />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full ">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user: any) => (
                      <UserTableRow
                        key={user.id}
                        user={user}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-16 text-center">
                        <Users2 size={36} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-slate-400 text-sm font-medium">No users found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

    </div>
  );
}