import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea(props: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={clsx(
        'rounded-md border-2 border-solid border-gray-900 bg-gray-900 px-4 py-3',
        'min-h-[80px] resize-y font-default text-sm font-normal text-white',
        'focus:border-ignite-300 focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'placeholder:text-gray-400',
      )}
    ></textarea>
  )
}
