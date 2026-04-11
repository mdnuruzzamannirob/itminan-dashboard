'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginValues, loginSchema } from '@/lib/schemas/auth'

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
    <Card className="w-full border-white/50 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.24em] text-emerald-600">
          GOSNKR
        </p>
        <CardTitle className="text-3xl font-semibold text-slate-900">
          Sign in
        </CardTitle>
        <p className="text-sm text-slate-600">
          Use your admin credential to access reporting and management tools.
        </p>
      </CardHeader>
      <CardContent>
        {searchParams.get('reset') === '1' ? (
          <p className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Password reset successful. Sign in with your new password.
          </p>
        ) : null}

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@gosnkr.com"
              {...register('email')}
            />
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
            {errors.password ? (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label
              className="flex items-center gap-2 text-slate-600"
              htmlFor="remember"
            >
              <input
                id="remember"
                type="checkbox"
                className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                {...register('remember')}
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="font-medium text-emerald-600 hover:text-emerald-700"
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
