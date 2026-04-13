'use client'

import { cn } from '@/lib/utils'
import { Ban, CircleCheckBig, Eye } from 'lucide-react'
import { useState } from 'react'
import { UserDetailsModal } from './UserDetailsModal'

export interface User {
  id: number
  name: string
  email: string
  phone: string
  joined: string
  status: 'Active' | 'Suspended'
  streak: number
  habits: number
  isPremium: boolean
  accountStatus: 'active' | 'suspended'
  subscriptionStatus: 'active' | 'inactive'
  subscriptionEnd: string
  paymentStatus: 'paid' | 'pending'
  completionRate: number
  totalCompletions: number
  bestStreak: number
  daysActive: number
}

interface UserTableProps {
  users: User[]
  onStatusChange?: (userId: number, newStatus: 'Active' | 'Suspended') => void
}

export function UserTable({ users, onStatusChange }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleStatusChange = (
    userId: number,
    newStatus: 'active' | 'suspended',
  ) => {
    const newDisplayStatus = newStatus === 'active' ? 'Active' : 'Suspended'
    onStatusChange?.(userId, newDisplayStatus)
  }

  return (
    <>
      <div className="rounded-lg border bg-white overflow-hidden ">
        {/* Desktop Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-4 text-left font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-700">
                  User
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-700">
                  Phone Number
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-700">
                  Joined
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-4 text-muted-foreground font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {user.phone}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {user.joined}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold',
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      )}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 hover:bg-blue-100 rounded-md transition text-blue-600 hover:text-blue-700"
                        title="View details"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.accountStatus === 'active'
                              ? 'suspended'
                              : 'active',
                          )
                        }
                        className={cn(
                          'p-2 rounded-md transition',
                          user.accountStatus === 'active'
                            ? 'hover:bg-red-100 text-red-600 hover:text-red-700'
                            : 'hover:bg-green-100 text-green-600 hover:text-green-700',
                        )}
                        title={
                          user.accountStatus === 'active'
                            ? 'Suspend account'
                            : 'Activate account'
                        }
                      >
                        {user.accountStatus === 'active' ? (
                          <Ban className="size-4" />
                        ) : (
                          <CircleCheckBig className="size-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedUser(null)
          }}
          user={selectedUser}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  )
}
