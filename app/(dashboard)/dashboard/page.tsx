'use client'

import { StatCard } from '@/components/dashboard/stat-card'
import { ChartContainer } from '@/components/dashboard/chart-container'
import { UserTable } from '@/components/dashboard/user-table'
import { UsersRound, Activity, Clock3, Crown } from 'lucide-react'
import { useState, useMemo } from 'react'

// Demo data for different years
const getChartsData = (year: number) => {
  const baseYear = 2026
  const yearOffset = year - baseYear

  // Generate data based on year selected
  const monthlyData = [
    { name: 'Jan', value: 12000 + yearOffset * 1000 },
    { name: 'Feb', value: 15000 + yearOffset * 1200 },
    { name: 'Mar', value: 18000 + yearOffset * 1500 },
    { name: 'Apr', value: 14000 + yearOffset * 1000 },
    { name: 'May', value: 22000 + yearOffset * 2000 },
    { name: 'Jun', value: 25000 + yearOffset * 2500 },
    { name: 'Jul', value: 28000 + yearOffset * 2800 },
    { name: 'Aug', value: 26000 + yearOffset * 2600 },
    { name: 'Sep', value: 30000 + yearOffset * 3000 },
    { name: 'Oct', value: 32000 + yearOffset * 3200 },
    { name: 'Nov', value: 35000 + yearOffset * 3500 },
    { name: 'Dec', value: 38000 + yearOffset * 3800 },
  ]

  const premiumData = [
    { name: 'Jan', value: 2000 + yearOffset * 200 },
    { name: 'Feb', value: 2500 + yearOffset * 250 },
    { name: 'Mar', value: 2800 + yearOffset * 280 },
    { name: 'Apr', value: 2600 + yearOffset * 260 },
    { name: 'May', value: 3200 + yearOffset * 320 },
    { name: 'Jun', value: 3500 + yearOffset * 350 },
    { name: 'Jul', value: 4000 + yearOffset * 400 },
    { name: 'Aug', value: 3800 + yearOffset * 380 },
    { name: 'Sep', value: 4500 + yearOffset * 450 },
    { name: 'Oct', value: 5000 + yearOffset * 500 },
    { name: 'Nov', value: 5500 + yearOffset * 550 },
    { name: 'Dec', value: 6000 + yearOffset * 600 },
  ]

  return { monthlyData, premiumData }
}

const recentUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+880 1840560614',
    joined: 'Jan 15, 2024',
    status: 'Active' as const,
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+880 1840560615',
    joined: 'Jan 18, 2024',
    status: 'Suspended' as const,
  },
  {
    id: 3,
    name: 'David Johnson',
    email: 'david@example.com',
    phone: '+880 1840560616',
    joined: 'Jan 21, 2024',
    status: 'Active' as const,
  },
]

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(2026)
  const { monthlyData, premiumData } = useMemo(
    () => getChartsData(selectedYear),
    [selectedYear],
  )

  const years = [2024, 2025, 2026]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold  ">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your application metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value="12,456"
          icon={UsersRound}
          delta="+12.4%"
        />
        <StatCard
          label="Active Users"
          value="8,234"
          icon={Activity}
          delta="+7.8%"
        />
        <StatCard
          label="Inactive Users"
          value="4,222"
          icon={Clock3}
          delta="-3.2%"
        />
        <StatCard
          label="Premium Users"
          value="2,845"
          icon={Crown}
          delta="+18.1%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Monthly User Growth"
          subtitle="User growth trend"
          data={monthlyData}
          type="line"
          dataKey="value"
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          years={years}
        />
        <ChartContainer
          title="Premium Users Overview"
          subtitle="Premium user adoption"
          data={premiumData}
          type="bar"
          dataKey="value"
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          years={years}
        />
      </div>

      {/* Recent Users Table */}
      <UserTable users={recentUsers} />
    </div>
  )
}
