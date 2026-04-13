import { AlertCircle } from 'lucide-react'

interface ErrorInfoMessageProps {
  error?: string
  info?: string
}

export function ErrorInfoMessage({ error, info }: ErrorInfoMessageProps) {
  if (error) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-destructive">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>{error}</span>
      </div>
    )
  }

  if (info) {
    return <p className="text-xs text-muted-foreground">{info}</p>
  }

  return null
}
