'use client'

import { Checkbox } from '@/components/CheckBox'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'

export function IntervalItem() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <Checkbox />
        <Text>Segunda-Feira</Text>
      </div>

      <div className="flex items-center gap-2">
        <TextInput type="time" step={60} />
        <TextInput type="time" step={60} />
      </div>
    </div>
  )
}
