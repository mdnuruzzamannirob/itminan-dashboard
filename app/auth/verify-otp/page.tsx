'use client'

import { AuthLayoutContent } from '@/components/auth/AuthLayout'
import { FormOTPField } from '@/components/auth/FormFields'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { verifyOtpSchema, type VerifyOtpFormData } from '@/lib/schemas/auth'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function VerifyOtpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const form = useForm<VerifyOtpFormData>({
    mode: 'onBlur',
    defaultValues: {
      otp: '123456',
    },
  })

  const onSubmit = async (data: VerifyOtpFormData) => {
    // Validate with Zod directly
    const result = verifyOtpSchema.safeParse(data)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      Object.entries(errors).forEach(([field, messages]) => {
        form.setError(field as keyof VerifyOtpFormData, {
          message: String(messages?.[0]),
        })
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('OTP verification:', data)
      setIsVerified(true)
    } catch (error) {
      console.error('OTP verification failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayoutContent>
      <Card className="border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <CardHeader className="space-y-2">
          <div className="flex items-center">
            <Link
              href="/auth/forgot-password"
              className="inline-flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
            Verify Your Code
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-neutral-400">
            {isVerified
              ? 'Code verified successfully'
              : 'Enter the 6-digit OTP sent to your email'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isVerified ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                <p className="text-sm text-green-900 dark:text-green-100">
                  ✓ Your email has been verified!
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Proceed to create your new password.
                </p>

                <Link
                  href="/auth/reset-password"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                  Set New Password
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormOTPField
                form={form as any}
                name="otp"
                label="Verification Code"
                placeholder="000000"
                disabled={isLoading}
              />

              <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                <p>Didn't receive the code?</p>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Resend OTP
                </button>
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </Button>

                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white text-center block"
                >
                  Back to forgot password
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthLayoutContent>
  )
}
