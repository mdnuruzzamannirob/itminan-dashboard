'use client'

import { cn } from '@/lib/utils'

export interface PremiumSubscriber {
  id: number
  name: string
  email: string
  phone: string
  billingDate: string
  plan: 'Monthly' | 'Yearly'
  price: string
  avatar?: string
}

interface PremiumSubscribersTableProps {
  subscribers: PremiumSubscriber[]
}

export function PremiumSubscribersTable({
  subscribers,
}: PremiumSubscribersTableProps) {
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
                Billing Date
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Plan
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr
                key={subscriber.id}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-4 text-muted-foreground font-medium">
                  {index + 1}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {subscriber.avatar && (
                      <img
                        src={subscriber.avatar}
                        alt={subscriber.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {subscriber.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {subscriber.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {subscriber.phone}
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {subscriber.billingDate}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      'inline-block px-3 py-1 rounded-full text-xs font-medium',
                      subscriber.plan === 'Yearly'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800',
                    )}
                  >
                    {subscriber.plan}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900">
                  {subscriber.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {subscribers.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No premium subscribers found.</p>
        </div>
      )}
    </div>
  )
}
