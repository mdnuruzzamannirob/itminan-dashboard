'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Maximize2 } from 'lucide-react'

export interface Bug {
  id: number
  user: string
  email: string
  phone: string
  issueTitle: string
  description: string
  status: 'Solved' | 'Resolved' | 'Pending'
  image?: string
  createdAt?: string
}

interface BugsTableProps {
  bugs: Bug[]
  onExpandImage?: (imageUrl: string) => void
}

export function BugsTable({ bugs, onExpandImage }: BugsTableProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Solved: 'bg-green-100 text-green-800',
      Resolved: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                #
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                User
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Phone Number
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Issue Title
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Description
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug, index) => (
              <tr
                key={bug.id}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-4 text-muted-foreground font-medium">
                  {index + 1}
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{bug.user}</p>
                    <p className="text-xs text-muted-foreground">{bug.email}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{bug.phone}</td>
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-900">{bug.issueTitle}</p>
                </td>
                <td className="px-4 py-4 text-muted-foreground max-w-xs">
                  <p className="line-clamp-2">{bug.description}</p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      'inline-block px-3 py-1 rounded-full text-xs font-medium',
                      getStatusColor(bug.status),
                    )}
                  >
                    {bug.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {bug.image ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onExpandImage?.(bug.image!)}
                      className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      title="Expand image"
                    >
                      <Maximize2 className="size-4" />
                    </Button>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {bugs.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No bugs reported.</p>
        </div>
      )}
    </div>
  )
}
