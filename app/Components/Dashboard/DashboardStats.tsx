/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCheck, Clock, Layers, Users2 } from "lucide-react";

export default function DashboardStats({ tasks, totalUser }: any) {

  const totalTask = tasks.meta.total;

  const processingTasks = tasks?.data?.filter(
    (task: any) => task.status === "PROCESSING"
  ).length || 0;

  const pendingTasks = tasks?.data?.filter(
    (task: any) => task.status === "PENDING"
  ).length || 0;


  const stats = [
    {
      title: "Total Tasks",
      value: totalTask,
      icon: <Layers size={30} />
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: <Clock size={30} />
    },
    {
      title: "Processing Tasks",
      value: processingTasks,
      icon: <CheckCheck size={30} />
    },
    {
      title: "Total Users",
      value: totalUser,
      icon: <Users2 size={30} />
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="w-full bg-white shadow rounded-sm flex gap-5 items-center p-5">
          <div className="bg-gray-200 p-3 rounded-md">
            {stat.icon}
          </div>
          <div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <small className="text-gray-600">{stat.title}</small>
          </div>
        </div>
      ))}
    </div>
  )
}