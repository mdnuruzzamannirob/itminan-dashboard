import { Logo } from '@/components/Logo'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-12">
      <Logo className=" mb-8" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  )
}
