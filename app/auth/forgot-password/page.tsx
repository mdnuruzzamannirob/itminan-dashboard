'use client'

import { AuthLayoutContent } from '@/components/auth/AuthLayout'
import { FormInputField } from '@/components/auth/FormFields'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/schemas/auth'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm<ForgotPasswordFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: 'admin@example.com',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Validate with Zod directly
    const result = forgotPasswordSchema.safeParse(data)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      Object.entries(errors).forEach(([field, messages]) => {
        form.setError(field as keyof ForgotPasswordFormData, {
          message: String(messages?.[0]),
        })
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Forgot password request:', data)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Forgot password request failed:', error)
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
              href="/auth/login"
              className="inline-flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to login
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-neutral-400">
            {isSubmitted
              ? 'Check your email for verification code'
              : 'Enter your email to receive a password reset code'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  ✓ Reset code has been sent to <strong>{form.getValues().email}</strong>
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  You'll receive an email with a 6-digit OTP code. Enter it on the next page to verify your identity.
                </p>

                <Link
                  href="/auth/verify-otp"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                  Continue to Verification
                </Link>

                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    form.reset()
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Try another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInputField
                form={form as any}
                name="email"
                label="Email Address"
                type="email"
                placeholder="admin@example.com"
                disabled={isLoading}
              />

              <div className="space-y-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Sending...' : 'Send Reset Code'}
                </Button>

                <Link
                  href="/auth/login"
                  className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white text-center block"
                >
                  Remember your password? Sign in
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthLayoutContent>
  )
}
