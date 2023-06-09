import clsx from 'clsx'

interface TextProps {
  children: string | number | undefined
  className?: string
  as?: 'p' | 'span'
  color?: 'primary' | 'secondary'
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
        })}
      >
        {children}
      </p>
    ) : (
      <span className={clsx(classNames, className)}>{children}</span>
    )

  return element
}
