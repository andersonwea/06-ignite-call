'use client'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Checkbox } from '@/components/CheckBox'
import * as z from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { getWeekDays } from '@/utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

export function IntervalForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  async function handleSetTimeIntervals() {}

  const weekDays = getWeekDays()

  return (
    <form
      className="mb-4 flex flex-col"
      onSubmit={handleSubmit(handleSetTimeIntervals)}
    >
      <div className="mb-4 rounded border border-solid border-gray-600">
        {fields.map((field, index) => {
          return (
            <div
              className=" flex items-center justify-between  px-4 py-3"
              key={field.id}
            >
              <div className="flex items-center gap-3">
                <Checkbox />
                <Text>{weekDays[field.weekDay]}</Text>
              </div>

              <div className="flex h-11 items-center gap-2">
                <TextInput
                  type="time"
                  step={60}
                  height="sm"
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  type="time"
                  step={60}
                  height="sm"
                  {...register(`intervals.${index}.endTime`)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <Button primary className="mt-4">
        Próximo passo
      </Button>
    </form>
  )
}
