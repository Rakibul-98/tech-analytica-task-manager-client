"use client"

import Header from './Header'
import DashboardStats from './DashboardStats'
import RecentTasks from './RecentTasks'
import RecentActivity from './RecentActivity'
import { useGetAllTasksQuery } from '../../../redux/features/task/taskApi'
import { useGetUsersQuery } from '../../../redux/features/user/userApi'

export default function Dashboard() {

  const { data: tasksData, isLoading } = useGetAllTasksQuery({
    sortOrder: "desc",
  });

  const { data: usersData, isLoading: userLoading } = useGetUsersQuery(undefined);

  if (userLoading) {
    return <p>Loading users...</p>
  }

  const totalUser = usersData.meta.total;

  if (isLoading) {
    return <p>Loading tasks...</p>
  }

  const tasks = tasksData;

  return (
    <div className='space-y-8'>
      <Header />
      <DashboardStats tasks={tasks} totalUser={totalUser} />
      <RecentTasks tasks={tasks} />
      <RecentActivity />
    </div>
  )
}
