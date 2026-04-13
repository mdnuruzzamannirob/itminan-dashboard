'use client'

import { CheckCircle2 } from 'lucide-react'

export default function HabitsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold  ">Add Habits</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track user habits
        </p>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold   mb-2">Habits Management</h2>
          <p className="text-muted-foreground">Coming soon</p>
        </div>
      </div>
    </div>
  )
}
