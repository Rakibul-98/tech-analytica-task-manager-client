import { CheckCheck, Clock, Layers, Users2 } from "lucide-react";

export default function DashboardStats() {

  const stats = [
    {
      title: "Total Tasks",
      value: "4",
      icon: <Layers size={40} />
    },
    {
      title: "Completed Tasks",
      value: "2",
      icon: <CheckCheck size={40} />
    },
    {
      title: "Pending Tasks",
      value: "1",
      icon: <Clock size={40} />
    },
    {
      title: "Total Users",
      value: "1",
      icon: <Users2 size={40} />
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="w-full bg-white shadow rounded-sm flex gap-5 items-center p-5">
          {stat.icon}
          <div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <small className="text-gray-600">{stat.title}</small>
          </div>
        </div>
      ))}
    </div>
  )
}