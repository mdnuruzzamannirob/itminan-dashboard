'use client'

import { ReactNode } from 'react'
import { Logo } from './Logo'

interface AuthLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export function AuthLayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo className="w-12 h-12" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Itminan Dashboard
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Secure Admin Portal
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full">{children}</div>

        {/* Footer */}
        <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
          <p>© 2026 Itminan Dashboard. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
