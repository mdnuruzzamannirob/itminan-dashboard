'use client'

import { Bug, BugsTable } from '@/components/bugs/BugsTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

// Mock data
const mockBugs: Bug[] = [
  {
    id: 1,
    user: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    issueTitle: 'Prayer time notification not working',
    description:
      "The notification for Fajr prayer doesn't work. The notification for Fajr prayer...",
    status: 'Solved',
    createdAt: 'Jan 15, 2024',
  },
  {
    id: 2,
    user: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    issueTitle: 'Prayer time notification not working',
    description:
      "The notification for Fajr prayer doesn't work. The notification for Fajr prayer...",
    status: 'Solved',
    createdAt: 'Jan 15, 2024',
  },
  {
    id: 3,
    user: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    issueTitle: 'Prayer time notification not working',
    description:
      "The notification for Fajr prayer doesn't work. The notification for Fajr prayer...",
    status: 'Resolved',
    createdAt: 'Jan 15, 2024',
  },
  {
    id: 4,
    user: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    issueTitle: 'Prayer time notification not working',
    description:
      "The notification for Fajr prayer doesn't work. The notification for Fajr prayer...",
    status: 'Solved',
    createdAt: 'Jan 15, 2024',
  },
  {
    id: 5,
    user: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    issueTitle: 'Prayer time notification not working',
    description:
      "The notification for Fajr prayer doesn't work. The notification for Fajr prayer...",
    status: 'Resolved',
    createdAt: 'Jan 15, 2024',
  },
  {
    id: 6,
    user: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+880 1840560615',
    issueTitle: 'Habit streak calculation incorrect',
    description:
      'The streak counter is showing incorrect values for completed habits...',
    status: 'Pending',
    createdAt: 'Jan 18, 2024',
  },
  {
    id: 7,
    user: 'David Johnson',
    email: 'david@example.com',
    phone: '+880 1840560616',
    issueTitle: 'Premium subscription not activating',
    description: 'After purchasing premium, the features are still locked...',
    status: 'Solved',
    createdAt: 'Jan 20, 2024',
  },
  {
    id: 8,
    user: 'Emma Brown',
    email: 'emma@example.com',
    phone: '+880 1840560617',
    issueTitle: 'App crashes on Quran page',
    description:
      'The app crashes when trying to access the Quran reading feature...',
    status: 'Solved',
    createdAt: 'Jan 22, 2024',
  },
  {
    id: 9,
    user: 'Michael Davis',
    email: 'michael@example.com',
    phone: '+880 1840560618',
    issueTitle: 'Login page not responsive on mobile',
    description:
      'The login form is not displaying properly on mobile devices...',
    status: 'Pending',
    createdAt: 'Jan 25, 2024',
  },
  {
    id: 10,
    user: 'Lisa Anderson',
    email: 'lisa@example.com',
    phone: '+880 1840560619',
    issueTitle: 'Settings page language toggle bug',
    description: "Changing language doesn't persist after app restart...",
    status: 'Resolved',
    createdAt: 'Feb 01, 2024',
  },
  {
    id: 11,
    user: 'James Martinez',
    email: 'james@example.com',
    phone: '+880 1840560620',
    issueTitle: 'Export data not generating file',
    description: 'Clicking export data button does nothing...',
    status: 'Pending',
    createdAt: 'Feb 05, 2024',
  },
  {
    id: 12,
    user: 'Jennifer Garcia',
    email: 'jennifer@example.com',
    phone: '+880 1840560621',
    issueTitle: 'Analytics chart not loading',
    description:
      'The analytics page shows blank charts for some time periods...',
    status: 'Solved',
    createdAt: 'Feb 10, 2024',
  },
]

const ITEMS_PER_PAGE = 10

const BugsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'Solved' | 'Resolved' | 'Pending'
  >('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search
  const filteredBugs = useMemo(() => {
    return mockBugs.filter((bug) => {
      const matchesSearch =
        bug.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.issueTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' || bug.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredBugs.length / ITEMS_PER_PAGE)
  const paginatedBugs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredBugs.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredBugs, currentPage])

  const handleExpandImage = (imageUrl: string) => {
    // Handle image expansion - can be implemented with a modal
    console.log('Expand image:', imageUrl)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Bugs</h1>
        <p className="text-muted-foreground mt-1">Islamic Habits Tracker</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by user, issue, or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex gap-2">
            {(['all', 'Solved', 'Resolved', 'Pending'] as const).map(
              (status) => (
                <Button
                  key={status}
                  variant={status === 'all' ? 'outline' : 'outline'}
                  onClick={() => {
                    setStatusFilter(status)
                    setCurrentPage(1)
                  }}
                  className={
                    statusFilter === status ? 'bg-blue-600 text-white' : ''
                  }
                >
                  {status === 'all' ? 'All Status' : status}
                </Button>
              ),
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {paginatedBugs.length} of {filteredBugs.length} bugs
        </div>
      </div>

      {/* Table */}
      <BugsTable bugs={paginatedBugs} onExpandImage={handleExpandImage} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredBugs.length}
        />
      )}
    </div>
  )
}

export default BugsPage
