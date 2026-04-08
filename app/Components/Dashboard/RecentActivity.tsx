import { useGetAuditLogsQuery } from "../../../redux/features/audit/auditApi";
import AuditTable from "../AuditLog/AuditTable";
import TasksSkeleton from "../Tasks/TasksSkeleton";

export default function RecentActivity() {
  const { data, isLoading } = useGetAuditLogsQuery({
    page: 1,
    limit: 3,
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
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