/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle2, Clock, Layers3, TrendingUp, Users2 } from "lucide-react";

export default function DashboardStats({ tasks, totalUser, isAdmin }: any) {

  const totalTask = tasks?.meta?.total || 0;

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
      icon: Layers3,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
      trend: null,
      show: true,
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      trend: null,
      show: true,
    },
    {
      title: "In Progress",
      value: processingTasks,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      trend: null,
      show: true,
    },
    {
      title: "Completed",
      value: (totalTask - processingTasks - pendingTasks),
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      trend: null,
      show: true,
    },
    {
      title: "Total Users",
      value: totalUser,
      icon: Users2,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      trend: null,
      show: isAdmin,
    },
  ].filter(s => s.show);

  return (
    <div className={`grid grid-cols-2 ${isAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4`}>
      {stats.map((stat, index) => (
        <div key={index} className={`bg-white rounded-2xl border ${stat.border} p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.title}</span>
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon size={16} className={stat.color} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}