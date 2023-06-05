import clsx from 'clsx'

interface HeadingProps {
  children: string
  className?: string
  as?: 'h1' | 'h2'
}

export function Heading({
  children,
  as = 'h2',
  className = 'text-2xl',
}: HeadingProps) {
  const classNames = 'font-default leading-snug m-0 text-gray-100 font-bold'

  const element =
    as === 'h1' ? (
      <h1 className={clsx(classNames, className)}>{children}</h1>
    ) : (
      <h2 className={clsx(classNames, className)}>{children}</h2>
    )

  return element
}
