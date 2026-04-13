'use client'

import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginValues, loginSchema } from '@/lib/schemas/auth'
import { ErrorInfoMessage } from './ErrorInfoMessage'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = useMemo(
    () => ({
      email: searchParams.get('email') ?? '',
      password: '',
      remember: false,
    }),
    [searchParams],
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({ defaultValues })

  const onSubmit = handleSubmit(async (values) => {
    const parsed = loginSchema.safeParse(values)

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginValues
        setError(field, { message: issue.message })
      })
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard')
  })

  return (
    <Card className="w-full border">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-semibold">Sign in</CardTitle>
        <p className="text-sm text-muted-foreground">
          Use your admin credential to access reporting and management tools.
        </p>
      </CardHeader>
      <CardContent>
        {searchParams.get('reset') === '1' ? (
          <p className="mb-4 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">
            Password reset successful. Sign in with your new password.
          </p>
        ) : null}

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@gosnkr.com"
                className="pl-9"
                {...register('email')}
              />
            </div>
            <ErrorInfoMessage error={errors.email?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-9"
                {...register('password')}
              />
            </div>
            <ErrorInfoMessage error={errors.password?.message} />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label
              className="flex items-center cursor-pointer select-none gap-2 text-muted-foreground"
              htmlFor="remember"
            >
              <div className="relative flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="size-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                  {...register('remember')}
                />
              </div>
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:text-primary/90"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
