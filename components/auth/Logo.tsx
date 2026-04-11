import { SVGProps } from 'react'

interface LogoProps extends SVGProps<SVGSVGElement> {
  className?: string
}

export function Logo({ className = 'w-8 h-8', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer circle background */}
      <circle
        cx="100"
        cy="100"
        r="95"
        className="fill-blue-50 dark:fill-neutral-800"
      />
      <circle
        cx="100"
        cy="100"
        r="95"
        className="stroke-blue-200 dark:stroke-blue-900"
        strokeWidth="2"
      />

      {/* Main letter I */}
      <rect
        x="85"
        y="40"
        width="30"
        height="120"
        rx="4"
        className="fill-blue-600 dark:fill-blue-400"
      />

      {/* Dot above I */}
      <circle
        cx="100"
        cy="25"
        r="12"
        className="fill-blue-600 dark:fill-blue-400"
      />

      {/* Decorative elements */}
      <path
        d="M 60 100 Q 60 130 100 140 Q 140 130 140 100"
        className="stroke-blue-300 dark:stroke-blue-700"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
