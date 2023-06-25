import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface TimePickerItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string[]
}

export function TimePickerItem({ children, ...props }: TimePickerItemProps) {
  return (
    <button
      {...props}
      className={clsx(
        'rounded-md border-0 bg-gray-600 px-0 py-2 text-sm leading-snug text-gray-100',
        'last:mb-6',
        'disabled:cursor-default disabled:bg-none disabled:opacity-40',
        'hover:enabled:bg-gray-500',
        'focus:shadow-[0_0_0_2px] focus:shadow-gray-100',
      )}
    >
      {children}
    </button>
  )
}
