import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import clsx from 'clsx'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

export const TextInput = forwardRef(function TextInput(
  { prefix, ...props }: TextInputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div
      className={clsx(
        'rounded-md border-2 border-solid border-gray-900 bg-gray-900 px-4 py-3',
        'flex items-center',
        'focus:border-ignite-300',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus-within:border-ignite-300',
      )}
    >
      {!!prefix && (
        <span className="font-default text-sm font-normal text-gray-400">
          {prefix}
        </span>
      )}
      <input
        ref={ref}
        className={clsx(
          'b-0 w-full bg-transparent font-default text-sm font-normal text-white',
          'focus:outline-none',
          'disabled:cursor-not-allowed',
          'placeholder:text-gray-400',
        )}
        {...props}
      />
    </div>
  )
})
