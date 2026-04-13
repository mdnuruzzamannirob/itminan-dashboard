import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
