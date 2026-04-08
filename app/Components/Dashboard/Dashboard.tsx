"use client"

import Header from './Header'
import DashboardStats from './DashboardStats'
import RecentTasks from './RecentTasks'
import RecentActivity from './RecentActivity'
import { useGetAllTasksQuery } from '../../../redux/features/task/taskApi'

export default function Dashboard() {

  const { data: tasksData, isLoading } = useGetAllTasksQuery({
    sortOrder: "desc",
  });

  if (isLoading) {
    return <p>Loading tasks...</p>
  }

  const tasks = tasksData;

  console.log(tasks)

  return (
    <div className='space-y-8'>
      <Header />
      <DashboardStats tasks={tasks} />
      <RecentTasks tasks={tasks} />
      <RecentActivity />
    </div>
  )
}
