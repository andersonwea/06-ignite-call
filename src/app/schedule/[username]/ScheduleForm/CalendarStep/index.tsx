'use client'

import { Box } from '@/components/Box'
import { Calendar } from '@/components/Calendar'
import { TimePickerItem } from '@/components/TimePickerItem'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'

interface CalendarStepProps {
  username: string
  onSelectDateTime: (date: Date) => void
}

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep({
  username,
  onSelectDateTime,
}: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describeDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <Box
      className={clsx('relative mx-auto mb-0 mt-6 grid max-w-full p-0', {
        'grid-cols-[1fr_280px] max-[900px]:grid-cols-1': isDateSelected,
        'w-[540px] grid-cols-1': !isDateSelected,
      })}
    >
      <>
        <Calendar
          username={username}
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
        />

        {isDateSelected && (
          <div className="absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border border-solid border-gray-600 px-6 pb-0 pt-6">
            <header>
              <h2 className="font-medium">
                {weekDay} <span className="text-gray-200">{describeDate}</span>
              </h2>
            </header>
            <div className="mt-3 grid grid-cols-1 gap-2 max-[900px]:grid-cols-[2fr]">
              {availability?.possibleTimes.map((hour) => {
                return (
                  <TimePickerItem
                    key={hour}
                    onClick={() => handleSelectTime(hour)}
                    disabled={!availability.availableTimes?.includes(hour)}
                  >
                    {String(hour).padStart(2, '0')}:00h
                  </TimePickerItem>
                )
              })}
            </div>
          </div>
        )}
      </>
    </Box>
  )
}
