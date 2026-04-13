import { VerifyEmailForm } from '@/components/auth/VerifyEmailForm'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmailForm />
    </Suspense>
  )
}
