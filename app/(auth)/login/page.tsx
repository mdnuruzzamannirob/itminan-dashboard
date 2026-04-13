import { LoginForm } from '@/components/auth/LoginForm'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  )
}
