'use client'

import {
  AddEditHabitModal,
  type HabitFormData,
} from '@/components/habits/AddEditHabitModal'
import { DeleteHabitModal } from '@/components/habits/DeleteHabitModal'
import { HabitSkeleton } from '@/components/habits/HabitSkeleton'
import { HabitTable, type Habit } from '@/components/habits/HabitTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModernPagination } from '@/components/users/Pagination'
import { cn } from '@/lib/utils'
import { Plus, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

// Demo data
const DEMO_HABITS: Habit[] = [
  {
    id: 1,
    name: 'Pray Fajr',
    category: 'Prayer',
    categoryLayer: 'Beginner',
    frequency: 'Daily',
    startDate: '2024-12-03',
    description: 'Perform the Fajr prayer on time',
    showOnTodayScreen: true,
    createdAt: '2024-12-03',
  },
  {
    id: 2,
    name: "Read Qur'an",
    category: "Qur'an",
    categoryLayer: 'Intermediate',
    frequency: 'Daily',
    startDate: '2024-12-01',
    description: "Read 20 pages of Qur'an",
    showOnTodayScreen: true,
    createdAt: '2024-12-01',
  },
  {
    id: 3,
    name: 'Dhikr after Prayer',
    category: 'Dhikr',
    categoryLayer: 'Beginner',
    frequency: 'Daily',
    frequencyDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    startDate: '2024-12-05',
    description: 'Recite Dhikr after the 5 daily prayers',
    showOnTodayScreen: false,
    createdAt: '2024-12-05',
  },
  {
    id: 4,
    name: 'Charity',
    category: 'Deeds',
    categoryLayer: 'Advanced',
    frequency: 'Weekly',
    frequencyDays: ['Friday'],
    startDate: '2024-12-06',
    description: 'Give charity on Friday',
    showOnTodayScreen: true,
    createdAt: '2024-12-06',
  },
  {
    id: 5,
    name: 'Pray Zuhr',
    category: 'Prayer',
    categoryLayer: 'Beginner',
    frequency: 'Daily',
    startDate: '2024-12-03',
    description: 'Perform the Zuhr prayer on time',
    showOnTodayScreen: true,
    createdAt: '2024-12-03',
  },
  {
    id: 6,
    name: 'Tafseer Reading',
    category: "Qur'an",
    categoryLayer: 'Advanced',
    frequency: 'Weekly',
    frequencyDays: ['Saturday', 'Sunday'],
    startDate: '2024-12-07',
    description: 'Read Tafseer for 30 minutes',
    showOnTodayScreen: false,
    createdAt: '2024-12-07',
  },
]

const ITEMS_PER_PAGE = 5

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<HabitFormData | null>(null)
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize habits on client-side to prevent hydration mismatch
  useEffect(() => {
    setHabits(DEMO_HABITS)
    setIsLoading(false)
  }, [])

  // Filter habits based on search query
  const filteredHabits = useMemo(() => {
    return habits.filter(
      (habit) =>
        habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        habit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        habit.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [habits, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredHabits.length / ITEMS_PER_PAGE)
  const validPage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedHabits = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE
    return filteredHabits.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredHabits, validPage])

  // Handle page reset when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value !== searchQuery) {
      setCurrentPage(1)
    }
  }

  const handleAddHabit = (data: HabitFormData) => {
    if (editingHabit && editingHabit.id) {
      // Update existing habit
      setHabits((prev) =>
        prev.map((h) =>
          h.id === editingHabit.id
            ? {
                ...h,
                name: data.name,
                category: data.category,
                categoryLayer: data.categoryLayer,
                frequency: data.frequency,
                frequencyDays: data.frequencyDays,
                startDate: data.startDate,
                description: data.description,
                showOnTodayScreen: data.showOnTodayScreen,
              }
            : h,
        ),
      )
      setEditingHabit(null)
    } else {
      // Add new habit
      const newHabit: Habit = {
        id: Math.max(0, ...habits.map((h) => h.id)) + 1,
        name: data.name,
        category: data.category,
        categoryLayer: data.categoryLayer,
        frequency: data.frequency,
        frequencyDays: data.frequencyDays,
        startDate: data.startDate,
        description: data.description,
        showOnTodayScreen: data.showOnTodayScreen,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setHabits((prev) => [newHabit, ...prev])
    }
    setIsAddModalOpen(false)
  }

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit({
      id: habit.id,
      name: habit.name,
      category: habit.category,
      categoryLayer: habit.categoryLayer,
      frequency: habit.frequency,
      frequencyDays: habit.frequencyDays,
      startDate: habit.startDate,
      description: habit.description,
      showOnTodayScreen: habit.showOnTodayScreen,
    })
    setIsAddModalOpen(true)
  }

  const handleDeleteHabit = (habit: Habit) => {
    setDeletingHabit(habit)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (deletingHabit) {
      setHabits((prev) => prev.filter((h) => h.id !== deletingHabit.id))
      setDeletingHabit(null)
    }
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setEditingHabit(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Habits</h1>
          <p className="text-muted-foreground mt-1">
            Manage your Islamic habits and track your progress
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingHabit(null)
            setIsAddModalOpen(true)
          }}
          className={cn(
            'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white',
          )}
        >
          <Plus className="size-4 mr-2" />
          Add New Habit
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search habits by name, category or description..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <HabitSkeleton />
      ) : (
        <>
          <HabitTable
            habits={paginatedHabits}
            onEdit={handleEditHabit}
            onDelete={handleDeleteHabit}
          />

          {/* Pagination */}
          {filteredHabits.length > 0 && (
            <ModernPagination
              currentPage={validPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredHabits.length}
              pageSize={ITEMS_PER_PAGE}
            />
          )}
        </>
      )}

      {/* Modals */}
      <AddEditHabitModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddHabit}
        habit={editingHabit}
        title="Add Habit"
      />

      <DeleteHabitModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeletingHabit(null)
        }}
        onConfirm={confirmDelete}
        habitName={deletingHabit?.name || ''}
      />
    </div>
  )
}
