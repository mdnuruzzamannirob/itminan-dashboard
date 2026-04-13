'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartDataPoint {
  name: string
  value: number
}

interface ChartContainerProps {
  title: string
  subtitle?: string
  data: ChartDataPoint[]
  type: 'line' | 'bar'
  dataKey: string
  height?: number
  selectedYear?: number
  onYearChange?: (year: number) => void
  years?: number[]
}

export function ChartContainer({
  title,
  subtitle,
  data,
  type,
  dataKey,
  height = 300,
  selectedYear,
  onYearChange,
  years = [],
}: ChartContainerProps) {
  return (
    <div className="rounded-lg border  bg-white p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-4">
        <div>
          <h3 className="font-semibold  ">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {years.length > 0 && selectedYear !== undefined && onYearChange && (
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className="border rounded-lg px-3 py-2 font-medium text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        {type === 'line' ? (
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
              }}
              formatter={(value) => ['', '']}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        ) : (
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
              }}
              formatter={(value) => ['', '']}
            />
            <Bar dataKey={dataKey} fill="#3b82f6" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
