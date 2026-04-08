import { Skeleton } from '../../../components/ui/skeleton'

export default function TasksSkeleton() {
  return (
    <div className="rounded-xl border bg-white">
      {/* Header */}
      <div className="p-5 border-b">
        <Skeleton className="h-6 w-40 bg-gray-300" />
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b text-sm">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full bg-gray-300" />
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 px-5 py-4 items-center"
          >
            <Skeleton className="h-4 w-40 bg-gray-300" />
            <Skeleton className="h-4 w-48 bg-gray-300" />
            <Skeleton className="h-8 w-24 rounded-full bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-300" />
              <Skeleton className="h-3 w-40 bg-gray-300" />
            </div>
            <Skeleton className="h-4 w-32 bg-gray-300" />
            <div className="flex gap-3">
              <Skeleton className="h-5 w-5 rounded bg-gray-300" />
              <Skeleton className="h-5 w-5 rounded bg-gray-300" />
              <Skeleton className="h-5 w-5 rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
