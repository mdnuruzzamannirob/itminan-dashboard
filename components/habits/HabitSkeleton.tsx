export function HabitSkeleton() {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                #
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Habit Name
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Details
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="px-4 py-4">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
