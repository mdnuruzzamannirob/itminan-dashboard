import { Suspense } from 'react'

import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <p className="text-center text-sm text-slate-600">Loading...</p>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  )
}
