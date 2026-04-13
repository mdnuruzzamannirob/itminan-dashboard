'use client'

import {
  HabitAnalytic,
  HabitAnalyticsTable,
} from '@/components/analytics/HabitAnalyticsTable'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

// Mock data
const mockHabitAnalytics: HabitAnalytic[] = [
  {
    id: 1,
    habitName: 'Pray Fajr',
    category: 'Prayer',
    totalUsers: 150,
    activeUsers: 128,
    completionRate: '85.3%',
    avgStreakDays: 42,
    totalCompletions: 5420,
  },
  {
    id: 2,
    habitName: 'Pray Dhuhr',
    category: 'Prayer',
    totalUsers: 145,
    activeUsers: 122,
    completionRate: '84.1%',
    avgStreakDays: 38,
    totalCompletions: 5180,
  },
  {
    id: 3,
    habitName: 'Pray Asr',
    category: 'Prayer',
    totalUsers: 140,
    activeUsers: 118,
    completionRate: '84.3%',
    avgStreakDays: 40,
    totalCompletions: 5020,
  },
  {
    id: 4,
    habitName: 'Pray Maghrib',
    category: 'Prayer',
    totalUsers: 148,
    activeUsers: 125,
    completionRate: '84.5%',
    avgStreakDays: 41,
    totalCompletions: 5290,
  },
  {
    id: 5,
    habitName: 'Pray Isha',
    category: 'Prayer',
    totalUsers: 142,
    activeUsers: 120,
    completionRate: '84.5%',
    avgStreakDays: 39,
    totalCompletions: 5100,
  },
  {
    id: 6,
    habitName: 'Read Quran',
    category: "Qur'an",
    totalUsers: 120,
    activeUsers: 95,
    completionRate: '79.2%',
    avgStreakDays: 28,
    totalCompletions: 3420,
  },
  {
    id: 7,
    habitName: 'Morning Dhikr',
    category: 'Dhikr',
    totalUsers: 98,
    activeUsers: 82,
    completionRate: '83.7%',
    avgStreakDays: 35,
    totalCompletions: 2890,
  },
  {
    id: 8,
    habitName: 'Evening Dhikr',
    category: 'Dhikr',
    totalUsers: 95,
    activeUsers: 79,
    completionRate: '83.2%',
    avgStreakDays: 33,
    totalCompletions: 2760,
  },
  {
    id: 9,
    habitName: 'Charity',
    category: 'Deeds',
    totalUsers: 75,
    activeUsers: 58,
    completionRate: '77.3%',
    avgStreakDays: 22,
    totalCompletions: 1840,
  },
  {
    id: 10,
    habitName: 'Visit Sick',
    category: 'Deeds',
    totalUsers: 52,
    activeUsers: 40,
    completionRate: '76.9%',
    avgStreakDays: 18,
    totalCompletions: 980,
  },
]

const ITEMS_PER_PAGE = 10

const AnalyticsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search
  const filteredHabits = useMemo(() => {
    return mockHabitAnalytics.filter((habit) => {
      const matchesSearch =
        habit.habitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || habit.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredHabits.length / ITEMS_PER_PAGE)
  const paginatedHabits = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredHabits.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredHabits, currentPage])

  const categories = ['all', 'Prayer', "Qur'an", 'Dhikr', 'Deeds'] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Islamic Habits Tracker</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by habit name or category..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {paginatedHabits.length} of {filteredHabits.length} habits
        </div>
      </div>

      {/* Table */}
      <HabitAnalyticsTable habits={paginatedHabits} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredHabits.length}
        />
      )}
    </div>
  )
}

export default AnalyticsPage
