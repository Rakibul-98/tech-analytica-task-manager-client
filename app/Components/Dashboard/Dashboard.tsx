"use client"

import Header from './Header'
import DashboardStats from './DashboardStats'
import RecentTasks from './RecentTasks'
import RecentActivity from './RecentActivity'
import { useGetAllTasksQuery } from '../../../redux/features/task/taskApi'
import { useGetUsersQuery } from '../../../redux/features/user/userApi'
import { useAppSelector } from '../../../redux/hooks'
import DashboardSkeleton from './DashboardSkeleton'

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = user?.role === "ADMIN";

  const { data: tasksData, isLoading } = useGetAllTasksQuery({
    sortOrder: "desc",
  });

  const { data: usersData, isLoading: userLoading } = useGetUsersQuery(undefined, {
    skip: !isAdmin,
  });

  const totalUser = isAdmin ? usersData?.meta?.total : 0;

  const tasks = tasksData;

  return (
    <div className='space-y-8'>
      {
        isLoading && userLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <Header user={user} />
            <DashboardStats isAdmin={isAdmin} tasks={tasks} totalUser={totalUser} />
            <RecentTasks tasks={tasks} isLoading={isLoading} />
            {
              isAdmin && <RecentActivity />
            }
          </>
        )
      }
    </div>
  )
}
