import { Skeleton } from "../../../components/ui/skeleton";
import TasksSkeleton from "../Tasks/TasksSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 rounded-xl border bg-white"
          >
            <Skeleton className="h-12 w-12 rounded-lg bg-gray-300" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-6 w-10 bg-gray-300" />
              <Skeleton className="h-4 w-24 bg-gray-300" />
            </div>
          </div>
        ))}
      </div>

      {[...Array(2)].map((_, i) => (
        <>
          <TasksSkeleton key={i} />
        </>
      ))}

    </div>
  );
}