'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  phone: string
  joined: string
  status: 'Active' | 'Suspended'
}

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="rounded-lg border  bg-white overflow-hidden">
      <div className="p-4 border-b  flex items-center justify-between">
        <h3 className="font-semibold">Recent User</h3>
        <Link
          href="/users"
          className="text-sm font-medium text-primary px-3 py-1 rounded hover:bg-primary/5 duration-300"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b ">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                #
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                User
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Phone Number
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Joined
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-muted-foreground">{user.id}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/users/${user.id}`}
                    className="hover:text-blue-600"
                  >
                    <div>
                      <p className="font-medium  ">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {user.phone}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {user.joined}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex px-2 py-1 rounded-md text-xs font-medium border',
                      user.status === 'Active'
                        ? 'bg-green-50 text-green-800 border-green-200'
                        : 'bg-red-50 text-red-800 border-red-200',
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
