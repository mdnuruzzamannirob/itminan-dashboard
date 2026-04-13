'use client'

import {
  PremiumSubscriber,
  PremiumSubscribersTable,
} from '@/components/premium/PremiumSubscribersTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

// Mock data
const mockPremiumSubscribers: PremiumSubscriber[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    billingDate: 'Jan 15, 2024',
    plan: 'Yearly',
    price: '$39.99',
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    billingDate: 'Jan 15, 2024',
    plan: 'Monthly',
    price: '$3.99',
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    billingDate: 'Jan 15, 2024',
    plan: 'Yearly',
    price: '$39.99',
  },
  {
    id: 4,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    billingDate: 'Jan 15, 2024',
    plan: 'Yearly',
    price: '$39.99',
  },
  {
    id: 5,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    billingDate: 'Jan 15, 2024',
    plan: 'Yearly',
    price: '$39.99',
  },
  {
    id: 6,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+880 1840560615',
    billingDate: 'Jan 20, 2024',
    plan: 'Monthly',
    price: '$3.99',
  },
  {
    id: 7,
    name: 'David Johnson',
    email: 'david@example.com',
    phone: '+880 1840560616',
    billingDate: 'Jan 22, 2024',
    plan: 'Yearly',
    price: '$39.99',
  },
  {
    id: 8,
    name: 'Emma Brown',
    email: 'emma@example.com',
    phone: '+880 1840560617',
    billingDate: 'Jan 25, 2024',
    plan: 'Monthly',
    price: '$3.99',
  },
  {
    id: 9,
    name: 'Michael Davis',
    email: 'michael@example.com',
    phone: '+880 1840560618',
    billingDate: 'Feb 01, 2024',
    plan: 'Yearly',
    price: '$39.99',
  },
  {
    id: 10,
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    phone: '+880 1840560619',
    billingDate: 'Feb 05, 2024',
    plan: 'Monthly',
    price: '$3.99',
  },
  {
    id: 11,
    name: 'James Martinez',
    email: 'james@example.com',
    phone: '+880 1840560620',
    billingDate: 'Feb 10, 2024',
    plan: 'Yearly',
    price: '$39.99',
  },
  {
    id: 12,
    name: 'Jennifer Garcia',
    email: 'jennifer@example.com',
    phone: '+880 1840560621',
    billingDate: 'Feb 15, 2024',
    plan: 'Monthly',
    price: '$3.99',
  },
]

const ITEMS_PER_PAGE = 10

const PremiumPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [planFilter, setPlanFilter] = useState<'all' | 'Monthly' | 'Yearly'>(
    'all',
  )
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search
  const filteredSubscribers = useMemo(() => {
    return mockPremiumSubscribers.filter((subscriber) => {
      const matchesSearch =
        subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.phone.includes(searchTerm)

      const matchesPlan = planFilter === 'all' || subscriber.plan === planFilter

      return matchesSearch && matchesPlan
    })
  }, [searchTerm, planFilter])

  // Pagination
  const totalPages = Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE)
  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredSubscribers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredSubscribers, currentPage])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Premium Subscribers</h1>
        <p className="text-muted-foreground mt-1">
          Manage premium users and view payment details
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by premium users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10"
            />
          </div>

          {/* Plan Filter Buttons */}
          <div className="flex gap-2">
            {(['all', 'Monthly', 'Yearly'] as const).map((plan) => (
              <Button
                key={plan}
                variant={planFilter === plan ? 'default' : 'outline'}
                onClick={() => {
                  setPlanFilter(plan)
                  setCurrentPage(1)
                }}
                className={planFilter === plan ? 'bg-blue-600' : ''}
              >
                {plan === 'all' ? 'All Users' : plan}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {paginatedSubscribers.length} of {filteredSubscribers.length}{' '}
          premium subscribers
        </div>
      </div>

      {/* Table */}
      <PremiumSubscribersTable subscribers={paginatedSubscribers} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredSubscribers.length}
        />
      )}
    </div>
  )
}

export default PremiumPage
