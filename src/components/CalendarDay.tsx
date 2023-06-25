import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface CalendarDayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: String | number
}

export function CalendarDay({ children, ...props }: CalendarDayProps) {
  return (
    <button
      className={clsx(
        'aspect-square w-full rounded-md border-0 bg-gray-600 text-center',
        'disabled:cursor-default disabled:bg-none disabled:opacity-40',
        'hover:enabled:bg-gray-500',
        'focus:shadow-[0_0_0_2px]',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
