import { Suspense } from 'react'

import { VerifyEmailForm } from '@/components/auth/VerifyEmailForm'

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <p className="text-center text-sm text-slate-600">Loading...</p>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  )
}
