import clsx from 'clsx'
import { ReactElement } from 'react'

interface BoxProps {
  children: ReactElement
  className?: string
}

export function Box({ children, className }: BoxProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-solid border-gray-600 bg-gray-800 p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
