'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Crown } from 'lucide-react'

export interface UserDetails {
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

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserDetails | null
  onStatusChange?: (userId: number, status: 'active' | 'suspended') => void
}

export function UserDetailsModal({
  isOpen,
  onClose,
  user,
  onStatusChange,
}: UserDetailsModalProps) {
  if (!user) return null

  const toggleStatus = () => {
    const next = user.accountStatus === 'active' ? 'suspended' : 'active'
    onStatusChange?.(user.id, next)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl sm:max-w-3xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 border-b flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            User Details
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* User Header */}
          <div className="bg-linear-to-r from-primary/90 to-primary rounded-lg p-6 text-white">
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
              <StatusRow
                label="Account Status"
                value={user.accountStatus}
                activeClass="bg-green-100 text-green-600"
                inactiveClass="bg-red-100 text-red-600"
              />

              <StatusRow
                label="Subscription Status"
                value={user.subscriptionStatus}
                activeClass="bg-green-100 text-green-600"
                inactiveClass="bg-gray-200 text-gray-600"
              />

              <StatusRow
                label="Payment Status"
                value={user.paymentStatus}
                activeClass="bg-green-100 text-green-600"
                inactiveClass="bg-yellow-100 text-yellow-600"
              />

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subscription End</span>
                <span className="font-medium">{user.subscriptionEnd}</span>
              </div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-lg">Activity Overview</h4>

            <div className="grid grid-cols-2 gap-6">
              <Metric
                label="Completion Rate"
                value={`${user.completionRate}%`}
              />
              <Metric label="Total Completions" value={user.totalCompletions} />
              <Metric label="Best Streak" value={`${user.bestStreak} days`} />
              <Metric label="Days Active" value={user.daysActive} />
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
                  console.log('Remove pro:', user.id)
                }}
              >
                Remove Pro
              </Button>
            </div>
          )}

          {/* Actions */}
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
      </DialogContent>
    </Dialog>
  )
}

/* ------------------ Helpers ------------------ */

function StatusRow({
  label,
  value,
  activeClass,
  inactiveClass,
}: {
  label: string
  value: string
  activeClass: string
  inactiveClass: string
}) {
  const isActive = value === 'active' || value === 'paid'

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span
        className={cn(
          'px-3 py-1 rounded-md text-sm font-medium',
          isActive ? activeClass : inactiveClass,
        )}
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
  )
}
