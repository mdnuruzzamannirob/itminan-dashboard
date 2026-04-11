import Link from 'next/link'
import { cn } from '@/lib/utils'

interface AuthLinkProps {
  href: string
  label: string
  text: string
  className?: string
}

export function AuthLink({ href, label, text, className }: AuthLinkProps) {
  return (
    <div className={cn('text-center text-sm', className)}>
      <span className="text-neutral-600 dark:text-neutral-400">{label} </span>
      <Link
        href={href}
        className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        {text}
      </Link>
    </div>
  )
}
