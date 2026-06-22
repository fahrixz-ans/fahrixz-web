export function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
          <div className="p-2.5 space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
