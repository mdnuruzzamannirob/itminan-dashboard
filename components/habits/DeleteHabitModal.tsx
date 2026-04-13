'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AlertTriangle } from 'lucide-react'

interface DeleteHabitModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  habitName: string
}

export function DeleteHabitModal({
  isOpen,
  onClose,
  onConfirm,
  habitName,
}: DeleteHabitModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="size-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              Delete Habit
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">"{habitName}"</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
