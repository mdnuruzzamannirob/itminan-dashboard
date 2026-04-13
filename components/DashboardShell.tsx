'use client'

import { Logo } from '@/components/Logo'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  UsersRound,
  X,
  TrendingUp,
  CheckCircle2,
  Crown,
  Bug,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useMemo, useState } from 'react'

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/users', label: 'User Management', icon: UsersRound },
  { href: '/dashboard/habits', label: 'Add Habits', icon: CheckCircle2 },
  { href: '/dashboard/premium', label: 'Premium Users', icon: Crown },
  { href: '/dashboard/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/dashboard/bugs', label: 'Bugs', icon: Bug },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings2 },
]

function isActiveRoute(pathname: string, href: string) {
  if (href === '/dashboard') {
    return pathname === href
  }

  return pathname.startsWith(href)
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pageTitle = useMemo(() => {
    if (pathname === '/dashboard') {
      return 'Dashboard'
    }

    const activeItem = navItems.find((item) =>
      isActiveRoute(pathname, item.href),
    )

    return activeItem?.label ?? 'Dashboard'
  }, [pathname])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r  bg-white lg:flex flex-col">
        <div className="border-b  px-4 py-4">
          <Logo className="mb-0 justify-start" />
        </div>

        <nav className="flex-1 px-4 py-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const active = isActiveRoute(pathname, item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition',
                    active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="border-t  p-4">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="size-5" />
            Log out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 border-b  bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
            <p className="font-semibold  ">{pageTitle}</p>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="rounded-md p-2 hover:bg-gray-100"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </header>

        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          />
        )}

        {/* Mobile Drawer */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 border-r  bg-white transition-transform duration-300 lg:hidden',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="border-b  px-4 py-4">
            <Logo className="mb-0 justify-start" />
          </div>

          <nav className="px-4 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const active = isActiveRoute(pathname, item.href)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition',
                      active
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100',
                    )}
                  >
                    <Icon className="size-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  )
}
