import clsx from 'clsx'

interface TextProps {
  children: string | undefined
  className?: string
  as?: 'p' | 'span'
}

export function Text({
  children,
  as = 'p',
  className = 'text-base',
}: TextProps) {
  const classNames = 'font-default leading-relaxed m-0 text-gray-200'

  const element =
    as === 'p' ? (
      <p className={clsx(classNames, className)}>{children}</p>
    ) : (
      <span className={clsx(classNames, className)}>{children}</span>
    )

  return element
}
