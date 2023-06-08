import Check from '@/assets/Check'
import { ComponentProps } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

export interface CheckboxProps
  extends ComponentProps<typeof CheckboxRadix.Root> {}

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxRadix.Root {...props} className="checkbox">
      <CheckboxRadix.Indicator asChild className="h-4 w-4 text-white ">
        <Check width="bold" />
      </CheckboxRadix.Indicator>
    </CheckboxRadix.Root>
  )
}
