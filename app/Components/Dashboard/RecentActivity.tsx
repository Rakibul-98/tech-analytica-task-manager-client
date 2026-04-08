import { useGetAuditLogsQuery } from "../../../redux/features/audit/auditApi";
import { Loader2 } from "lucide-react";
import AuditTable from "../AuditLog/AuditTable";

export default function RecentActivity() {
  const { data, isLoading } = useGetAuditLogsQuery({
    page: 1,
    limit: 3,
  });

  if (isLoading) {
    return <Loader2 className="animate-spin mx-auto" />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <AuditTable activities={data?.data || []} />
    </div>
  );
}