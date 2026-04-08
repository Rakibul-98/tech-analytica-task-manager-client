import React from 'react';
import { FileText, RefreshCw, PlusCircle, User, Clock } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: "caf4cae1-0764-44da-891f-3e003989aaeb",
      actor: {
        name: "Normal User",
        email: "user@taskapp.com",
        role: "USER"
      },
      actionType: "STATUS_UPDATED",
      task: {
        id: "d61e1c21-ff35-4297-9b0a-abefcf4f7eab",
        title: "Fix login bug",
        status: "DONE"
      },
      beforeData: {
        status: "PROCESSING"
      },
      afterData: {
        status: "DONE"
      },
      createdAt: "2026-04-08T03:45:44.222Z"
    },
    {
      id: "e5ada1e1-8a11-47aa-b555-ec57d031a3fb",
      actor: {
        name: "Admin User",
        email: "admin@taskapp.com",
        role: "ADMIN"
      },
      actionType: "STATUS_UPDATED",
      task: {
        id: "d61e1c21-ff35-4297-9b0a-abefcf4f7eab",
        title: "Fix login bug",
        status: "DONE"
      },
      beforeData: {
        status: "PENDING"
      },
      afterData: {
        status: "PROCESSING"
      },
      createdAt: "2026-04-08T03:41:41.262Z"
    },
    {
      id: "4905b89b-17b7-42fb-8dfc-7c8b633c9923",
      actor: {
        name: "Admin User",
        email: "admin@taskapp.com",
        role: "ADMIN"
      },
      actionType: "TASK_CREATED",
      task: {
        id: "d61e1c21-ff35-4297-9b0a-abefcf4f7eab",
        title: "Fix login bug",
        status: "DONE"
      },
      beforeData: null,
      afterData: {
        title: "Fix login bug",
        status: "PENDING",
        description: "The login page crashes on mobile",
        assignedUser: {
          name: "Normal User",
          email: "user@taskapp.com"
        }
      },
      createdAt: "2026-04-08T03:39:10.501Z"
    }
  ];

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'TASK_CREATED':
        return <PlusCircle size={16} className="text-green-600" />;
      case 'STATUS_UPDATED':
        return <RefreshCw size={16} className="text-blue-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'TASK_CREATED':
        return 'bg-green-100 text-green-800';
      case 'STATUS_UPDATED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string | undefined) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-100 text-green-800';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatActionType = (actionType: string) => {
    return actionType.replace('_', ' ');
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getActionIcon(activity.actionType)}
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(activity.actionType)}`}>
                      {formatActionType(activity.actionType)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{activity.task.title}</div>
                  <div className="text-xs text-gray-500">ID: {activity.task.id.slice(0, 8)}...</div>
                </td>
                <td className="px-6 py-4">
                  {activity.actionType === 'STATUS_UPDATED' ? (
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeColor(activity.beforeData?.status)}`}>
                        {activity.beforeData?.status}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeColor(activity.afterData?.status)}`}>
                        {activity.afterData?.status}
                      </span>
                    </div>
                  ) : activity.actionType === 'TASK_CREATED' ? (
                    <div className="text-sm text-gray-600">
                      Created task &quot;{activity.afterData?.title}&quot;
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{activity.actor.name}</div>
                      <div className="text-xs text-gray-500">{activity.actor.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" />
                    <div className="text-sm text-gray-500">{formatDate(activity.createdAt)}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activities.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No recent activities</p>
        </div>
      )}
    </div>
  );
}