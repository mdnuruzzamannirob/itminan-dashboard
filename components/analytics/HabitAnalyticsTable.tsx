'use client'

import { cn } from '@/lib/utils'

export interface HabitAnalytic {
  id: number
  habitName: string
  category: 'Prayer' | "Qur'an" | 'Dhikr' | 'Deeds'
  totalUsers: number
  activeUsers: number
  completionRate: string
  avgStreakDays: number
  totalCompletions: number
}

interface HabitAnalyticsTableProps {
  habits: HabitAnalytic[]
}

export function HabitAnalyticsTable({ habits }: HabitAnalyticsTableProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Prayer: 'bg-blue-100 text-blue-800',
      "Qur'an": 'bg-purple-100 text-purple-800',
      Dhikr: 'bg-pink-100 text-pink-800',
      Deeds: 'bg-yellow-100 text-yellow-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const getCompletionRateColor = (rate: string) => {
    const numeric = parseFloat(rate)
    if (numeric >= 80) return 'text-green-600'
    if (numeric >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      {/* Desktop Table */}
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
                Total Users
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Active Users
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Completion Rate
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Avg Streak Days
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Total Completions
              </th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, index) => (
              <tr
                key={habit.id}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-4 text-muted-foreground font-medium">
                  {index + 1}
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-900">{habit.habitName}</p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      'inline-block px-3 py-1 rounded-full text-xs font-medium',
                      getCategoryColor(habit.category),
                    )}
                  >
                    {habit.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  {habit.totalUsers}
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  {habit.activeUsers}
                </td>
                <td
                  className={cn(
                    'px-4 py-4 font-semibold',
                    getCompletionRateColor(habit.completionRate),
                  )}
                >
                  {habit.completionRate}
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  {habit.avgStreakDays}
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  {habit.totalCompletions.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {habits.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No analytics data available.</p>
        </div>
      )}
    </div>
  )
}
