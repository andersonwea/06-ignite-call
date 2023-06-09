'use client'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Checkbox } from '@/components/CheckBox'
import * as z from 'zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    }),
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export function IntervalForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
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

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: TimeIntervalsFormData) {
    console.log(data)
  }

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
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                        checked={field.value}
                      />
                    )
                  }}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </div>

              <div className="flex h-11 items-center gap-2">
                <TextInput
                  disabled={intervals[index].enabled === false}
                  type="time"
                  step={60}
                  height="sm"
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  disabled={intervals[index].enabled === false}
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

      {errors.intervals && (
        <Text className="mb-4 text-sm" color="error">
          {errors.intervals.message}
        </Text>
      )}

      <Button primary className="mt-4" disabled={isSubmitting}>
        Próximo passo
      </Button>
    </form>
  )
}
