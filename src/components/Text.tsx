import clsx from 'clsx'

interface TextProps {
  children: string | number | null | undefined
  className?: string
  as?: 'p' | 'span'
  color?: 'primary' | 'secondary' | 'error'
}

export function Text({
  children,
  color = 'primary',
  as = 'p',
  className = 'text-base',
}: TextProps) {
  const classNames = 'font-default leading-relaxed m-0 text-gray-100'

  const element =
    as === 'p' ? (
      <p
        className={clsx(classNames, className, {
          'text-gray-100': color === 'primary',
          'text-gray-200': color === 'secondary',
          'text-red-400': color === 'error',
        })}
      >
        {children}
      </p>
    ) : (
      <span className={clsx(classNames, className)}>{children}</span>
    )

  return element
}
