import clsx from 'clsx'

interface HeadingProps {
  children: string
  clasName: string
  as?: 'h1' | 'h2'
}

export function Heading({
  children,
  as = 'h2',
  clasName = 'text-2xl',
}: HeadingProps) {
  const classNames = 'font-default leading-snug m-0 text-gray-100 font-bold'

  const element =
    as === 'h1' ? (
      <h1 className={clsx(classNames, clasName)}>{children}</h1>
    ) : (
      <h2 className={clsx(classNames, clasName)}>{children}</h2>
    )

  return element
}
