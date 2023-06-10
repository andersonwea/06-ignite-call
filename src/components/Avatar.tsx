'use client'

import * as AvatarRadix from '@radix-ui/react-avatar'
import User from '@/assets/User'
import { ImgHTMLAttributes } from 'react'
import clsx from 'clsx'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <AvatarRadix.Root
      className={clsx(
        'inline-block h-12 w-12 overflow-hidden rounded-full',
        className,
      )}
    >
      <AvatarRadix.Image
        {...props}
        className="h-full w-full rounded-full object-cover"
      />

      <AvatarRadix.Fallback
        delayMs={600}
        className="flex h-full w-full items-center justify-center bg-gray-600 text-gray-800"
      >
        <User size={32} />
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
