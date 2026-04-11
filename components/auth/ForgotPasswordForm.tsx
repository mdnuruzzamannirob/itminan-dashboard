'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ForgotPasswordValues, forgotPasswordSchema } from '@/lib/schemas/auth'

export function ForgotPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = useMemo(
    () => ({
      email: searchParams.get('email') ?? '',
    }),
    [searchParams],
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({ defaultValues })

  const onSubmit = handleSubmit(async (values) => {
    const parsed = forgotPasswordSchema.safeParse(values)

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ForgotPasswordValues
        setError(field, { message: issue.message })
      })
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push(`/verify-email?email=${encodeURIComponent(values.email)}`)
  })

  return (
    <Card className="w-full border-white/50 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.24em] text-emerald-600">
          GOSNKR
        </p>
        <CardTitle className="text-3xl font-semibold text-slate-900">
          Forgot password
        </CardTitle>
        <p className="text-sm text-slate-600">
          Enter your account email and we will send a one-time OTP for password
          reset.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@gosnkr.com"
              {...register('email')}
            />
            <p className="text-xs text-slate-500">
              Use the same email used in your admin login.
            </p>
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send OTP'}
          </Button>

          <p className="text-center text-sm text-slate-600">
            Remembered your password?{' '}
            <Link
              href="/login"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Back to login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
