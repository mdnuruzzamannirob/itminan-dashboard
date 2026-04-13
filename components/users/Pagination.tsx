'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  pageSize: number
}

export function ModernPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
      <div className="text-sm text-gray-600 order-2 sm:order-1">
        Showing <span className="font-semibold text-gray-900">{startItem}</span>{' '}
        to <span className="font-semibold text-gray-900">{endItem}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalItems}</span>{' '}
        results
      </div>

      <div className="flex items-center gap-2 order-1 sm:order-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="h-10 w-10 p-0"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-2 py-1 text-gray-500">...</span>
              ) : (
                <Button
                  onClick={() => onPageChange(page as number)}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    'h-10 w-10 p-0',
                    currentPage === page
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="h-10 w-10 p-0"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
