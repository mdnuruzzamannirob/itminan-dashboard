'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerifyOtpValues, verifyOtpSchema } from '@/lib/schemas/auth'
import { ErrorInfoMessage } from './ErrorInfoMessage'

const OTP_LENGTH = 6
const RESEND_COOLDOWN = 30 // seconds

export function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resendCoolDown, setResendCooldown] = useState(0)
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

  // Auto-focus on first input when component mounts
  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  // Handle resend cooldown timer
  useEffect(() => {
    if (resendCoolDown <= 0) return

    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [resendCoolDown])

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

  const handleResendOtp = async () => {
    setResendCooldown(RESEND_COOLDOWN)
    clearErrors('otp')
    // Here you would make an API call to resend OTP
    // await resendOtpApi(email)
  }

  return (
    <Card className="w-full border">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-semibold ">Verify OTP</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code you received to continue password recovery.
        </p>
        {email ? (
          <p className="text-xs text-muted-foreground">Code sent to {email}</p>
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
                className="h-12 rounded-md border border-input bg-background text-center text-lg font-semibold  outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            ))}
          </div>

          {errors.otp ? (
            <ErrorInfoMessage error={errors.otp.message} />
          ) : (
            <p className="text-xs text-muted-foreground">
              Use exactly 6 digits. You can paste the whole code at once.
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="px-0 text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
              onClick={handleResendOtp}
              disabled={resendCoolDown > 0}
            >
              {resendCoolDown > 0
                ? `Resend in ${resendCoolDown}s`
                : 'Resend OTP'}
            </Button>
            <Button
              type="button"
              variant="link"
              className="px-0 text-muted-foreground"
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
