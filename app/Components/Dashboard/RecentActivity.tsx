import { ArrowRight } from "lucide-react";
import { useGetAuditLogsQuery } from "../../../redux/features/audit/auditApi";
import AuditTable from "../AuditLog/AuditTable";
import TasksSkeleton from "../Tasks/TasksSkeleton";
import { useRouter } from "next/navigation";

export default function RecentActivity() {
  const router = useRouter();
  const { data, isLoading } = useGetAuditLogsQuery({
    page: 1,
    limit: 3,
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
          <p className="text-xs text-slate-500 mt-0.5">Latest audit log entries</p>
        </div>
        <button
          onClick={() => router.push('/audit-log')}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View all <ArrowRight size={13} />
        </button>
      </div>
      {
        isLoading ? (
          <TasksSkeleton />
        ) : (
          <AuditTable activities={data?.data || []} />
        )
      }
    </div>
  );
}