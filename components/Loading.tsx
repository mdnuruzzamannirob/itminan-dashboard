export function Loading() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
