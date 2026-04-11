'use client'

import { AuthLink } from '@/components/auth/AuthHelpers'
import { AuthLayoutContent } from '@/components/auth/AuthLayout'
import { FormCheckboxField, FormInputField, FormPasswordField } from '@/components/auth/FormFields'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    // Validate with Zod directly
    const result = loginSchema.safeParse(data)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      Object.entries(errors).forEach(([field, messages]) => {
        form.setError(field as keyof LoginFormData, {
          message: String(messages?.[0]),
        })
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Login data:', data)
      alert('✓ Login successful! (Demo mode)')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayoutContent>
      <Card className="border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-neutral-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              form={form as any}
              name="email"
              label="Email"
              type="email"
              placeholder="admin@example.com"
              disabled={isLoading}
            />

            <FormPasswordField
              form={form as any}
              name="password"
              label="Password"
              placeholder="Enter your password"
              disabled={isLoading}
            />

            <div className="flex items-center justify-between">
              <FormCheckboxField
                form={form as any}
                name="rememberMe"
                label="Remember me"
                disabled={isLoading}
              />
              <Link
                href="/auth/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <AuthLink
            href="/auth/forgot-password"
            label="Don't have an account?"
            text="Sign up"
            className="mt-4"
          />
        </CardContent>
      </Card>
    </AuthLayoutContent>
  )
}
