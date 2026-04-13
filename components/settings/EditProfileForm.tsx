'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function EditProfileForm() {
  const [userName, setUserName] = useState('Maria')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Profile updated successfully!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edit Your Profile</h2>

      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="userName" className="text-base font-medium">
            User Name
          </Label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="h-10"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
        >
          {isSaving ? 'Saving...' : 'Save & Change'}
        </Button>
      </div>
    </div>
  )
}
