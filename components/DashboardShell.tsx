'use client'

import { Logo } from '@/components/Logo'
import { cn } from '@/lib/utils'
import {
  Bug,
  CheckCircle2,
  ChevronDown,
  Crown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  TrendingUp,
  UsersRound,
  X,
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
  { href: '/users', label: 'User Management', icon: UsersRound },
  { href: '/habits', label: 'Add Habits', icon: CheckCircle2 },
  { href: '/premium', label: 'Premium Users', icon: Crown },
  { href: '/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/bugs', label: 'Bugs', icon: Bug },
  { href: '/settings', label: 'Settings', icon: Settings2 },
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
  const [settingsOpen, setSettingsOpen] = useState(
    pathname.startsWith('/settings'),
  )

  const settingsSubItems = [
    { href: '/settings', label: 'Edit Profile' },
    {
      href: '/settings/change-password',
      label: 'Change Password',
    },
    { href: '/settings/about-us', label: 'About Us' },
    {
      href: '/settings/privacy-policy',
      label: 'Privacy Policy',
    },
    {
      href: '/settings/terms-condition',
      label: 'Terms & Condition',
    },
  ]

  const pageTitle = useMemo(() => {
    if (pathname === '/dashboard') {
      return 'Dashboard'
    }

    // Check settings sub-items
    const settingsSubItems = [
      { href: '/settings', label: 'Edit Profile' },
      { href: '/settings/change-password', label: 'Change Password' },
      { href: '/settings/about-us', label: 'About Us' },
      { href: '/settings/privacy-policy', label: 'Privacy Policy' },
      { href: '/settings/terms-condition', label: 'Terms & Condition' },
    ]

    const activeSettings = settingsSubItems.find((item) =>
      pathname.startsWith(item.href),
    )
    if (activeSettings) {
      return activeSettings.label
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

              if (item.href === '/settings') {
                return (
                  <div key={item.href}>
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 px-3 py-2 rounded-md font-medium text-sm transition',
                        active || settingsOpen
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'size-4 transition-transform duration-200',
                          settingsOpen ? 'rotate-180' : '',
                        )}
                      />
                    </button>

                    {settingsOpen && (
                      <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-3">
                        {settingsSubItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              'block px-3 py-2 rounded-md text-sm font-medium transition',
                              pathname === subItem.href
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700',
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

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

                if (item.href === '/settings') {
                  return (
                    <div key={item.href}>
                      <button
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 px-3 py-2 rounded-md font-medium text-sm transition',
                          active || settingsOpen
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100',
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="size-5" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            'size-4 transition-transform duration-200',
                            settingsOpen ? 'rotate-180' : '',
                          )}
                        />
                      </button>

                      {settingsOpen && (
                        <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-3">
                          {settingsSubItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                'block px-3 py-2 rounded-md text-sm font-medium transition',
                                pathname === subItem.href
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700',
                              )}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

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
