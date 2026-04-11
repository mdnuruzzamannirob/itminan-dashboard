import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(134,239,172,0.32),transparent_40%),linear-gradient(155deg,#eef2ff_0%,#eff6ff_40%,#ecfeff_100%)] px-4 py-12">
      <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  )
}
