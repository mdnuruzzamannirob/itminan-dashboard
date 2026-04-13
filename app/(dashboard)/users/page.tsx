'use client'

import { ModernPagination } from '@/components/users/Pagination'
import { UserSkeleton } from '@/components/users/UserSkeleton'
import { Input } from '@/components/ui/input'
import { User, UserTable } from '@/components/users/UserTable'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

// Demo data
const DEMO_USERS: User[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+880 1640560614',
    joined: 'Jan 15, 2024',
    status: 'Active',
    streak: 45,
    habits: 12,
    isPremium: true,
    accountStatus: 'active',
    subscriptionStatus: 'active',
    subscriptionEnd: '12/15/2024',
    paymentStatus: 'paid',
    completionRate: 76,
    totalCompletions: 342,
    bestStreak: 55,
    daysActive: 806,
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1640560614',
    joined: 'Jan 15, 2024',
    status: 'Suspended',
    streak: 0,
    habits: 5,
    isPremium: false,
    accountStatus: 'suspended',
    subscriptionStatus: 'inactive',
    subscriptionEnd: '01/15/2024',
    paymentStatus: 'pending',
    completionRate: 45,
    totalCompletions: 123,
    bestStreak: 20,
    daysActive: 450,
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+880 1640560614',
    joined: 'Feb 10, 2024',
    status: 'Active',
    streak: 30,
    habits: 8,
    isPremium: true,
    accountStatus: 'active',
    subscriptionStatus: 'active',
    subscriptionEnd: '06/10/2024',
    paymentStatus: 'paid',
    completionRate: 82,
    totalCompletions: 256,
    bestStreak: 40,
    daysActive: 650,
  },
  {
    id: 4,
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+880 1640560614',
    joined: 'Mar 20, 2024',
    status: 'Active',
    streak: 15,
    habits: 3,
    isPremium: false,
    accountStatus: 'active',
    subscriptionStatus: 'inactive',
    subscriptionEnd: '03/20/2024',
    paymentStatus: 'paid',
    completionRate: 60,
    totalCompletions: 89,
    bestStreak: 25,
    daysActive: 300,
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+880 1640560614',
    joined: 'Apr 05, 2024',
    status: 'Active',
    streak: 60,
    habits: 15,
    isPremium: true,
    accountStatus: 'active',
    subscriptionStatus: 'active',
    subscriptionEnd: '12/05/2024',
    paymentStatus: 'paid',
    completionRate: 92,
    totalCompletions: 512,
    bestStreak: 90,
    daysActive: 1200,
  },
  {
    id: 6,
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '+880 1640560614',
    joined: 'Apr 12, 2024',
    status: 'Suspended',
    streak: 0,
    habits: 2,
    isPremium: false,
    accountStatus: 'suspended',
    subscriptionStatus: 'inactive',
    subscriptionEnd: '04/12/2024',
    paymentStatus: 'pending',
    completionRate: 30,
    totalCompletions: 45,
    bestStreak: 10,
    daysActive: 200,
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    phone: '+880 1640560614',
    joined: 'May 01, 2024',
    status: 'Active',
    streak: 35,
    habits: 7,
    isPremium: true,
    accountStatus: 'active',
    subscriptionStatus: 'active',
    subscriptionEnd: '11/01/2024',
    paymentStatus: 'paid',
    completionRate: 75,
    totalCompletions: 298,
    bestStreak: 50,
    daysActive: 700,
  },
  {
    id: 8,
    name: 'Robert Martinez',
    email: 'robert@example.com',
    phone: '+880 1640560614',
    joined: 'May 15, 2024',
    status: 'Active',
    streak: 20,
    habits: 4,
    isPremium: false,
    accountStatus: 'active',
    subscriptionStatus: 'inactive',
    subscriptionEnd: '05/15/2024',
    paymentStatus: 'paid',
    completionRate: 55,
    totalCompletions: 156,
    bestStreak: 30,
    daysActive: 400,
  },
  {
    id: 9,
    name: 'Jennifer Lee',
    email: 'jennifer@example.com',
    phone: '+880 1640560614',
    joined: 'Jun 01, 2024',
    status: 'Active',
    streak: 25,
    habits: 6,
    isPremium: true,
    accountStatus: 'active',
    subscriptionStatus: 'active',
    subscriptionEnd: '12/01/2024',
    paymentStatus: 'paid',
    completionRate: 70,
    totalCompletions: 210,
    bestStreak: 45,
    daysActive: 550,
  },
  {
    id: 10,
    name: 'James Taylor',
    email: 'james@example.com',
    phone: '+880 1640560614',
    joined: 'Jun 10, 2024',
    status: 'Active',
    streak: 10,
    habits: 2,
    isPremium: false,
    accountStatus: 'active',
    subscriptionStatus: 'inactive',
    subscriptionEnd: '06/10/2024',
    paymentStatus: 'pending',
    completionRate: 40,
    totalCompletions: 78,
    bestStreak: 15,
    daysActive: 250,
  },
  {
    id: 11,
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '+880 1640560614',
    joined: 'Jun 20, 2024',
    status: 'Active',
    streak: 50,
    habits: 10,
    isPremium: true,
    accountStatus: 'active',
    subscriptionStatus: 'active',
    subscriptionEnd: '12/20/2024',
    paymentStatus: 'paid',
    completionRate: 85,
    totalCompletions: 420,
    bestStreak: 70,
    daysActive: 900,
  },
  {
    id: 12,
    name: 'Christopher White',
    email: 'christopher@example.com',
    phone: '+880 1640560614',
    joined: 'Jul 01, 2024',
    status: 'Suspended',
    streak: 0,
    habits: 1,
    isPremium: false,
    accountStatus: 'suspended',
    subscriptionStatus: 'inactive',
    subscriptionEnd: '07/01/2024',
    paymentStatus: 'pending',
    completionRate: 20,
    totalCompletions: 30,
    bestStreak: 5,
    daysActive: 100,
  },
]

type FilterType = 'all' | 'active' | 'suspended'

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and search
  const filteredUsers = useMemo(() => {
    let filtered = [...DEMO_USERS]

    // Filter by status
    if (filterType === 'active') {
      filtered = filtered.filter((user) => user.status === 'Active')
    } else if (filterType === 'suspended') {
      filtered = filtered.filter((user) => user.status === 'Suspended')
    }

    // Search by name, email, or phone
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.includes(query),
      )
    }

    return filtered
  }, [filterType, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  // Reset to first page when filter changes
  const handleFilterChange = (newFilter: FilterType) => {
    setFilterType(newFilter)
    setCurrentPage(1)
  }

  const handleStatusChange = (
    userId: number,
    newStatus: 'Active' | 'Suspended',
  ) => {
    console.log(`User ${userId} status changed to ${newStatus}`)
    // In real app, this would update the backend
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-gray-600">View, search, and manage all users</p>
        </div>
        <UserSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-gray-600">View, search, and manage all users</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Search Input */}
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by user, email, or phone..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleFilterChange('all')}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
              filterType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            All Users
          </button>
          <button
            onClick={() => handleFilterChange('active')}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
              filterType === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterChange('suspended')}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
              filterType === 'suspended'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            Suspended
          </button>
        </div>
      </div>

      {/* User Table */}
      <UserTable users={paginatedUsers} onStatusChange={handleStatusChange} />

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <ModernPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No users found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
