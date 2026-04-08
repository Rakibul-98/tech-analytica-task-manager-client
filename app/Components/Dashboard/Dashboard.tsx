import React from 'react'
import Header from './Header'
import DashboardStats from './DashboardStats'
import RecentTasks from './RecentTasks'
import RecentActivity from './RecentActivity'

export default function Dashboard() {
  return (
    <div>
      <Header />
      <DashboardStats />
      <RecentTasks />
      <RecentActivity />
    </div>
  )
}
