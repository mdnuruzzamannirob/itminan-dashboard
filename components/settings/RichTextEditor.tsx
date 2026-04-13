'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
} from 'lucide-react'
import { useState } from 'react'

interface RichTextEditorProps {
  title: string
  initialContent?: string
  onSave?: (content: string) => void
}

export function RichTextEditor({
  title,
  initialContent = '',
  onSave,
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    onSave?.(content)
    alert(`${title} updated successfully!`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{title}</h1>

      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-3 bg-gray-100 rounded-t-lg border">
          <div className="flex gap-1 border-r pr-2">
            <button className="p-2 hover:bg-gray-200 rounded" title="Bold">
              <Bold className="size-4" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded" title="Italic">
              <Italic className="size-4" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded" title="Underline">
              <Underline className="size-4" />
            </button>
          </div>

          <div className="flex gap-1 border-r px-2">
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Bullet List"
            >
              <List className="size-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Ordered List"
            >
              <ListOrdered className="size-4" />
            </button>
          </div>

          <div className="flex gap-1">
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Left"
            >
              <AlignLeft className="size-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Center"
            >
              <AlignCenter className="size-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Right"
            >
              <AlignRight className="size-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Justify"
            >
              <AlignJustify className="size-4" />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content here..."
          className="min-h-80 rounded-b-lg rounded-t-none border-t-0 p-4 font-normal resize-none"
        />

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
