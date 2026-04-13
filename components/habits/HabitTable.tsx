'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Delete, Edit } from 'lucide-react'

export interface Habit {
  id: number
  name: string
  category: 'Prayer' | "Qur'an" | 'Dhikr' | 'Deeds'
  categoryLayer: 'Beginner' | 'Intermediate' | 'Advanced'
  frequency: 'Daily' | 'Weekly' | 'Custom'
  frequencyDays?: string[]
  startDate: string
  description: string
  showOnTodayScreen: boolean
  createdAt: string
}

interface HabitTableProps {
  habits: Habit[]
  onEdit?: (habit: Habit) => void
  onDelete?: (habit: Habit) => void
}

export function HabitTable({ habits, onEdit, onDelete }: HabitTableProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Prayer: 'bg-blue-100 text-blue-800',
      "Qur'an": 'bg-purple-100 text-purple-800',
      Dhikr: 'bg-pink-100 text-pink-800',
      Deeds: 'bg-yellow-100 text-yellow-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
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
                Details
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Actions
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
                  <div>
                    <p className="font-medium text-gray-900">{habit.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(habit.startDate).toLocaleDateString()}
                    </p>
                  </div>
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
                <td className="px-4 py-4 text-muted-foreground">
                  <p>{habit.description}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit?.(habit)}
                      className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                      title="Edit habit"
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete?.(habit)}
                      className="h-8 w-8 text-red-600 hover:bg-red-50"
                      title="Delete habit"
                    >
                      <Delete className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {habits.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">
            No habits found. Create one to get started!
          </p>
        </div>
      )}
    </div>
  )
}
