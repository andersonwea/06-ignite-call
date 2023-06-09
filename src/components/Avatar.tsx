import * as AvatarRadix from '@radix-ui/react-avatar'
import User from '@/assets/User'
import { ImgHTMLAttributes } from 'react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function Avatar(props: AvatarProps) {
  return (
    <AvatarRadix.Root className="inline-block h-12 w-12 overflow-hidden rounded-full">
      <AvatarRadix.Image
        {...props}
        className="h-full w-full rounded-full object-cover"
      />

      <AvatarRadix.Fallback
        delayMs={600}
        className="flex h-full w-full items-center justify-center bg-gray-600 text-gray-800"
      >
        <User />
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
