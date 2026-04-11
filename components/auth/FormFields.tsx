'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

interface FormFieldProps {
  form: any
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function FormInputField({
  form,
  name,
  label,
  placeholder,
  disabled,
  className,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const {
    control,
    formState: { errors },
  } = form

  const error = errors[name]

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="space-y-1">
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              error={error ? 'error' : undefined}
              className={className}
              {...props}
            />
            {error && (
              <p className="text-xs text-red-500 dark:text-red-400">
                {String(error.message)}
              </p>
            )}
          </div>
        )}
      />
    </div>
  )
}

export function FormPasswordField({
  form,
  name,
  label = 'Password',
  placeholder = 'Enter your password',
  disabled,
  className,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const {
    control,
    formState: { errors },
  } = form

  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="space-y-1">
            <div className="relative">
              <Input
                {...field}
                id={name}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                disabled={disabled}
                error={error ? 'error' : undefined}
                className={cn('pr-10', className)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 disabled:opacity-50 dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500 dark:text-red-400">
                {String(error.message)}
              </p>
            )}
          </div>
        )}
      />
    </div>
  )
}

export function FormOTPField({
  form,
  name,
  label = 'OTP',
  placeholder = '000000',
  disabled,
  className,
}: FormFieldProps) {
  const {
    control,
    formState: { errors },
  } = form

  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
            field.onChange(value)
          }

          return (
            <div className="space-y-1">
              <Input
                {...field}
                onChange={handleChange}
                id={name}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                error={error ? 'error' : undefined}
                className={cn(
                  'text-center text-2xl tracking-widest font-mono',
                  className
                )}
                maxLength={6}
                inputMode="numeric"
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                Enter or paste your 6-digit code
              </p>
              {error && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {String(error.message)}
                </p>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}

export function FormCheckboxField({
  form,
  name,
  label,
  disabled,
}: FormFieldProps & { label: string }) {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <input
            {...field}
            type="checkbox"
            id={name}
            disabled={disabled}
            checked={Boolean(field.value)}
            onChange={(e) => field.onChange(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-blue-400 dark:focus:ring-blue-400"
          />
          <Label htmlFor={name} className="text-sm cursor-pointer">
            {label}
          </Label>
        </div>
      )}
    />
  )
}
