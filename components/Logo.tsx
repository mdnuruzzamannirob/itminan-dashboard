import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('mb-4 flex justify-center', className)}>
      <Image alt="Logo" src="/Itminan.png" width={100} height={100} />
    </div>
  )
}
