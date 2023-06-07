'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactElement } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  icon?: ReactElement
  size?: 'sm' | 'md'
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
}

export function Button({
  children,
  size = 'md',
  icon,
  primary,
  secondary,
  tertiary,
  ...props
}: ButtonProps) {
  const classNames =
    'min-w-[120px] cursor-pointer rounded-md text-center font-default text-sm font-medium flex items-center justify-center gap-2 px-4 disabled:cursor-not-allowed'

  return (
    <button
      {...props}
      className={clsx(classNames, {
        'bg-ignite-500 text-white hover:bg-ignite-300 disabled:pointer-events-none disabled:bg-gray-200':
          primary,
        'border-2 border-solid border-ignite-500 text-ignite-300 hover:bg-ignite-500 hover:text-white disabled:pointer-events-none disabled:bg-gray-200 disabled:text-gray-200':
          secondary,
        'text-gray-100 hover:text-white disabled:pointer-events-none disabled:text-gray-600':
          tertiary,

        'h-[38px]': size === 'sm',
        'h-[46px]': size === 'md',
      })}
    >
      {children}
      {!!icon && icon}
    </button>
  )
}
