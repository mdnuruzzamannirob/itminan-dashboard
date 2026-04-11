'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'
import { Controller, FieldPath, FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

interface FormFieldProps<TFieldValues extends FieldValues = any> {
  form: UseFormReturn<any>
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
          <Label htmlFor={String(name)} className="text-sm cursor-pointer">
            {label}
          </Label>
        </div>
      )}
    />
  )
}

export interface FormInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  form: UseFormReturn<any>
  name: TName
  label?: string
  placeholder?: string
  description?: string
  type?: string
  disabled?: boolean
  className?: string
}

export const FormInputField = React.forwardRef<
  HTMLInputElement,
  FormInputFieldProps
>(
  (
    {
      form,
      name,
      label,
      placeholder,
      description,
      type = 'text',
      disabled,
      className,
    },
    ref,
  ) => {
    const fieldError = form.formState.errors[name]

    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <Label htmlFor={String(name)} className="text-sm font-medium">
            {label}
          </Label>
        )}
        <Controller
          control={form.control}
          name={name}
          render={({ field }) => (
            <Input
              id={String(name)}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              className={cn(
                'h-10 w-full',
                fieldError &&
                  'border-destructive focus-visible:ring-destructive/50',
              )}
            />
          )}
        />
        {fieldError && (
          <p className="text-xs font-medium text-destructive">
            {String(fieldError.message)}
          </p>
        )}
        {description && !fieldError && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    )
  },
)

FormInputField.displayName = 'FormInputField'

export interface FormCheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  form: UseFormReturn<any>
  name: TName
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

export const FormCheckboxField = React.forwardRef<
  HTMLInputElement,
  FormCheckboxFieldProps
>(({ form, name, label, description, disabled, className }, ref) => {
  const fieldError = form.formState.errors[name]

  return (
    <div className={cn('flex items-start space-x-3', className)}>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Checkbox
            id={String(name)}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            disabled={disabled}
            className="mt-1"
          />
        )}
      />
      <div className="space-y-1">
        {label && (
          <Label
            htmlFor={String(name)}
            className="text-sm font-medium cursor-pointer"
          >
            {label}
          </Label>
        )}
        {fieldError && (
          <p className="text-xs font-medium text-destructive">
            {String(fieldError.message)}
          </p>
        )}
        {description && !fieldError && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
})

FormCheckboxField.displayName = 'FormCheckboxField'

export interface FormWrapperProps {
  children: React.ReactNode
  form: UseFormReturn<any>
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ children, form }) => {
  return (
    <FormProvider {...form}>
      <div className="space-y-4">{children}</div>
    </FormProvider>
  )
}

FormWrapper.displayName = 'FormWrapper'
