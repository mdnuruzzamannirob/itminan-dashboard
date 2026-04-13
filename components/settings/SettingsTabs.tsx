'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SettingsTabs() {
  const pathname = usePathname()

  const isEditProfile = pathname === '/settings' || pathname === '/settings/'
  const isChangePassword = pathname === '/settings/change-password'

  return (
    <div className="flex gap-8 border-b mb-8">
      <Link
        href="/settings"
        className={cn(
          'pb-3 font-medium text-sm transition-colors',
          isEditProfile
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900',
        )}
      >
        Edit Profile
      </Link>
      <Link
        href="/settings/change-password"
        className={cn(
          'pb-3 font-medium text-sm transition-colors',
          isChangePassword
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900',
        )}
      >
        Change Password
      </Link>
    </div>
  )
}
