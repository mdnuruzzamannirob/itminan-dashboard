'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { KeyboardEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerifyOtpValues, verifyOtpSchema } from '@/lib/schemas/auth'

const OTP_LENGTH = 6

export function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => ''),
  )
  const refs = useRef<Array<HTMLInputElement | null>>([])

  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<VerifyOtpValues>({
    defaultValues: { otp: '' },
  })

  const syncOtpValue = (nextDigits: string[]) => {
    setDigits(nextDigits)
    const otp = nextDigits.join('')
    setValue('otp', otp, { shouldDirty: true })
    if (errors.otp && otp.length === OTP_LENGTH) {
      clearErrors('otp')
    }
  }

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    syncOtpValue(next)

    if (digit && index < OTP_LENGTH - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (value: string) => {
    const pasted = value.replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) {
      return
    }

    const next = Array.from(
      { length: OTP_LENGTH },
      (_, index) => pasted[index] ?? '',
    )
    syncOtpValue(next)

    const nextFocusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    refs.current[nextFocusIndex]?.focus()
  }

  const onSubmit = handleSubmit(async (values) => {
    const parsed = verifyOtpSchema.safeParse(values)

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Enter a valid OTP.'
      setError('otp', { message })
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const query = new URLSearchParams({ otp: values.otp })
    if (email) {
      query.set('email', email)
    }
    router.push(`/reset-password?${query.toString()}`)
  })

  return (
    <Card className="w-full border-white/50 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.24em] text-emerald-600">
          GOSNKR
        </p>
        <CardTitle className="text-3xl font-semibold text-slate-900">
          Verify OTP
        </CardTitle>
        <p className="text-sm text-slate-600">
          Enter the 6-digit code you received to continue password recovery.
        </p>
        {email ? (
          <p className="text-xs text-slate-500">Code sent to {email}</p>
        ) : null}
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-6 gap-2">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  refs.current[index] = node
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPaste={(event) => {
                  event.preventDefault()
                  handlePaste(event.clipboardData.getData('text'))
                }}
                className="h-12 rounded-md border border-input bg-background text-center text-lg font-semibold text-slate-900 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            ))}
          </div>

          {errors.otp ? (
            <p className="text-xs text-destructive">{errors.otp.message}</p>
          ) : null}

          <p className="text-xs text-slate-500">
            Use exactly 6 digits. You can paste the whole code at once.
          </p>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="px-0 text-emerald-600"
              onClick={() => refs.current[0]?.focus()}
            >
              Resend OTP
            </Button>
            <Button
              type="button"
              variant="link"
              className="px-0 text-slate-600"
              onClick={() => router.back()}
            >
              Go back
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
