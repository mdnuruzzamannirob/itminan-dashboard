'use client'

import { AuthLayoutContent } from '@/components/auth/AuthLayout'
import { FormPasswordField } from '@/components/auth/FormFields'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/schemas/auth'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const form = useForm<ResetPasswordFormData>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    // Validate with Zod directly
    const result = resetPasswordSchema.safeParse(data)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      Object.entries(errors).forEach(([field, messages]) => {
        form.setError(field as keyof ResetPasswordFormData, {
          message: String(messages?.[0]),
        })
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Password reset:', data)
      setIsReset(true)
    } catch (error) {
      console.error('Password reset failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayoutContent>
      <Card className="border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <CardHeader className="space-y-2">
          {!isReset && (
            <div className="flex items-center">
              <Link
                href="/auth/verify-otp"
                className="inline-flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </Link>
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
            {isReset ? 'Password Reset Successful' : 'Create New Password'}
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-neutral-400">
            {isReset
              ? 'Your password has been successfully reset'
              : 'Enter a strong password for your account'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isReset ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your password has been successfully updated. You can now sign in with your new password.
                </p>

                <Link
                  href="/auth/login"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormPasswordField
                form={form as any}
                name="password"
                label="New Password"
                placeholder="Enter your new password"
                disabled={isLoading}
              />

              <FormPasswordField
                form={form as any}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your new password"
                disabled={isLoading}
              />

              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  <strong>Password requirements:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter (A-Z)</li>
                    <li>One lowercase letter (a-z)</li>
                    <li>One number (0-9)</li>
                  </ul>
                </p>
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>

                <Link
                  href="/auth/login"
                  className="text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white text-center block"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthLayoutContent>
  )
}
