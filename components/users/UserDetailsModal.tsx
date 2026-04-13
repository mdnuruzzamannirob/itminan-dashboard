'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Crown, X } from 'lucide-react'

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: number
    name: string
    email: string
    phone: string
    joined: string
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
  onStatusChange?: (userId: number, newStatus: 'active' | 'suspended') => void
}

export function UserDetailsModal({
  isOpen,
  onClose,
  user,
  onStatusChange,
}: UserDetailsModalProps) {
  if (!isOpen) return null

  const toggleStatus = () => {
    const newStatus = user.accountStatus === 'active' ? 'suspended' : 'active'
    onStatusChange?.(user.id, newStatus)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Header Card */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-blue-100">{user.email}</p>
              </div>
              {user.isPremium && (
                <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                  <Crown className="size-4" />
                  <span className="text-sm font-medium">Premium</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Joined</p>
                <p className="font-semibold">{user.joined}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Streak</p>
                <p className="font-semibold">{user.streak} days</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Habits</p>
                <p className="font-semibold">{user.habits}</p>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-lg">Account Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Account Status</span>
                <span
                  className={cn(
                    'px-3 py-1 rounded-md text-sm font-medium',
                    user.accountStatus === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  )}
                >
                  {user.accountStatus.charAt(0).toUpperCase() +
                    user.accountStatus.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subscription Status</span>
                <span
                  className={cn(
                    'px-3 py-1 rounded-md text-sm font-medium',
                    user.subscriptionStatus === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-200 text-gray-800',
                  )}
                >
                  {user.subscriptionStatus.charAt(0).toUpperCase() +
                    user.subscriptionStatus.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subscription End</span>
                <span className="font-medium">{user.subscriptionEnd}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span
                  className={cn(
                    'px-3 py-1 rounded-md text-sm font-medium',
                    user.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800',
                  )}
                >
                  {user.paymentStatus.charAt(0).toUpperCase() +
                    user.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-lg">Activity Overview</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completion Rate</p>
                <p className="text-3xl font-bold text-blue-600">
                  {user.completionRate}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Completions</p>
                <p className="text-3xl font-bold text-blue-600">
                  {user.totalCompletions}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Best Streak</p>
                <p className="text-3xl font-bold text-blue-600">
                  {user.bestStreak} days
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Days Active</p>
                <p className="text-3xl font-bold text-blue-600">
                  {user.daysActive}
                </p>
              </div>
            </div>
          </div>

          {/* Pro Access */}
          {user.isPremium && (
            <div className="border rounded-lg p-6 space-y-4">
              <h4 className="font-semibold text-lg">Pro Access</h4>
              <p className="text-gray-600 text-sm">
                Remove premium access from this user
              </p>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  // Handle remove pro
                  console.log('Remove pro for user:', user.id)
                }}
              >
                Remove Pro
              </Button>
            </div>
          )}

          {/* Status Change */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={toggleStatus}
              variant={
                user.accountStatus === 'active' ? 'destructive' : 'default'
              }
              className="flex-1"
            >
              {user.accountStatus === 'active'
                ? 'Suspend Account'
                : 'Activate Account'}
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
