import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ForgotPasswordForm />
    </Suspense>
  )
}
