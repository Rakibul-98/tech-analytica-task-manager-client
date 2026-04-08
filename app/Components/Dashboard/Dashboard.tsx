"use client"

import Header from './Header'
import DashboardStats from './DashboardStats'
import RecentTasks from './RecentTasks'
import RecentActivity from './RecentActivity'
import { useGetAllTasksQuery } from '../../../redux/features/task/taskApi'
import { useGetUsersQuery } from '../../../redux/features/user/userApi'
import { useAppSelector } from '../../../redux/hooks'

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = user?.role === "ADMIN";


  const { data: tasksData, isLoading } = useGetAllTasksQuery({
    sortOrder: "desc",
  });

  const { data: usersData, isLoading: userLoading } = useGetUsersQuery(undefined, {
    skip: !isAdmin,
  });

  if (isAdmin && userLoading) {
    return <p>Loading users...</p>
  }

  const totalUser = isAdmin ? usersData?.meta?.total : 0;

  if (isLoading) {
    return <p>Loading tasks...</p>
  }

  const tasks = tasksData;

  return (
    <div className='space-y-8'>
      <Header user={user} />
      <DashboardStats isAdmin={isAdmin} tasks={tasks} totalUser={totalUser} />
      <RecentTasks tasks={tasks} />
      {
        isAdmin && <RecentActivity />
      }
    </div>
  )
}
