'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { BookOpen, Scroll, Star, Wand2 } from 'lucide-react'
import { useState } from 'react'

export interface HabitFormData {
  id?: number
  name: string
  category: 'Prayer' | "Qur'an" | 'Dhikr' | 'Deeds'
  categoryLayer: 'Beginner' | 'Intermediate' | 'Advanced'
  frequency: 'Daily' | 'Weekly' | 'Custom'
  frequencyDays?: string[]
  frequencyCustomDays?: number
  startDate: string
  description: string
  showOnTodayScreen: boolean
}

interface AddEditHabitModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: HabitFormData) => void
  habit?: HabitFormData | null
  title?: string
}

const CATEGORIES = [
  { value: 'Prayer', icon: Scroll, label: 'Prayer' },
  { value: "Qur'an", icon: BookOpen, label: "Qur'an" },
  { value: 'Dhikr', icon: Star, label: 'Dhikr' },
  { value: 'Deeds', icon: Wand2, label: 'Deeds' },
] as const

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const DAYS_FULL = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export function AddEditHabitModal({
  isOpen,
  onClose,
  onSave,
  habit,
  title = 'Add Habit',
}: AddEditHabitModalProps) {
  const [formData, setFormData] = useState<HabitFormData>(
    habit || {
      name: '',
      category: 'Prayer',
      categoryLayer: 'Beginner',
      frequency: 'Daily',
      frequencyDays: [],
      frequencyCustomDays: 1,
      startDate: new Date().toISOString().split('T')[0],
      description: '',
      showOnTodayScreen: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      frequencyDays: prev.frequencyDays?.includes(day)
        ? prev.frequencyDays.filter((d) => d !== day)
        : [...(prev.frequencyDays || []), day],
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-3 sm:p-4 border-b flex flex-row items-center justify-between shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            {habit ? 'Edit Habit' : title}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="p-3 sm:p-5 space-y-4 overflow-y-auto flex-1"
        >
          {/* Habit Name */}
          <div className="space-y-2">
            <Label htmlFor="habit-name" className="text-sm font-semibold">
              Habit Name
            </Label>
            <Input
              id="habit-name"
              placeholder="e.g., Pray Fajr"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Category</Label>
            <div className="grid mt-2 grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        category: cat.value,
                      }))
                    }
                    className={cn(
                      'p-3 sm:p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all cursor-pointer',
                      formData.category === cat.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300',
                    )}
                  >
                    <IconComponent className="size-5 sm:size-6" />
                    <span className="text-xs font-medium text-center">
                      {cat.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Category Layer */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Category Layer</Label>
            <div className="grid grid-cols-1 mt-2 sm:grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((layer) => (
                <label
                  key={layer}
                  className={cn(
                    'flex items-center justify-center p-2.5 sm:p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-gray-300 text-sm sm:text-base',
                    formData.categoryLayer === layer
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200',
                  )}
                >
                  <input
                    type="radio"
                    name="categoryLayer"
                    value={layer}
                    checked={formData.categoryLayer === layer}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        categoryLayer: layer as
                          | 'Beginner'
                          | 'Intermediate'
                          | 'Advanced',
                      }))
                    }
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <span className="font-medium ml-2">{layer}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-2 pt-1">
            <Label className="text-sm font-semibold">Frequency</Label>
            <div className="space-y-2 mt-2">
              {['Daily', 'Weekly (select days)', 'Every N days'].map((freq) => {
                let freqValue: 'Daily' | 'Weekly' | 'Custom'
                if (freq === 'Daily') freqValue = 'Daily'
                else if (freq === 'Weekly (select days)') freqValue = 'Weekly'
                else freqValue = 'Custom'

                return (
                  <label
                    key={freq}
                    className={cn(
                      'flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-gray-300',
                      formData.frequency === freqValue
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200',
                    )}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={freqValue}
                      checked={formData.frequency === freqValue}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          frequency: freqValue,
                        }))
                      }
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="font-medium ml-2">{freq}</span>
                  </label>
                )
              })}

              {/* Weekly Days Selector */}
              {formData.frequency === 'Weekly' && (
                <div className="ml-6 mt-3 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium mb-3">
                    Repeat on these days
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {DAYS.map((day, idx) => (
                      <button
                        key={day + idx}
                        type="button"
                        onClick={() => toggleDay(DAYS_FULL[idx])}
                        className={cn(
                          'size-10 rounded-lg font-semibold transition-all',
                          formData.frequencyDays?.includes(DAYS_FULL[idx])
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border-2 border-blue-200 text-gray-700',
                        )}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Days Input */}
              {formData.frequency === 'Custom' && (
                <div className="ml-6 mt-3 p-4 bg-blue-50 rounded-lg">
                  <label className="flex items-center gap-2">
                    <span className="text-sm font-medium">Every</span>
                    <Input
                      type="number"
                      min="1"
                      value={formData.frequencyCustomDays}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          frequencyCustomDays: parseInt(e.target.value),
                        }))
                      }
                      className="w-16 h-9"
                    />
                    <span className="text-sm font-medium">days</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start-date" className=" text-sm font-semibold">
              Start Date
            </Label>
            <Input
              id="start-date"
              type="date"
              className="mt-2"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              Description (Optional)
            </Label>
            <div className="space-y-3 mt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.showOnTodayScreen}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      showOnTodayScreen: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                />
                <span className="text-sm font-medium">
                  Show on Today Screen
                </span>
              </label>
              <textarea
                id="description"
                placeholder="e.g., specific verses to read"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={cn(
                  'w-full p-3 mt-2 border rounded-lg text-sm resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-24',
                  'border-input bg-background placeholder:text-muted-foreground',
                )}
              />
            </div>
          </div>
        </form>

        <DialogFooter className="p-3 sm:p-4 border-t flex gap-2 sm:gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 text-sm h-9 py-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
          >
            {habit ? 'Update Habit' : 'Add Habit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
